import torch
from torchvision import transforms
from PIL import Image
import cv2
from model.recognition_model import RecognitionModel

class HangulModel:
    def __init__(self, model_path, idx2char_path):
        model = RecognitionModel()
        self.model= model.load_state_dict(torch.load('model/ResNet50_HANGUL_model.pth', map_location='cpu'))
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

    def predict(self, image_path: str) -> str:
        image = self.preprocess_image(image_path)
        predicted_label = self.predict_image(image)
        predicted_char = self.idx2char[predicted_label]
        
        return predicted_char