// src/app/suggestion/page.tsx
"use client";

import { useState } from 'react';

export default function Suggestion() {
  const [messages, setMessages] = useState([
    { type: "ai", content: "제가 추천할 수 있는 멘트는 다음과 같습니다." },
    { type: "ai", content: "상대방에게 긍정적인 말을 해보세요." },
    { type: "ai", content: "상대의 의견을 존중해 주세요." },
  ]);

  const addSuggestion = () => {
    setMessages((prev) => [
      ...prev,
      { type: "ai", content: "항상 경청해 보세요." },
    ]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-gray-300 shadow-lg w-full max-w-md p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">추천 멘트</h1>
        <div className="chat-window h-64 overflow-y-scroll border border-gray-300 p-4 rounded-lg mb-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-3 mb-3 rounded-lg bg-gray-100 text-black"
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition mb-4"
          onClick={addSuggestion}
        >
          더 많은 멘트 보기
        </button>
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() => window.location.href = "/analysis"}
        >
          연애 조언 및 히스토리 보기
        </button>
      </div>
    </div>
  );
}
