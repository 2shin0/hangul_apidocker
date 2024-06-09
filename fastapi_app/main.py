from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
import os
from model.hangul_model import HangulModel

app = FastAPI()

MODEL_PATH = 'model/ResNet50_HANGUL_model.pth'
IDX2CHAR_PATH = 'model/ks-1001.txt'

hangul_model = HangulModel(MODEL_PATH, IDX2CHAR_PATH)

class ImageData(BaseModel):
    image: str

@app.post("/predict/")
async def predict(data: ImageData):
    try:
        image_data = base64.b64decode(data.image)
        image = Image.open(BytesIO(image_data))
        temp_path = 'temp_image.png'
        image.save(temp_path)

        prediction = hangul_model.predict(temp_path)
        os.remove(temp_path)

        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))