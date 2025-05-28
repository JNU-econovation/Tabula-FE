import { useContext } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div className="relative w-full overflow-x-hidden">
      <div
        className={`flex flex-col items-center min-h-[calc(100vh-4.5rem)] py-40 ${
          isSidebarOpen && 'relative left-20'
        } gap-10 pb-60 transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
