'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SignupData {
  email: string;
  username: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // 폼 제출시 페이지 리로드 방지

    const signupData: SignupData = {
      "email": email,
      "username": username,
      "password": password,
    };

    // 여기서 API 주소는 당신의 백엔드 엔드포인트로 설정해주세요.
    const response = await fetch('http://localhost:5000/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (data.success) {
      router.push('/'); // 성공적으로 회원가입이 되면 로그인 페이지로 이동
    } else {
      alert(data.message); // 실패시 서버로부터 받은 메시지를 알림
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-screen bg-[#f5f4e6] p-4 overflow-hidden">
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
              onClick={handleSubmit}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
