from flask import Flask, render_template, request, jsonify, redirect, url_for
import base64
from io import BytesIO
from PIL import Image
import os
import time
from static.making_model.CNN_model import RecognitionModel, HangulModel
import time
import pandas as pd
from dotenv import load_dotenv
from io import BytesIO
# import boto3
# from botocore.exceptions import NoCredentialsError, ClientError
import datetime

app = Flask(__name__)
count = 0

csv_path = './dataset/dataset.csv'
df = pd.read_csv(csv_path)
correct_label = df.loc[0, 'label']
canvas_count = len(correct_label)

# 모델과 라벨 파일 경로
MODEL_PATH = 'static/making_model/ResNet50_HANGUL_model.pth'
IDX2CHAR_PATH = 'static/making_model/ks-1001.txt'

region = 'ap-northeast-2'
bucket_name = 'final-ssuek'
today = str(datetime.date.today())

load_dotenv()

AWS_S3_ACCESS_KEY = os.getenv('AWS_S3_ACCESS_KEY')
AWS_S3_PRIVATE_KEY = os.getenv('AWS_S3_PRIVATE_KEY')

## 버킷에 업로드하는 코드
# def upload_to_s3(file_name, bucket, object_name, answer, result=None):
#     # 객체 이름이 제공되지 않으면 파일 이름을 사용
#     if result is not None:
#         object_name = object_name + '/' + today + '/' + get_unique_filename() + '_' + result + '_' + answer
#     else:
#         object_name = object_name + '/' + today + '/' + get_unique_filename() + '_' + answer
#     # S3 클라이언트 생성
#     s3_client = boto3.client(
#         "s3", aws_access_key_id=AWS_S3_ACCESS_KEY, aws_secret_access_key=AWS_S3_PRIVATE_KEY, region_name=region
#     )

#     # 파일 업로드
#     s3_client.upload_file(
#         file_name, bucket, object_name,
#         ExtraArgs={'ACL': 'public-read', 'ContentType': 'image/png'}  # 여기에 적절한 ContentType 설정
#     )
#                         # MIME 유형을 설정하여 사진을 바로 볼 수 있도록 설정
#     print(f"File {file_name} uploaded to bucket {bucket} as {object_name}.")
#     return True

# HangulModel 인스턴스 생성
hangul_model = HangulModel(MODEL_PATH, IDX2CHAR_PATH)

@app.route('/', methods=['GET', 'POST'])
def start():
    return render_template('start.html')

@app.route('/navigate', methods=['POST'])
def navigate():
    return redirect(url_for('index'))

@app.route('/index', methods=['GET', 'POST'])
def index():
#     if request.method == 'POST':
#         time.sleep(0.1)
#         #image_data = request.get_data()
#         results, image_url, _ = check_and_print_answer()  # 예측 결과를 받아옴
#         return render_template('result.html', count=get_latest_count(), results=results, image_url= image_url, canvas_count = canvas_count)
    return render_template('index.html', canvas_count = canvas_count)

@app.route('/result', methods=['GET', 'POST'])
def result():
    results, sound_url, _ = check_and_print_answer()  # 예측 결과를 받아옴
    return render_template('result.html', count=get_latest_count(), results=results, sound_url= sound_url, canvas_count = canvas_count)

@app.route('/save_image', methods=['POST'])
def save_image():
    image_urls = []
    
    for i in range(canvas_count):
        data = request.form[f'imageData{i}']
        try:
            image_data = base64.b64decode(data.split(',')[1])
            image = Image.open(BytesIO(image_data))
            
            save_dir = os.path.join('static', 'images', 'test_data')
            os.makedirs(save_dir, exist_ok=True)

            filename = f'canvas_image_{get_unique_filename()}_{i}.png'  # 이미지 파일 이름
            image_path = os.path.join(save_dir, filename)
            new_image = Image.new('RGBA', image.size, (255, 255, 255, 255))
            new_image.paste(image, (0, 0), image)

            new_image.save(image_path, format='PNG')

            image_urls.append(f'/static/images/test_data/{filename}')  # 이미지 URL 추가

        except Exception as e:
            return jsonify({'error': str(e)}), 400

    return jsonify({'image_urls': image_urls})  # 이미지 URL 반환

def get_latest_count():
    image_dir = os.path.join('static', 'images', 'test_data')
    filenames = os.listdir(image_dir)
    counts = [int(filename.split('_')[2].split('.')[0])
              for filename in filenames if filename.startswith('canvas_image_')]
    latest_count = (max(counts)) if counts else 0
    return latest_count

def check_and_print_answer():
    results = []
    for i in range(canvas_count):
        image_path = os.path.join('static', 'images', 'test_data', f'canvas_image_{get_latest_count()}_{i}.png')
        result = hangul_model.predict(image_path)
        # upload_to_s3(image_path, bucket_name, 'start_data', correct_label[i],  result)
        results.append(result)
    
    # 결과 비교
    # correct_labels = df['label'][0][:canvas_count]  # 첫 번째 행의 라벨 중 필요한 글자 수만큼 가져옴
    if results == list(correct_label):
        sound_url = url_for('static', filename='sound/HS01-S2-001')
    else:
        sound_url = url_for('static', filename='sound/newyear')

    return results, sound_url, correct_label

@app.route('/write.html')
def write_index():
    return render_template('write.html' ,canvas_count = canvas_count ,correct_label=correct_label)

def get_unique_filename():
    return time.strftime("%Y%m%d%H%M%S")

@app.route('/check_answer', methods=['POST'])
def check_answer():

    new_results = []
    
    for i in range(canvas_count):
        data = request.form[f'imageData{i}']
        try:
            image_data = base64.b64decode(data.split(',')[1])
            image = Image.open(BytesIO(image_data))
            
            save_dir = os.path.join('static', 'images', 'practicing')
            os.makedirs(save_dir, exist_ok=True)

            filename = f'canvas_image{i}.png'  # 이미지 파일 이름
            image_path = os.path.join(save_dir, filename)
            new_image = Image.new('RGBA', image.size, (255, 255, 255, 255))
            new_image.paste(image, (0, 0), image)

            new_image.save(image_path, format='PNG')
            result_prac = hangul_model.predict(image_path)

            new_results.append(result_prac)  # 이미지 URL 추가

        except Exception as e:
            return jsonify({'error': str(e)}), 400
        
    combined_result = ''.join(new_results)
    is_correct = (combined_result == correct_label)

    if is_correct:
        for i in range(canvas_count):
            save_dir = os.path.join('static', 'images', 'practicing')
            filename = f'canvas_image{i}.png'
            image_path = os.path.join(save_dir, filename)
            # upload_to_s3(image_path, bucket_name, 'guide_data', correct_label[i])
    return jsonify({"is_correct": is_correct})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)