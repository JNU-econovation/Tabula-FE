'use client';

import Sidebar from '@/components/Workspace/Sidebar';
import useGetWorkspaceList from '@/hooks/query/workspace/query';
import { useParams } from 'next/navigation';

const layout = () => {
  const { folderId } = useParams();
  const { workspaceList, isLoading } = useGetWorkspaceList(folderId as string);
  const folderName = '폴더 이름'; // TODO: 폴더 이름 api 추가 시 연동

  return (
    <div className="flex h-full">
      {!isLoading && (
        <Sidebar
          workspaceList={workspaceList}
          folderName={folderName}
        ></Sidebar>
      )}
    </div>
  );
};

export default layout;
