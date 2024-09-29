// src/app/result/page.tsx
"use client";

import { useEffect, useState } from 'react';

export default function Result() {
  const [messages, setMessages] = useState([
    { type: "user", content: "파일을 분석해주세요." },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "분석 중입니다... 결과가 곧 도착합니다." },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "ai", content: "분석 결과: 긍정적인 피드백입니다!" },
        ]);
      }, 2000);
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-gray-300 shadow-lg w-full max-w-md p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">분석 결과</h1>
        <div className="chat-window h-64 overflow-y-scroll border border-gray-300 p-4 rounded-lg mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 mb-3 rounded-lg ${message.type === "user"
                ? "bg-black text-white text-right"
                : "bg-gray-100 text-black"
                }`}
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() => window.location.href = "/suggestion"}
        >
          다음 단계로 이동
        </button>
      </div>
    </div>
  );
}
