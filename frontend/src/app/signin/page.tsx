'use client';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState, FormEvent} from 'react';
import Image from 'next/image';
import Title from '../../images/Title.png';

interface SigninData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleGotomain = async (event: FormEvent) => {
    const signupData: SigninData = {
      "username": username,
      "password": password,
    };

    // 여기서 API 주소는 당신의 백엔드 엔드포인트로 설정해주세요.
    const response = await fetch('http://localhost:5000/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (data.success) {
      router.push('/gotomain'); 
    } else {
      alert(data.message); 
    }
  };
  const handleSignup = () => {
    router.push('/signup'); // 회원가입 페이지 경로로 이동
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#f5f4e6] px-4 overflow-hidden">
      {/* 상단 제목 */}
      <div className="w-[80%] max-w-[600px] mb-8">
        <Image
          src={Title}
          alt="Title"
          layout="responsive"
          width={600}
          height={100}
        />
      </div>

      {/* 로그인 박스 */}
      <div className="w-full max-w-[420px] px-12 py-10 bg-white rounded-[20px] shadow-lg border-[#463b35] flex flex-col">
        {/* 타이틀 */}
        <div className="mb-8 text-left">
          <h2 className="text-[#453b35] text-2xl md:text-3xl leading-tight mb-4 font-sans">
            로그인 하고 <br />
            그린라이트 판별하기
          </h2>
        </div>

        {/* 로그인 입력 폼 */}
        <form className="flex flex-col gap-4">
          {/* 아이디 필드 */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[#453b35] text-lg md:text-xl mb-2 font-dongle">
              아이디
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="w-full p-3 rounded-[15px] bg-[#fbeee7] text-[#453b35] text-base md:text-lg font-dongle placeholder-[#d1b7a9] focus:outline-none border border-[#e2dcd5]"
            />
          </div>

          {/* 비밀번호 필드 */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[#453b35] text-lg md:text-xl mb-2 font-dongle">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full p-3 rounded-[15px] bg-[#fbeee7] text-[#453b35] text-base md:text-lg font-dongle placeholder-[#d1b7a9] focus:outline-none border border-[#e2dcd5]"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="button"
            className="w-full py-3 mt-6 bg-[#463b35] text-white text-lg md:text-2xl font-dongle rounded-[15px] hover:bg-[#372d28] transition-colors duration-300"
            onClick={handleGotomain}
          >
            로그인
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSignup}
            className="text-[#453b35] text-lg md:text-xl hover:underline font-dongle"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
