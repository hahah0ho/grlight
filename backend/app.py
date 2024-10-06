from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from openai import OpenAI 

client = OpenAI()

app = Flask(__name__)
CORS(app)  # CORS 설정으로 Next.js와의 통신 허용

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  # Flask 앱 설정에 UPLOAD_FOLDER 추가

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    message = request.form.get('message')

    response_message = "Received"
    if message:
        response_message += f", message: {message}"
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        response_message += f", file: {filename}"

    return {'message': response_message}, 200

def process_file(file):
    

    return

if __name__ == '__main__':
    app.run(debug=True)