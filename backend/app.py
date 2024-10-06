from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from openai import OpenAI 
import json
import csv
import base64
from pydantic import BaseModel
from openai import OpenAI
from chatbot import *

client = OpenAI()

app = Flask(__name__)
CORS(app)  # CORS 설정으로 Next.js와의 통신 허용


def load_db():
    # 데이터베이스 파일 경로
    DB_FILE = './backend/userdb.json'
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as file:
            data=json.load(file)
            return data['users']
    else:
        return []

def save_db(new_user):
    DB_FILE = './backend/userdb.json'
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as file:
            data = json.load(file)

        # 기존 사용자 목록에 새 사용자 추가
        data['users'].append(new_user)

        with open(DB_FILE, 'w') as file:
            json.dump(data, file, indent=4)

@app.route('/sign_up', methods=['POST'])
def sign_up():
    data = request.json
    print(data)
    users = load_db()
    for user in users:
        if user['email'] == data['email'] or user['username'] == data['username']:
            return jsonify({'success': False, 'message': '이미 사용중인 이메일 또는 아이디입니다.'}), 409
    
    # 새 사용자 데이터를 추가
    new_user = {
        'username': data['username'],
        'email': data['email'],
        'password': data['password'],  # 주의: 실제 사용 시에는 비밀번호를 해시하여 저장해야 합니다.
        'chats': []
    }

    # 변경된 사용자 리스트를 저장
    save_db(new_user)

    return jsonify({'success': True, 'message': '회원가입 성공!'})

@app.route('/sign_in', methods=['POST'])
def sign_in():
    data = request.json
    print(data)
    users = load_db()
    print(users)
    for user in users:
        if user['username'] == data['username'] and user['password'] == data['password'] :
            return jsonify({'success': True, 'message': '로그인 성공!'})
    
    else:
        return jsonify({'success': False, 'message': '아이디 또는 비밀번호가 틀렸습니다.'})

    
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  # Flask 앱 설정에 UPLOAD_FOLDER 추가

@app.route('/upload', methods=['POST'])
def upload_file():
    message = request.form.get('message')
    if request.files:
        file = request.files.get('file')
    
        response_message = "Received"
        if message:
            response_message += f", message: {message}"
        if file:
            filename = secure_filename(file.filename)
            file_ext = filename.rsplit('.', 1)[1].lower()  # 파일 확장자 추출
            # 확장자에 따라 파일 처리
            if file_ext == 'txt':
                # TXT 파일 처리 로직
                input_data = file.read().decode('utf-8')
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                response_message += f", TXT file: {filename} saved"
                # csv_data = read_csv_file(file_path)
                # input_data = csvtotext(csv_data)
                relationship_result = relationship_agent(input_data, message)
                message_result = message_agent(input_data, relationship_result, message)
                datetime_result = datetime_agent(input_data, relationship_result, message)
                total_result = total_agent(input_data, message_result, relationship_result, datetime_result)
                recommend_result = recommend_agent(total_result, input_data, message)

                print(total_result)

                return {'user_message': message, 'total_result': total_result, "recommend_result": recommend_result}, 200

            
            elif file_ext in {'png', 'jpg', 'jpeg', 'gif'}:
                # 이미지 파일 처리 로직
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                response_message += f", Image file: {filename} saved"
                encoded_image = encode_image(file_path)
                input_data = check_image(encoded_image)
                relationship_result = relationship_agent(input_data, message)
                message_result = message_agent(input_data, relationship_result, message)
                datetime_result = datetime_agent(input_data, relationship_result, message)
                total_result = total_agent(input_data, message_result, relationship_result, datetime_result)
                recommend_result = recommend_agent(total_result, input_data, message)

                print(total_result)

                return {'user_message': message, 'total_result': total_result, "recommend_result": recommend_result}, 200
        
    else:
        input_data=message
        relationship_result = relationship_agent(input_data)
        message_result = message_agent(input_data, relationship_result)
        datetime_result = datetime_agent(input_data, relationship_result)
        total_result = total_agent(input_data, message_result, relationship_result, datetime_result)
        recommend_result = recommend_agent(total_result, input_data)

        print(total_result)

        return {'user_message': message, 'total_result': total_result, "recommend_result": recommend_result}, 200




def process_file(file):
    

    return

if __name__ == '__main__':
    app.run(debug=True)