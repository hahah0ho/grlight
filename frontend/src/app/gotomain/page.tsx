'use client';
import React from 'react';
import Image from 'next/image'
import Logo1 from '../../images/Logo1.png'
import Title from '../../images/Title.png'
import { useRouter } from 'next/navigation';


const GotomainPage: React.FC = () => {

  const router = useRouter();

  const handleMain = () => {
    // 로그인 로직 추가 (예: 유효성 검사, API 호출 등)
    router.push('/');
  };

  return (
    <div className="w-full h-screen overflow-hidden mx-auto pt-[99px] pb-[77px] bg-[#f5f4e6]">
      <div className="relative left-20">
        <Image
          src={Logo1}
          alt='Logo2'
          style={{
            width: '300px',
            height: '250px',
            transform: 'scaleX(-1)'
          }}
        />
      </div>
      <div className="flex flex-col bg-[#f5f4e6] justify-center items-center gap-32">
        <Image
          src={Title}
          alt='Title'
          style={{
            width: '1100px',
            height: '80px',
          }}
        />
        <button className='w-[650px] h-[100px] rounded-3xl p-[10px] gap-[10px] bg-[#463B35] text-white font-dongle text-lg sm:text-xl md:text-2xl lg:text-3xl transition-transform transform hover:scale-105'
          onClick={handleMain}>
          내 연애 진단받기
        </button>
      </div>
    </div>
  );
};

export default GotomainPage;