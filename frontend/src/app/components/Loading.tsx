import React from 'react';
import Image from 'next/image';
import Logo1 from '../../images/Logo1.png'
import Logo2 from "../../images/Logo2.png";
import Title from "../../images/Title.png";

const Loading: React.FC = () => {
  return (
    <main className="relative w-full h-screen bg-[#F5F4E6] z-[9999]">
      {/* 배경 사각형 */}
      <div
        className="absolute"
        style={{
          top: '81.2vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '29.79vw',
          height: '2.78vh',
          backgroundColor: '#9EE557',
          borderRadius: '0.52vw'
        }}
      />

      {/* 로고들 */}
      <div
        className="absolute"
        style={{
          top: '16.94vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40.44vw',
          height: '40vh',
        }}
      >
        <Image
          className="absolute"
          src={Logo1}
          alt="Logo 1"
          style={{
            top: '12.04vh',
            width: '21.47vw',
            height: '28.1vh'
          }}
        />
        <Image
          className="absolute"
          src={Logo2}
          alt="Logo 2"
          style={{
            left: '19.06vw',
            width: '21.5vw',
            height: '40.2vh',
          }}
        />
      </div>

      {/* 제목 */}
      <Image
        className="absolute"
        src={Title}
        alt="Title"
        style={{
          top: '53.98vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50.26vw',
          height: '8.06vh'
        }}
      />

      {/* 로딩 텍스트 */}
      <div
        className="absolute font-pixelrobo font-medium text-center cursor-pointer"
        style={{
          top: '75.37vh',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '3.24vh',
        }}
      >
        <span className="text-[#FF7895]">L</span>
        <span className="text-[#9EE557]">o</span>
        <span className="text-[#DBA5B0]">a</span>
        <span className="text-[#EB7D86]">d</span>
        <span className="text-[#BBCB73]">i</span>
        <span className="text-[#FF7895]">n</span>
        <span className="text-[#DBA5B0]">g</span>
        <span className="text-[#FF7895]"> </span>
        <span className="text-[#9EE557]">.</span>
        <span className="text-[#FF7895]"> . </span>
        <span className="text-[#DBA5B0]">.</span>
      </div>

      {/* 진행 바 */}
      <div
        className="absolute bg-[#E9EABC] border-4 border-[#717171] rounded-md"
        style={{
          top: '81.2vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '62.92vw',
          height: '2.78vh',
        }}
      >
        <div
          className="bg-[#9EE557] rounded-md"
          style={{
            width: '1.4vw',
            height: '100%',
          }}
        />
      </div>
    </main>
  );
};

export default Loading;
