"use client"

import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../assets/logo.png'
import { AuthStore } from '@/stores/authStore'
import useModal from '@/hooks/common/useModal'
import GuideModal from '@/components/Home/GuideModal'
import { Button } from '../Button/Button'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
  const { isLogin, username } = AuthStore();
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div className='w-full h-18 flex items-center bg-white justify-between px-8 border-b border-gray-200'>
      <Link href='/' className='flex items-center hover:scale-105 transition-transform duration-300'>
        <Image src={Logo} alt='logo' width={40} height={40} />
      </Link>

      <div className='flex items-center gap-8'>
        <div>
          <Button variant="line" colorScheme="gradient" onClick={openModal} icon={<FaSearch />} size="sm" radius="full">
            Tabula 사용법 알아보기
          </Button>
        </div>
        
        {isLogin && username ? (
          <div className='text-[#292929] mr-5'>{username}님</div>
        ) : (
            <Button colorScheme="secondary" size="sm" radius="full">
              로그인
            </Button>
          )
        }
      </div>
      <GuideModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

export default Header