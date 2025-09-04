'use client';

import Analytics from '@/components/Analytics';
import Sidebar from '@/components/Workspace/Sidebar';
import {
  useGetFolderName,
  useGetWorkspaceList,
} from '@/hooks/query/workspace/query';
import { useParams } from 'next/navigation';
import { createContext, useState } from 'react';

export const SidebarContext = createContext({
  isSidebarOpen: false,
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const { folderId, spaceId } = useParams();
  const { workspaceList, isLoading } = useGetWorkspaceList(folderId as string);
  const { folderName } = useGetFolderName(folderId as string);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-1 h-full">
      <Analytics />
      {!isLoading && (
        <div className="grid-rows-2 gap-4 w-full">
          <SidebarContext.Provider value={{ isSidebarOpen: isOpen }}>
            <Sidebar
              isOpen={isOpen}
              handleToggle={handleToggle}
              workspaceList={workspaceList}
              folderName={folderName}
              spaceId={spaceId as string}
            />
            {children}
          </SidebarContext.Provider>
        </div>
      )}
    </div>
  );
};

export default layout;
