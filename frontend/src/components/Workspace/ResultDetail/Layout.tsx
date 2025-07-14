import React, { useContext } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div
      className={`flex flex-col h-screen items-center p-6 relative pt-28 ${isSidebarOpen && 'sm:ml-20 lg:ml-40'}`}
    >
      {children}
    </div>
  );
};

export default Layout;
