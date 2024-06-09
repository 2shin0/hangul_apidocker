import torch.nn as nn
from torchvision.models import resnet50

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