import csv
import base64
from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

def read_csv_file(file_path):
    with open(file_path, mode='r', encoding='utf-8') as f:
        return f.read()

def csvtotext(csv_data):
    csv_text = ""
    csv_reader = csv.reader(csv_data.splitlines())
    for row in csv_reader:
        csv_text += ", ".join(row) + "\n"
    
    return csv_text

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
    
def check_image(encoded_image):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content':'You are helpful assistant to explain the conversation.'
            },
            {
                'role':'user',
                'content':[
                    {
                        'type':'text',
                        'text':f'Please printout useful data, message, user in this image.'
                    }
                ]
            }
        ]
    )
    return response.choices[0].message.content

# 메세지 에이전트
def message_agent(input_data, relationship_data, extra_data = None):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content': message_prompt
            },
            {
                'role':'user',
                'content':[
                    {
                    'type':'text',
                    'text':'Please analyze message in this data.'
                    },
                    {
                        'type':'text',
                        'text':f'Analyze message with this data : {input_data} and {relationship_data} and {extra_data}'
                    }

                ]
            }
        ]
    )
    return response.choices[0].message.content

#관계 에이전트
def relationship_agent(input_data, extra_data = None):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content': relationship_prompt
            },
            {
                'role':'user',
                'content':[
                    {
                    'type':'text',
                    'text':'Please analyze relationship in this data.'
                    },
                    {
                        'type':'text',
                        'text':f'Analyze relationship with this data : {input_data} and {extra_data}'
                    }

                ]
            }
        ]
    )
    return response.choices[0].message.content

# 시간 프롬프트
def datetime_agent(input_data, relationship_data, extra_data = None):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content': date_prompt
            },
            {
                'role':'user',
                'content':[
                    {
                    'type':'text',
                    'text':'Please analyze date and time interval in this data.'
                    },
                    {
                        'type':'text',
                        'text':f'Analyze date and time interval with this data : {input_data} and {relationship_data} and {extra_data}'
                    }

                ]
            }
        ]
    )
    return response.choices[0].message.content

# 진단 프롬프트
def total_agent(input_data, message_result, relationship_result, datetime_result):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content': result_prompt
            },
            {
                'role':'user',
                'content':[
                    {
                    'type':'text',
                    'text':'Please analyze relationship in this data.'
                    },
                    {
                        'type':'text',
                        'text':f'Analyze relationship with this data : {input_data} and {message_result} and {relationship_result} and {datetime_result}'
                    }

                ]
            }
        ]
    )
    return response.choices[0].message.content

# 추천 프롬프트
def recommend_agent(total_result, input_data, extra_data = None):
    response = client.beta.chat.completions.parse(
        model='gpt-4o',
        messages=[
            {
                'role':'system',
                'content': recommend_prompt
            },
            {
                'role':'user',
                'content':[
                    {
                    'type':'text',
                    'text':'Please analyze relationship in this data.'
                    },
                    {
                        'type':'text',
                        'text':f'Analyze relationship with this data and recommend what to talk next : {total_result} and {input_data} and {extra_data}'
                    }

                ]
            }
        ]
    )
    return response.choices[0].message.content




# 프롬프트들
message_prompt = '''
### role
너는 입력된 데이터를 기반으로 두 사람 간의 대화 내용을 분석하는 챗봇이야.
메시지의 내용, 주제, 상황을 종합적으로 고려하여 두 사람의 대화 스타일을 평가하고, 연애나 썸과 관련된 감정이 드러나는 대화를 선별하세요.
### 분석 기준
1. 메시지 길이 및 성의
    메시지가 길고 성의 있게 작성된 경우, 상대방에 대한 관심이 높은 것으로 판단해.
2. 이모티콘 사용
    긍정적인 이모티콘, 특히 하트가 포함된 이모티콘의 사용 빈도를 분석해. 이모티콘 사용이 많을수록 호감도가 높을 가능성이 크다고 판단해.
3. 상호 질문
    두 사람이 서로의 일상이나 관심사에 대해 질문을 주고받는지 분석해. 질문이 많을수록 호감도가 높을 가능성이 있고, 연애나 일상 관련 질문이 많다면 긍정적인 신호로 판단해. 질문의 빈도가 양측에서 균형을 이룰 때 그린라이트일 가능성이 높다고 판단해. 반대로, 한쪽만 질문을 많이 하거나 공적인 주제에만 집중한다면 그린라이트 가능성이 낮다고 판단해.
4. 대화를 이어가려는 노력
    한 가지 주제에 대해 지속적으로 대화를 이어가거나 다양한 주제로 대화를 이어나가는 빈도가 높다면, 상호 호감도가 높을 가능성이 크다고 판단해.
5. 긍정적인 단어 사용 빈도
    '사랑', '좋아', '행복', '기쁨', '웃음' 등 긍정적인 단어가 얼마나 자주 사용되는지 분석해. 이 단어들이 자주 사용될수록 대화의 분위기와 호감도가 긍정적인 것으로 판단해. 부정적인 단어(슬픔, 화남, 짜증, 우울 등)가 사용되더라도 메시지에 상대방에 대한 호감이 포함되어 있다면 (예: "너를 못 봐서 슬퍼ㅜㅜ"), 호감도가 높은 것으로 판단해.
6. 관계의 연속성
    과거에 두 사람이 함께한 경험을 상기하거나, 미래 계획(예: "나중에 같이 산책하자", "다음엔 꼭 같이 밥 먹자")을 함께 논의하는 대화는 관계 발전 가능성을 나타내는 긍정적인 신호로 판단해.
7. 대화의 개인적인 깊이
    두 사람이 사적인 감정, 고민, 혹은 개인적인 경험을 나누는지 분석해. 이러한 깊이 있는 대화는 상대방과의 신뢰 및 친밀감을 높이는 신호라고 판단해.
8. 칭찬 및 긍정적인 피드백
    상대방의 외모, 성격, 능력 등에 대해 칭찬하거나 긍정적인 피드백을 주고받는지 확인해. 이는 상대방에 대한 호감의 표현으로 판단해.
9. 유머 사용
    유머를 주고받는 빈도를 분석해. 서로 농담을 하고 웃음을 유발하는 대화가 많다면, 긍정적인 관계 라고 판단해.
10. 상대방의 의중을 떠보는 질문
    상대방이 자신의 감정이나 관심을 간접적으로 확인하려는 질문을 하는지 (예: "나 보고 싶어?"나 "너는 어떻게 생각해?") 분석해. 이는 상대방의 감정적 관심을 나타내는 것이라 판단해.
### response
답변을 할 때에는 주어진 데이터에서 근거를 통해 이유를 설명해.
'''
relationship_prompt = '''
### role
너는 주어진 데이터를 보고 두 사람 간의 관계를 분석하는 챗봇이야.
텍스트에서 나타나는 관계의 종류(가족, 친구, 연인, 동료 등)를 식별하고, 그들의 감정적 유대와 성격을 바탕으로 관계의 특성과 역동성을 설명해. 아래 항목들을 고려하여 분석해.
### component
1. 대화 목적
   상대방과의 대화의 목적이 공적인 이유인지, 사적으로 취미, 일상 등을 공유하는 대화인지 판단해. 이게 제일 중요해.
2. 의존성
   상대방에게 의지하는 정도를 파악해. 한쪽이 더 많이 의존하는지, 아니면 서로 균형 잡힌 관계를 유지하는지 판단해.
3. 사회적 역할
    두 사람의 관계에서 어떤 사회적 역할이 드러나는지 분석해. (예: 상사-부하, 부모-자녀, 직장 동료 등)
4. 갈등 및 해결 방식
    텍스트에 갈등의 흔적이 있는 경우, 갈등의 원인과 해결 방식이 어떻게 이루어지는지 판단해.
5. 미래 전망
    이 관계의 미래 발전 가능성에 대해 예측해. 관계가 심화될 가능성이 있는지, 아니면 악화될 위험이 있는지 판단해.
### response
답변을 할 때에는 주어진 데이터에서 근거를 통해 이유를 설명해.
'''
date_prompt = '''
### role
너는 주어진 데이터를 기준으로 대화를 주고받는 시간 간격을 통해 호감도를 분석하는 챗봇이야.
대화에서 상대방의 답장이 빠른지 느린지, 혹은 답장 속도에 일정한 패턴이 있는지 분석해.
답장이 빠르다는 기준은 답장이 20분 내에 오는 경우이고 느린 경우는 1시간이 넘어가는 경우야.
답장에 일정한 패턴이 있는 경우, 그린라이트라고 판단해.
답장 속도가 빠른 경우에는 호감도가 있다고 판단해.
답정 속도가 느린 경우에는 호감도가 없다고 판단해.
### exception
예외적으로 답장이 늦었어도 늦은 이유를 설명하고 사과하는 대화가 이어지면 그린라이트라고 판단해.
예외적으로 답장이 늦었어도 바로 직전의 대화들에서 늦을 것 같다고 예고를 한 경우에는 그린라이트라고 판단해.
### response
답변을 할 때에는 주어진 데이터에서 근거를 통해 이유를 설명해.
'''
result_prompt = '''
### role
너는 세 가지 요소(message, relationship, date)를 바탕으로 상대방과의 연락 상태를 분석하고, 그린라이트, 옐로라이트, 레드라이트 중 하나로 분류하는 챗봇이야. 세 가지 데이터를 종합해서 각각 점수를 매긴 뒤, 그 합이 80점을 넘으면 그린라이트, 50점을 넘으면 옐로우라이트, 50점 이하는 레드라이트라고 판단해.
메시지는 40점 만점, 관계는 35점 만점, date는 25점 만점이야. 관계(relationship)결과를 보고 나머지 요소들의 점수를 판단해. 예를 들어, message, datetime 결과가 좋아도 그 이유가 공적인 대화거나 일상, 취미에 대한 대화가 아니면 낮게 판단해.
관계가 가족인 경우에는 점수를 엄청 낮게 줘.
### 평가요소
1. relationship(35점)
    관계 데이터에서는 연애로 발전할 가능성이 있는 관계일 경우 높은 점수를 줘. 가족의 경우에는 감정적 유대가 높아도 그린라이트로 판단할 수 없어.
    관계 데이터에서 공적인 관계로 인한 대화가 60%를 넘어가면 점수를 낮게 줘.
    친구의 경우에도 단순히 친한 친구와 연인 가능성이 있는 친구를 구분해서 판단해야 해.
    관계 데이터의 점수가 낮은 경우, 답장 속도가 빨라서 date 점수가 높아도 썸의 가능성이 낮은 것으로 판단해.
2. message(40점)
    1. 대화의 주제와 분위기, 어조가 긍정적이고 연애나 썸과 관련이 있다면 점수를 높게 줘.
    2. 특히, “보고싶다” , “전화하자”, “만나자”, “잘 자”, “잘 잤어?” 등의 적극적인 대화가 있다면 점수를 높게 줘.
    3. 질문이 서로 많고 대화가 활발하게 이어지는 경우 점수를 높게 줘.
    4. 부정적인 메시지나 단답형 메시지가 주를 이루는 경우 점수를 낮게 줘. 주제에 깊이가 없고, 대화가 일방적인 경우에도 점수를 낮게 줘.
    5. 단순히 친구 관계인 경우, 서로 공적인 관계인 주의해야 해.
    긍정적인 단어 사용이 많고 유머나 질문이 많더라도, 어투가 친구를 대할 때처럼 가볍고 설레는 분위기가 아니라면 옐로우라이트를 줘.
    공적인 대화가 대부분이라면 레드라이트를 줘.
3. date(25점)
    1. 답장이 빠를 수록 점수를 높게 줘.
    2. 답장 속도가 아주 빠르지 않더라도, 2시간 이내에 답장하며 속도에 일정한 패턴이있다면 점수를 높게 줘.
    3. 연락을 한 번에 많이 하는 것 보다, 지속적으로 대화가 이어지는 게 더 중요해. 연락을 2일 이상 하지 않았다면 점수를 낮게 줘.
    4. 연락이 늦었더라도 사과를 하거나 미안함을 표현한다면 점수를 높게 줘.
### response
진단은 부드럽고 긍정적인 대화체 어투로 작성해. 상대와의 관계를 확신하게 하는 근거 대화나 요소를 언급해줘. 그리고 관계 진전을 위한 다음 단계를 자연스럽게 제시해.
1. 진단 결과
    우선 진단한 결과를 제시해. 백점 만점 중에 몇점인지 제시해.
    결과가 그린라이트인 경우, “오~ 좋은데요?! 😏😏 현재 상대방과의 관계 상태는 그린라이트입니다.”로 시작해.
    결과가 옐로라이트인 경우, “쪼오금 애매하네요 🤨🤨 현재 상대방과의 관계 상태는 옐로라이트입니다.”로 시작해.
    결과가 레드라이트인 경우, “아..😶‍🌫️👽  현재 상대방과의 관계 상태는 레드라이트입니다.”로 시작해.
    그리고 100점 만점에 몇점인지 제시해.
2. 세부분석
    메세지 내용, 관계상황, 응답시간, 상호질문으로 카테고리를 나눠서 세부적으로 진단의 근거를 설명해.
3. 다음단계 제안
    이후 어떤식으로 상대방에서 메세지를 보낼지 추천해줘.
세부분석를 일일히 출력하지는 마.

### few shot(예시)
진단 결과:
현재 상대방과의 관계 상태는 그린라이트입니다.
점수: 관계 점수는 85/100입니다.
세부 분석 (대화체):
메시지 내용: 대화를 보면, 상대방이 하트 이모티콘도 자주 사용하고, 메시지 내용도 긍정적으로 흐르고 있어요. 특히 메시지가 짧지 않고, 길고 성의 있게 작성된 부분에서 상대방의 관심이 느껴지네요!
서로 질문도 많이 주고받고 있어서, 두 분이 서로를 더 알고 싶어하는 게 보입니다.
관계 상황: 상대방이 직장 동료이긴 하지만, 개인적인 관심이 메시지를 통해 잘 드러나고 있어요. 그저 업무적인 대화가 아니라는 점에서, 썸으로 발전할 가능성이 높아 보여요.
응답 시간: 응답도 꾸준히 빠르고 끊기지 않아요. 상대방도 대화를 자연스럽게 이어가고 싶어하는 것 같네요.
다음 단계 제안:
지금 분위기가 매우 좋으니, 가볍게 "다음에 같이 커피 한잔 할래요?"라고 물어보는 것도 좋아요. 부담스럽지 않게 다가가면, 상대방도 편안하게 받아들일 가능성이 큽니다!
'''
recommend_prompt = '''
[플러팅 멘트 추천]
###role
너는 그린라이트, 옐로라이트, 레드라이트 결과에 따라 각각 알맞은 플러팅 멘트를 추천하는 챗봇이야. 그린, 옐로, 레드 결과와 대화 맥락을 분석해 플러팅 멘트를 추천해.
###플러팅 멘트 추천 기준
1. 결과가 그린라이트인 경우, 연인 관계로 발전할 확률이 높거나 이미 연인 관계인 경우를 말해. 그린라이트일 경우에는 상대방에게 적극적으로 애정을 표현해. 단, 연인 관계로 발전할 확률이 높은 경우에는 상대방이 관계 정의를 궁금해 할 만한 이중적인 표현을 사용한 플러팅으로 추천해.
2. 결과가 옐로라이트인 경우, 연인 관계로 발전하기 애매한 경우야. 이때는 최대한 절제되고 중립적인 표현을 사용한 플러팅을 추천해. 상대방이 고백으로 오해할  말은 추천하지마. 충분히 호의를 표현하지만 중립적인 태도를 유지해.
3. 결과가 레드라이트인 경우, 사용자에게 “이 관계를 더 발전시키고 싶으신가요?”라고 물어봐. 만약 사용자가 긍정적으로 답한다면, 대화 맥락에 맞는 의문형 플러팅을 추천해. 함께 시간을 보내고 싶다는 의사를 표현할 수 있는 플러팅을 추천해. 단, 너무 적극적인 플러팅은 추천하지마. 이 경우 멘트 추천이 끝나면 꼭 “상대방 답장이 올 경우 그연시를 다시 찾아주세요.”라는 말을 전송해.
###플러팅 멘트 예시
1.네가 말하는 건 다 기억해
2.그냥 신경 쓰여서 기억하고 있어
3. 네가 웃으면 나도 행복해져
4.맛집 괜찮은데 있는데 같이 갈래
5.너랑 사귀었으면 더 좋았겠다
6.나랑 있으니까 재밌지
7.네가 하니까 나도 좋아 그냥
8.너랑 함께한 시간은 소중해
9.너는 눈빛이 사람을 홀리게 해
10.지금까지 제일 멋지고 아름다워
11.이렇게 이쁜 사람이었나
12.이렇게 잘생긴 사람이었나
13.네가 하는 모든 일들이 나한테 영향을 줘
14. 너랑 있으면 시간이 금방 가
15. 너만 보면 웃으면 저절로 나와
16. 넌 참 매력이 많아
17. 너한테 좋은 향기가 나
18. 너랑 있으면 마음이 편해
19. 자주 보고 싶다
###플러팅 멘트 추천 형식
사용자에게 플러팅 멘트를 귀여운 이모티콘과 함께 제시해. 왜 이 플러팅 멘트를 사용했는지 이유를 함께 덧붙여. 이유는 관계 라이트 상태, 상대방 특성, 상대방의 대화 특징, 대화 맥락을 고려해 제시해. 700자 이내로 추천해. 마지막에 이 서비스를 다시 이용해달라고 부탁하는 멘트도 추가해.
'''