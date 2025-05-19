'use client';

import AddWorkspace from '@/components/Workspace/Sidebar/AddWorkspace';
import FolderName from '@/components/Workspace/Sidebar/FolderName';
import Layout from '@/components/Workspace/Sidebar/Layout';
import WorkspaceItem from '@/components/Workspace/Sidebar/WorkspaceItem';
import { useState } from 'react';

interface WorkspaceType {
  spaceId: string;
  spaceName: string;
}
// TODO: 타입 분리

interface SidebarProps {
  workList: WorkspaceType[];
}

const Sidebar = ({ workList }: SidebarProps) => {
  // 여기서 열림/ 닫힘 상태관리
  //TODO: 추후에는 최상단에서 관리해야함
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Layout isOpen={isOpen} onToggle={handleToggle}>
      <FolderName folderName="폴더이름" />
      <AddWorkspace isOpen={isOpen} />
      {isOpen && (
        <div className="flex flex-col gap-2 flex-1">
          <div className="text-sm px-2 mt-6 text-gray-500 flex-none">
            학습공간
          </div>
          <div className="flex flex-col-reverse gap-2 overflow-auto h-[calc(100vh-18rem)] pb-3">
            {workList.map((item) => (
              <WorkspaceItem
                key={item.spaceId}
                spaceId={item.spaceId}
                spaceName={item.spaceName}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Sidebar;
