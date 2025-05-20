'use client';

import AddWorkspace from '@/components/Workspace/Sidebar/AddWorkspace';
import FolderName from '@/components/Workspace/Sidebar/FolderName';
import Layout from '@/components/Workspace/Sidebar/Layout';
import WorkspaceItem from '@/components/Workspace/Sidebar/WorkspaceItem';
import { useEffect, useRef, useState } from 'react';

interface WorkspaceType {
  spaceId: string;
  spaceName: string;
}

interface SidebarProps {
  workspaceList: WorkspaceType[];
  folderName: string;
}

const Sidebar = ({ workspaceList, folderName }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = -1 * scrollRef.current.scrollHeight;
    }
  }, [workspaceList]);

  return (
    <Layout isOpen={isOpen} onToggle={handleToggle}>
      <p
        className={`h-5 flex justify-between items-center px-2 text-sm flex-none`}
      >
        {folderName}
      </p>
      <AddWorkspace />
      {isOpen && (
        <div className="flex flex-col gap-2 flex-1">
          <div className="text-sm px-2 mt-6 text-gray-500 flex-none">
            학습공간
          </div>
          <div
            ref={scrollRef}
            className="flex flex-col-reverse gap-2 overflow-y-auto h-[calc(100vh-18rem)] pb-3"
          >
            {workspaceList.map((item) => (
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
