'use client';

import Image from 'next/image'
import Logo from '../../../../assets/logo.png'
import { AuthStore } from '@/stores/authStore'
import GuideModal from '@/components/Home/GuideModal'
import { Button } from '../Button/Button'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useGoogleLogin } from '@/hooks/Login/useGoogleLogin'
import { useGoogleMessageListener } from '@/hooks/Login/useGoogleMessageListener'
import FeedbackModal from '@/components/Mypage/FeedbackModal'
import { useState } from 'react'

type ModalType = 'guide' | 'feedback' | null

const Header = () => {
  const { isLogin, username, loginType } = AuthStore();
  const [modalType, setModalType] = useState<ModalType>(null)
  const router = useRouter()
  const { handleLogin } = useGoogleLogin()
  useGoogleMessageListener()

  const handleLogoClick = () => {
    if (isLogin && loginType === 'user') {
      router.push('/subject')
    } else {
      router.push('/');
    }
  };

  const closeModal = () => setModalType(null)

  return (
    <div className="w-full h-18 flex items-center bg-white justify-between border-b border-gray-200 fixed z-5 px-4 sm:px-6 md:px-8">
      <div
        onClick={handleLogoClick}
        className="flex items-center hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
      >
        <Image src={Logo} alt="logo" width={40} height={40} />
      </div>

      <div className='flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
        <Button variant="line" colorScheme="primary" onClick={() => setModalType('feedback')} size="sm" radius="full" className='whitespace-pre hidden md:inline-flex'>
        ✨  서비스 의견 남기러 가기
        </Button>
        <Button variant="line" colorScheme="gradient" onClick={() => setModalType('guide')} icon={<FaSearch />} size="sm" radius="full">
          Tabula 사용법 알아보기
        </Button>
        {isLogin && username ? (
          username !== '게스트' ? (
            <Link href={'/mypage'}>
              <div className='text-[#292929] mr-2 sm:mr-3 md:mr-4 lg:mr-5 hover:cursor-pointer transition'>{username}님</div>
            </Link>
          ) : (
            <div className='text-[#292929] mr-5 cursor-default'>게스트님</div>
          )
        ) : (
          <Button
            colorScheme="secondary"
            size="sm"
            radius="full"
            onClick={handleLogin}
          >
            로그인
          </Button>
        )}
      </div>
      {modalType === 'feedback' && (
        <FeedbackModal username={username} onClose={closeModal} />
      )}
      {modalType === 'guide' && (
        <GuideModal isModalOpen={true} closeModal={closeModal} />
      )}
      
    </div>
  );
};

export default Header;
