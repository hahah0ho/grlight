'use client';
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import Navi from '../components/Navi';
import ChatBubble from "../components/ChatBubble";
import { useRouter } from 'next/navigation';
import Logo1 from "../../images/Logo1.png";
import Logo2 from "../../images/Logo2.png";
import Title from "../../images/Title.png";

interface Message {
  type: "user" | "bot";
  text: string;
}

const MainPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null); // 파일 상태 추가
  const [messages, setMessages] = useState<Message[]>([]); // Message 타입의 배열로 상태 정의
  const [input, setInput] = useState<string>(""); // 사용자가 입력 중인 텍스트를 저장하기 위한 상태
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false); // 채팅이 시작되었는지 여부 확인
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const chatEndRef = useRef<HTMLDivElement | null>(null); // 스크롤을 자동으로 최신 메시지로 이동시키기 위한 참조값

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  // 메시지가 추가될 때마다 스크롤을 최신 메시지로 이동시키기 위한 효과
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const router = useRouter();

  const handleChatbot = () => {
    router.push('/chatbot');
  };

  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
  }, []);

  const handleFileClick = useCallback(() => {
    document.getElementById('fileInput')?.click();
  }, []);

  // 메시지와 파일을 함께 전송하는 함수
  const handleSendMessage = async () => {
    setIsChatStarted(true); // 채팅이 시작됨을 표시
    setIsLoading(true); // 메시지 전송 시작 시 로딩 시작

    // if (input.trim() === "") {
    //   return; // 메시지가 없으면 아무 작업도 하지 않음
    // }

    // 사용자 메시지 추가
    setMessages((prev) => [
      ...prev,
      { type: "user", text: input }  // 입력된 메시지를 user로 추가
    ]);

    // 서버로 메시지 전송
    const formData = new FormData();
    formData.append("message", input); // 메시지 추가
    if (file) {
      formData.append("file", file); // 파일이 있을 경우 파일 추가
    }

    // 서버에 요청 보내기
    try {
      const response = await fetch('http://localhost:5000/upload', { // 실제 서버 엔드포인트로 수정 필요
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      // 서버에서 받은 total_result와 recommend_result를 차례로 추가
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: data.total_result || "총 결과가 없습니다." }, // total_result 추가
      ]);

      // 1초 지연 후 recommend_result 추가
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: data.recommend_result || "추천 결과가 없습니다." } // recommend_result 추가
        ]);
        setIsLoading(false); // 로딩 완료
      }, 1000); // 1초 후 recommend_result 출력

    } catch (error) {
      // 에러 발생 시 봇의 에러 메시지 추가
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Error occurred while sending message." }
      ]);
      console.error("Error:", error);
    }

    // 상태 초기화
    setInput("");
    setFile(null);
  };

  return (
    <main className="flex flex-col w-full h-screen max-h-screen">
      <Navi />
      <div className={`flex flex-col w-full h-full bg-[#fffef9] items-center justify-center p-4 overflow-hidden ${isChatStarted ? 'justify-start' : 'justify-center'}`}>
        
        {/* 상단 로고 이미지들 - 채팅이 시작되면 보이지 않도록 */}
        {!isChatStarted && (
          <div className="flex justify-center">
            <div className="relative mx-[-4px] mt-14 w-[30%] h-auto max-w-[300px]">
              <Image
                src={Logo1}
                alt="Logo 1"
                layout="responsive"
                width={300}
                height={300}
              />
            </div>
            <div className="relative mx-[-4px] w-[30%] h-auto max-w-[300px]">
              <Image
                src={Logo2}
                alt="Logo 2"
                layout="responsive"
                width={300}
                height={300}
              />
            </div>
          </div>
        )}

        {/* 중앙 타이틀 이미지 - 채팅이 시작되면 보이지 않도록 */}
        {!isChatStarted && (
          <div className="relative w-[80%] max-w-[620px] mt-[-24px]">
            <Image
              src={Title}
              alt="Title"
              layout="responsive"
              width={600}
              height={100}
            />
          </div>
        )}

        {/* 파일 첨부 및 설명 - 채팅이 시작되면 상단으로 이동 */}
        <div className={`flex flex-row w-[80%] max-w-[900px] gap-4 ${isChatStarted ? 'mt-8' : 'mt-12'} h-[200px]`}>
          <ChatBubble>
            <div className="flex flex-row gap-2 items-center mt-[-10px]">
              <div className="relative w-[75%] font-normal leading-loose text-base text-[#463B35]">지금 연락하는 그 사람과의 사랑...<br />
                그린라이트인지 궁금하다면 카카오톡 채팅 csv 파일이나 캡처 이미지를 첨부해줘.<br />
                그리구 상대방과 상황에 대해 간단하게 설명해줘~!
              </div>
              <div
                className="relative w-[30%] h-[150px] bg-[#fff] border-2 border-[#d3d3d3] flex justify-center items-center cursor-pointer rounded-3xl"
                onDrop={handleFileDrop}
                onDragOver={(event) => event.preventDefault()}
                onClick={handleFileClick}
              >
                <p className="text-[#8f8a86] text-lg font-dongle">
                  Drag & Drop or <span className="text-[#6e6e6e] font-bold">+</span>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </ChatBubble>
        </div>

        {/* 채팅 내역 */}
        <div className="flex flex-col w-full max-w-[900px] mt-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              mirrored={message.type === "user"} // 유저 메시지일 때 오른쪽 배치
              backgroundColor={message.type === "user" ? "#9EE557" : "#ECEBD8"} // 유저는 초록색, 봇은 기본 배경색
            >
              <span>{message.text}</span>
            </ChatBubble>
          ))}
          {/* 채팅 영역 끝 스크롤 참조 */}
          <div ref={chatEndRef}></div>
        </div>


        {/* 채팅 입력 박스 - 채팅 시작 후 하단에 고정 */}
        <div className={`flex items-center justify-between w-[80%] max-w-[1000px] h-[64px] py-0 px-4 ${isChatStarted ? 'mt-auto' : 'mt-24'} box-border bg-[#ECEBD8] border-solid border-[3px] border-black rounded-[45px]`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-[#ECEBD8] text-black bg-[#ECEBD8] outline-none"
            placeholder="메시지를 입력하세요..." 
          />
          <button className="w-[69px] h-[50px] md:w-[69px] md:h-[40px] bg-[#9EE557] rounded-full flex justify-center items-center hover:bg-[#3D733F]"
            onClick={handleSendMessage}>
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M32.2746 14.7083L17.4003 14.7083L17.4003 10.2887L32.2746 10.2887L25.2217 3.12316L28.2957 2.79148e-06L37.5237 9.37242L39.574 11.4555C39.709 11.5924 39.8162 11.7549 39.8893 11.9339C39.9624 12.1129 40 12.3048 40 12.4985C40 12.6923 39.9624 12.8842 39.8893 13.0632C39.8162 13.2421 39.709 13.4047 39.574 13.5415L28.2957 25L25.2217 21.8739L32.2746 14.7083ZM13.0502 14.7083L8.70013 14.7083L8.70013 10.2887L13.0502 10.2887L13.0502 14.7083ZM4.35006 14.7083L-2.91497e-06 14.7083L-2.5286e-06 10.2887L4.35006 10.2887L4.35006 14.7083Z" fill="#FFFFFA" />
            </svg>
          </button>
        </div>
      </div>
      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-3xl">Loading...</div>
        </div>
      )}

    </main>
  );
};

export default MainPage;
