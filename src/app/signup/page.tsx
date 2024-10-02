'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 로직 추가 (예: 유효성 검사, API 호출 등)
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#f5f4e6] p-4 overflow-hidden">
      <div className="w-full max-w-[420px] px-12 py-10 bg-white rounded-[20px] shadow-lg border-[#463b35] flex flex-col items-center">
        <div className="w-full flex flex-col items-start gap-8">
          <div className="w-full mb-4 gap-6">
            <h1 className="text-[#453b35] text-2xl md:text-3xl font-bold leading-tight">
              회원가입
            </h1>
            <p className="text-[#060505] text-lg md:text-xl font-normal mt-6 leading-snug">
              회원가입하고 그연시를 시작해요!
            </p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-[#453b35] text-lg md:text-xl font-normal">
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full h-10 md:h-12 pl-4 bg-[#fbeee7] rounded-[15px] text-[#453b35] text-base md:text-lg"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[#453b35] text-lg md:text-xl font-normal">
                아이디
              </label>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                className="w-full h-10 md:h-12 pl-4 bg-[#fbeee7] rounded-[15px] text-[#453b35] text-base md:text-lg"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[#453b35] text-lg md:text-xl font-normal">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full h-10 md:h-12 pl-4 bg-[#fbeee7] rounded-[15px] text-[#453b35] text-base md:text-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-6 bg-[#463b35] rounded-[15px] text-white text-lg md:text-2xl font-bold transition-transform transform hover:scale-105"
            onClick={handleLogin}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
