import React, { useContext, useEffect } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        router.back();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [router]);

  return (
    <div
      className={`flex flex-col h-screen items-center relative pt-23 ${isSidebarOpen && 'sm:ml-20 lg:ml-40'}`}
    >
      {children}
    </div>
  );
};

export default Layout;
