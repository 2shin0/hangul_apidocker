import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import cv2
from torchvision.models import resnet18, resnet34, resnet50, resnet101

## 인철 모델

class RecognitionModel(nn.Module):
    def __init__(self, num_chars=2350):
        super(RecognitionModel, self).__init__()
        self.num_chars = num_chars
        # CNN Backbone = 사전학습된 resnet50 활용
        resnet = resnet50(pretrained=True)
        resnet_modules = list(resnet.children())[:-3]
        self.feature_extract = nn.Sequential(
            # nn.Conv2d(1, 3, kernel_size=(1,1), stride=1),
            *resnet_modules,
            nn.Conv2d(1024, 64, kernel_size=(4,4), stride=1, padding=1),
            nn.MaxPool2d(2, 2),  # max pooling 사용
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True)
       )
        # 마지막에 FC 레이어 추가
        self.linear1 = nn.Linear(64, num_chars)
        # self.relu = nn.ReLU() # ReLU 활성화 함수 추가
        # self.linear2 = nn.Linear(128, num_chars) # 최종 출력 레이어
    def forward(self, x):
        # CNN - 특징 추출
        x = self.feature_extract(x)  # [batch_size, channels, height, width]
        # Global Average Pooling 적용
        x = nn.functional.adaptive_avg_pool2d(x, (1, 1))  # 각 채널의 평균값 계산
        x = x.view(x.size(0), -1)  # flatten
        # 마지막 FC 레이어 통과
        x = self.linear1(x)  # [batch_size, num_chars]
        # x = self.relu(x) # 활성화 함수 적용
        # x = self.linear2(x)
        return x


class HangulModel:
    def __init__(self, model_path, idx2char_path):
        #self.model = RecognitionModel()
        self.model= torch.load(model_path, map_location=torch.device('cpu'))
        self.model.eval()

        with open(idx2char_path, "r", encoding="utf-8") as file:
            words = file.read().split()
        self.idx2char = {idx: word for idx, word in enumerate(words, start=0)}

        self.transform_ops = transforms.Compose([
            transforms.Resize((64, 64)),
            transforms.ToTensor(),
            # transforms.Normalize(mean=(0.9101), std=(0.2440))
        ])

    def preprocess_image(self, image_path):
        image = cv2.imread(image_path)
        #gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        image = Image.fromarray(image)

        image = self.transform_ops(image)
        image = image.unsqueeze(0)

        return image

    def predict_image(self, image):
        with torch.no_grad():
            text_batch_logits = self.model(image)
            _, max_idx = torch.max(text_batch_logits, dim=1)
            predicted_label = max_idx.item()
            
        return predicted_label

    def predict(self, image_path):
        image = self.preprocess_image(image_path)
        predicted_label = self.predict_image(image)
        predicted_char = self.idx2char[predicted_label]
        
        return predicted_char