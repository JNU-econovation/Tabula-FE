'use client';

import { Button } from '@/components/common/Button/Button';
import WaveBackground from '@/components/Home/WaveBackground';
import { useAuthRedirect } from '@/hooks/Login/useAuthRedirect';
import { useGoogleLogin } from '@/hooks/Login/useGoogleLogin';
import { useGuestLogin } from '@/hooks/query/login/useGuestLogin';
import { useGoogleMessageListener } from '@/hooks/Login/useGoogleMessageListener';

const Page = () => {
  const { handleLogin } = useGoogleLogin();
  const { mutate: handleGuestLogin } = useGuestLogin();

  const shouldRender = useAuthRedirect();
  useGoogleMessageListener();

  if (!shouldRender) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh)] px-4 text-center relative">
      <div className="font-semibold text-gray-900 z-10 transform">
        <div className="font-semibold text-xl sm:text-2xl md:text-3xl xl:text-4xl">
          백지에서 시작하는 진정한 학습,
        </div>
        <div className="font-semibold text-xl sm:text-2xl md:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-4 mb-2 sm:mb-3 lg:mb-4">
          TABULA와 함께하세요!
        </div>
      </div>
      <div
        className="mt-4 text-gray-500 z-10 transformtext-sm sm:text-base lg:text-md
                      max-w-xs sm:max-w-md lg:max-w-2xl"
      >
        틀린 부분과 부족한 부분에 대한 맞춤 피드백을 제공하여 쉽게 백지학습을 할
        수 있도록 도와줍니다.
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-16 sm:mt-8 z-10 transform">
        <Button
          colorScheme="gradient"
          size="md"
          width={190}
          className="z-10"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <Button
          variant="line"
          colorScheme="gray"
          size="md"
          width={190}
          className="z-10"
          onClick={() => handleGuestLogin()}
        >
          게스트로 시작하기
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-0">
        <WaveBackground />
      </div>
    </div>
  );
};

export default Page;
