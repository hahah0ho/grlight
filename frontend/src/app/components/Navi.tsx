'use client';
import React from 'react';
import Image from 'next/image';
import Logo3 from '../../images/Logo3.png'
import { useRouter } from 'next/navigation';


const TopNav: React.FC = () => {

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login')
  }

  const handleSignup = () => {
    router.push('/signup')
  }

  const handleHome = () => {
    router.push('/main')
  }
  const handleMenu = () => {
    router.push('/menu')
  }
  const handleAlbum = () => {
    router.push('/album')
  }

  return (
    <div className="w-full h-[10vh] bg-[#f5f4e6] flex items-center justify-between px-8 border-b border-gray-300 z-50">
      {/* 좌측 로고 섹션 */}
      <div className="flex items-center gap-4 relative h-full w-[268px]">
        <Image className="relative"
          src={Logo3}
          alt="Logo3"
          width={332}
          height={100}>
        </Image>
      </div>

      {/* 우측 버튼 섹션 */}
      <div className="flex items-center gap-6">
        {/* 로그인 및 가입 버튼 */}
        <button className="px-4 py-2 rounded-full bg-[#e7e2bb] text-[#453b35] text-lg font-dongle hover:bg-[#9EE557] transition-colors duration-300"
          onClick={handleLogin}>
          로그인
        </button>
        <button className="px-4 py-2 rounded-full bg-[#e7e2bb] text-[#453b35] text-lg font-dongle hover:bg-[#9EE557] transition-colors duration-300"
          onClick={handleSignup}>
          가입
        </button>

        {/* 아이콘 섹션 */}
        <div className="flex items-center gap-4">
          <button className="w-16 h-16 flex justify-center items-center">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="icon w-10 h-10 text-[#555555] hover:text-[#EB7D86] transition-colors duration-300 ease-in-out">
              <path d="M30 0H20V5H15V10H10V15H5V20H0V25H5V50H22.5V35H27.5V50H45V25H50V20H45V15H40V10H35V5H30V0ZM30 5V10H35V15H40V20H45V25H40V45H32.5V30H17.5V45H10V25H5V20H10V15H15V10H20V5H30Z" fill="currentColor" />
            </svg>
          </button>
          <button className="w-16 h-16 flex justify-center items-center">
            <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="icon w-10 h-10 text-[#555555] hover:text-[#EB7D86] transition-colors duration-300 ease-in-out"
            >
              <path d="M25.0038 17.9963H43.75V0H25.0038V17.9963ZM0 17.9963H18.7462V0H0V17.9963ZM25.0038 42H43.75V24.0037H25.0038V42ZM0 42H18.7462V24.0037H0V42Z" fill="currentColor" />
            </svg>
          </button>
          <button className="w-16 h-16 flex justify-center items-center">
            <svg width="8" height="46" viewBox="0 0 8 46" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="icon w-10 h-10 text-[#555555] hover:text-[#EB7D86] transition-colors duration-300 ease-in-out">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 4.46825C0 3.41581 0.418082 2.40647 1.16227 1.66227C1.90647 0.918083 2.91581 0.5 3.96825 0.5H3.99471C5.04716 0.5 6.0565 0.918083 6.80069 1.66227C7.54488 2.40647 7.96296 3.41581 7.96296 4.46825V4.49471C7.96296 5.54716 7.54488 6.5565 6.80069 7.30069C6.0565 8.04488 5.04716 8.46296 3.99471 8.46296H3.96825C2.91581 8.46296 1.90647 8.04488 1.16227 7.30069C0.418082 6.5565 0 5.54716 0 4.49471V4.46825ZM0 22.9868C0 21.9343 0.418082 20.925 1.16227 20.1808C1.90647 19.4366 2.91581 19.0185 3.96825 19.0185H3.99471C5.04716 19.0185 6.0565 19.4366 6.80069 20.1808C7.54488 20.925 7.96296 21.9343 7.96296 22.9868V23.0132C7.96296 24.0657 7.54488 25.075 6.80069 25.8192C6.0565 26.5634 5.04716 26.9815 3.99471 26.9815H3.96825C2.91581 26.9815 1.90647 26.5634 1.16227 25.8192C0.418082 25.075 0 24.0657 0 23.0132V22.9868ZM3.96825 37.537C2.91581 37.537 1.90647 37.9551 1.16227 38.6993C0.418082 39.4435 0 40.4528 0 41.5053V41.5317C0 42.5842 0.418082 43.5935 1.16227 44.3377C1.90647 45.0819 2.91581 45.5 3.96825 45.5H3.99471C5.04716 45.5 6.0565 45.0819 6.80069 44.3377C7.54488 43.5935 7.96296 42.5842 7.96296 41.5317V41.5053C7.96296 40.4528 7.54488 39.4435 6.80069 38.6993C6.0565 37.9551 5.04716 37.537 3.99471 37.537H3.96825Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
