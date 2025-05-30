import React, { useContext } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div
      className={`flex flex-col h-screen items-center p-6 relative pt-28 ${isSidebarOpen && 'ml-40'}`}
    >
      <div className="flex h-6/7 w-full max-w-4xl border border-gray-200 rounded-lg shadow-md overflow-hidden ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
