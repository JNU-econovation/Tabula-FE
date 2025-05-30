"use client"

import Image from 'next/image'
import Logo from '../../../../assets/logo.png'
import { AuthStore } from '@/stores/authStore'
import useModal from '@/hooks/common/useModal'
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
  const { isLogin, username } = AuthStore();
  const [modalType, setModalType] = useState<ModalType>(null)
  const router = useRouter()
  const { handleLogin } = useGoogleLogin()
  useGoogleMessageListener()

  const handleLogoClick = () => {
    if (isLogin && username) {
      router.push('/subject')
    } else {
      router.push('/')
    }
  }

  const closeModal = () => setModalType(null)

  return (
    <div className='w-full h-18 flex items-center bg-white justify-between px-8 border-b border-gray-200'>
      <div onClick={handleLogoClick} className='flex items-center hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
        <Image src={Logo} alt='logo' width={40} height={40} />
      </div>

      <div className='flex items-center gap-8'>
        <Button variant="line" colorScheme="primary" onClick={() => setModalType('feedback')} size="sm" radius="full" className='whitespace-pre'>
        ✨  서비스 의견 남기러 가기
        </Button>
        <Button variant="line" colorScheme="gradient" onClick={() => setModalType('guide')} icon={<FaSearch />} size="sm" radius="full">
          Tabula 사용법 알아보기
        </Button>
        
        {isLogin && username ? (
          <Link href={'/mypage'}>
            <div className='text-[#292929] mr-5'>{username}님</div>
          </Link>
        ) : (
            <Button colorScheme="secondary" size="sm" radius="full" onClick={handleLogin}>
              로그인
            </Button>
          )
        }
      </div>
      {modalType === 'feedback' && (
        <FeedbackModal username={username} onClose={closeModal} />
      )}
      {modalType === 'guide' && (
        <GuideModal isModalOpen={true} closeModal={closeModal} />
      )}
      
    </div>
  )
}

export default Header