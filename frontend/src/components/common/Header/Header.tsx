import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../assets/logo.png'

interface HeaderProps {
  isLogin: boolean;
  username: string;
}

const Header = ({ isLogin, username }: HeaderProps) => {
  return (
    <div className='w-full h-18 flex items-center bg-white justify-between px-8 border-b border-gray-200'>
      <Link href='/' className='flex items-center hover:scale-115 transition-transform duration-300'>
        <Image src={Logo} alt='logo' width={40} height={40} />
      </Link>

      <div className='flex items-center gap-9'>
        <div>
          <button className='flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 border rounded-full hover:cursor-pointer hover:bg-[#F4F6FF] hover:font-bold hover:shadow-[0_0_0_0.5px_#4F46E5] hover:outline-indigo-600 hover:outline-offset-0 transition-all duration-200'>
            🔍 Tabula 사용법 알아보기
          </button>
        </div>
        
        {isLogin ? (
          <div className='text-[#292929] mr-5'>{username}님</div>
        ) : (
            <Link href='login'>
              <button className='cursor-pointer bg-[#E7EAFF] px-5 py-2 rounded-full text-sm text-[#292929] hover:bg-[#d6d9f7] hover:font-bold transition-all duration-300 hover:scale-105'>로그인</button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Header