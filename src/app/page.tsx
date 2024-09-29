// src/app/page.tsx
"use client";

import { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("파일 업로드 성공");
        window.location.href = "/result";
      } else {
        console.error("파일 업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white border border-gray-300 shadow-lg w-full max-w-md p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">파일 업로드</h1>
        <div className="flex flex-col items-center">
          <div className="w-full mb-4 p-4 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <label className="w-full flex flex-col items-center justify-center text-gray-700">
              <input type="file" multiple className="hidden" onChange={handleFileChange} />
              <span>파일을 드래그하거나 클릭하여 업로드하세요</span>
            </label>
          </div>
          {files.length > 0 && (
            <ul className="list-disc list-inside w-full text-black text-left mb-4">
              {files.map((file, index) => (
                <li key={index} className="mb-1">{file.name}</li>
              ))}
            </ul>
          )}
          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            onClick={handleFileUpload}
          >
            대화 시작
          </button>
        </div>
      </div>
    </div>
  );
}
