'use client';

import { useEffect, useState } from 'react';
export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);
  console.log(process.env.NODE_ENV);
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const init = async () => {
        try {
          const { initMocks } = await import('@/mocks/index');
          await initMocks();
          setMswReady(true);
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
          setMswReady(true);
        }
      };

      init();
    } else {
      setMswReady(true);
    }
  }, []);

  return <>{children}</>;
};
