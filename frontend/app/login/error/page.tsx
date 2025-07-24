'use client';

import { Button } from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';

const LoginError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] text-center px-4">
      <div>
        <div className="text-4xl font-semibold text-primary-600 mb-8">
          Error
        </div>
      </div>
      <p className="mb-8 text-gray-500">
        인증 중 오류가 발생했어요. 다시 시도해 주세요.
      </p>
      <Button
        colorScheme="gradient"
        size="md"
        onClick={() => router.replace('/')}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default LoginError;
