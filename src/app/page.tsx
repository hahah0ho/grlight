'use client';
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import Navi from '../app/components/Navi';
import ChatBubble from "./components/ChatBubble";
import { useRouter } from 'next/navigation';
import Logo1 from "../images/Logo1.png";
import Logo2 from "../images/Logo2.png";
import Title from "../images/Title.png";

interface Message {
  type: "user" | "bot";
  text: string;
}



const MainPage: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]); // Message 타입의 배열로 상태 정의
  const [input, setInput] = useState<string>(""); // 3. 사용자가 입력 중인 텍스트를 저장하기 위한 상태
  const chatEndRef = useRef<HTMLDivElement | null>(null); // 4. 스크롤을 자동으로 최신 메시지로 이동시키기 위한 참조값

  // 5. 사용자가 메시지를 전송하는 함수
  const handleSendMessage = () => {
    if (input.trim()) {
      // 6. 입력된 메시지가 공백이 아닐 때만 처리
      setMessages((prev) => [
        ...prev,
        { type: "user", text: input }, // 7. 사용자가 입력한 메시지 추가
        { type: "bot", text: "AI 응답입니다. :) 이것은 하드코딩된 예시입니다." }, // 8. AI 응답 메시지 추가 (하드코딩된 예시)
      ]);
      setInput(""); // 9. 입력 필드를 비웁니다.
    }
  };

  // 10. 메시지가 추가될 때마다 스크롤을 최신 메시지로 이동시키기 위한 효과
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

  return (
    <main className="flex flex-col w-full h-screen max-h-screen">
      <Navi />
      <div className="mt-[-40px] flex flex-col w-full h-full bg-[#fffef9] items-center justify-center p-4 overflow-hidden">

        {/* 상단 로고 이미지들 */}
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

        {/* 중앙 타이틀 이미지 */}
        <div className="relative w-[80%] max-w-[620px] mt-[-24px]">
          <Image
            src={Title}
            alt="Title"
            layout="responsive"
            width={600}
            height={100}
          />
        </div>

        {/* 안내 배경 박스 */}
        <div className="flex flex-row w-[80%] max-w-[900px] gap-4 mt-12 h-[200px]">
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
                  onChange={(event) => console.log(event.target.files)}
                />
              </div>
            </div>
          </ChatBubble>
        </div>


        <div className="flex items-center justify-between w-[80%] max-w-[1000px] h-[64px] py-0 px-4 mt-24 box-border bg-[#ECEBD8] border-solid border-[3px] border-black rounded-[45px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-[#ECEBD8] text-black bg-[#ECEBD8] outline-none"
            placeholder="메시지를 입력하세요..." // 14. 사용자가 메시지를 입력할 때 보이는 플레이스홀더
          />
          <button className="w-[69px] h-[50px] md:w-[69px] md:h-[40px] bg-[#9EE557] rounded-full flex justify-center items-center hover:bg-[#3D733F]"
            onClick={handleSendMessage}>
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M32.2746 14.7083L17.4003 14.7083L17.4003 10.2887L32.2746 10.2887L25.2217 3.12316L28.2957 2.79148e-06L37.5237 9.37242L39.574 11.4555C39.709 11.5924 39.8162 11.7549 39.8893 11.9339C39.9624 12.1129 40 12.3048 40 12.4985C40 12.6923 39.9624 12.8842 39.8893 13.0632C39.8162 13.2421 39.709 13.4047 39.574 13.5415L28.2957 25L25.2217 21.8739L32.2746 14.7083ZM13.0502 14.7083L8.70013 14.7083L8.70013 10.2887L13.0502 10.2887L13.0502 14.7083ZM4.35006 14.7083L-2.91497e-06 14.7083L-2.5286e-06 10.2887L4.35006 10.2887L4.35006 14.7083Z" fill="#FFFFFA" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
