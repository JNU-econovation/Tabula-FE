'use client';

import { useEffect, useState } from 'react';

const isMockEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

export const MockInitComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      const init = async () => {
        try {
          const { initMocks } = await import('@/mocks/index');
          await initMocks();
          setIsLoaded(true);
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
          setIsLoaded(false);
        }
      };
      init();
    }
  }, []);

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return <>{children}</>;
};
