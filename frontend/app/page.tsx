'use client';

import { Button } from '@/components/common/Button/Button';
import GoogleLoginButton from '@/components/Home/GoogleLoginButton';
import PopupModal from '@/components/Home/PopupModal';
import WaveBackground from '@/components/Home/WaveBackground';
import { useAuthRedirect } from '@/hooks/Login/useAuthRedirect';
import { useGoogleLogin } from '@/hooks/Login/useGoogleLogin';
import { useGuestLogin } from '@/hooks/query/login/useGuestLogin';
// import { useGoogleMessageListener } from '@/hooks/Login/useGoogleMessageListener';

const Page = () => {
  const { handleLogin } = useGoogleLogin();
  const { mutate: handleGuestLogin } = useGuestLogin();

  const shouldRender = useAuthRedirect();
  // useGoogleMessageListener();

  if (!shouldRender) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh)] px-4 text-center relative break-keep space-y-0 sm:space-y-2">
      <div className="font-semibold text-gray-900 z-10 transform tracking-wider space-y-4">
        <div className="font-semibold text-gray-700 text-3xl sm:text-3xl xl:text-4xl">
          <span className='block sm:inline'>AI 학습 서비스</span>
          <span className='block sm:inline mt-2 sm:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent sm:ml-4'>타뷸라(TABULA)</span>
        </div>
        <div className="font-semibold text-xl sm:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-4 mb-2 sm:mb-3 lg:mb-4">
          백지학습을 더 쉽고 효과적으로!
        </div>
      </div>
      <div
        className="mt-4 text-gray-500 z-10 transform text-sm sm:text-base lg:text-md
                  max-w-xs sm:max-w-md lg:max-w-2xl tracking-wide"
      >
        AI 채점과 피드백으로 부족한 부분을 보완해 자기주도 학습의 완성을 돕습니다.{" "}
        <br className="hidden lg:block" />
        스스로 배우고 성장하는 즐거움을 경험해 보세요.
      </div>
      <div className='mt-4 z-50'>
        <GoogleLoginButton onClick={handleLogin} className='hover:cursor-pointer shadow-lg ring-1 ring-gray-300' />
        <button className='text-gray-400 text-sm hover:cursor-pointer hover:underline underline-offset-2' onClick={()=>handleGuestLogin()}>
          게스트로 로그인하기
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full z-0">
        <WaveBackground />
      </div>
      <PopupModal />
    </div>
  );
};

export default Page;
