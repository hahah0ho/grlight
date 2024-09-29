// src/app/analysis/page.tsx
"use client";

import { useState } from 'react';

export default function Analysis() {
  const [messages] = useState([
    { type: "ai", content: "2024-01-01: 자신감을 가져보세요!" },
    { type: "ai", content: "2024-02-14: 선물 준비를 미리 하세요." },
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-gray-300 shadow-lg w-full max-w-md p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">연애 조언 및 히스토리</h1>
        <div className="chat-window h-64 overflow-y-scroll border border-gray-300 p-4 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-3 mb-3 rounded-lg bg-gray-100 text-black"
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
