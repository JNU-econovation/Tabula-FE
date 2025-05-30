'use client';

import Sidebar from '@/components/Workspace/Sidebar';
import { useGetWorkspaceList } from '@/hooks/query/workspace/query';
import { useParams } from 'next/navigation';
import { createContext, useState } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: false,
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const { folderId } = useParams();
  const { workspaceList, isLoading } = useGetWorkspaceList(folderId as string);
  const folderName = '폴더 이름'; // TODO: 폴더 이름 api 추가 시 연동
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-1 h-full">
      {!isLoading && (
        <div className="grid-rows-2 gap-4 w-full">
          <SidebarContext.Provider value={{ isSidebarOpen: isOpen }}>
            <Sidebar
              isOpen={isOpen}
              handleToggle={handleToggle}
              workspaceList={workspaceList}
              folderName={folderName}
            />
            {children}
          </SidebarContext.Provider>
        </div>
      )}
    </div>
  );
};

export default layout;
