from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI 

client = OpenAI()

app = Flask(__name__)
CORS(app)  # CORS 설정으로 Next.js와의 통신 허용

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    files = request.files.getlist('files')
    for file in files:
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    
    # 여기에 파이썬 함수를 돌리는 로직을 추가하면 됩니다.
    # 예시: process_file(file)

    return jsonify({'message': 'File uploaded successfully'}), 200

def process_file(file):
    

    return

if __name__ == '__main__':
    app.run(debug=True)