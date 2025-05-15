'use client';

import { useEffect } from 'react';
export const MockInitComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const init = async () => {
        try {
          const { initMocks } = await import('@/mocks/index');
          await initMocks();
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
        }
      };

      init();
    }
  }, []);

  return <>{children}</>;
};
