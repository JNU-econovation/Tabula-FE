'use client';

import LearningResultUpload from '@/components/Workspace/LearningResultUpload/LearningResultUpload';
import UserPanel from '@/components/Workspace/User/UserPanel';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { SidebarContext } from '../layout';
import { useGetLearningResultList } from '@/hooks/query/workspace/query';

const page = () => {
  const { spaceId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);
  const { learningResultList } = useGetLearningResultList(spaceId as string);
  console.log('data', learningResultList);

  return (
    <div className={`relative flex w-full min-h-[calc(100vh-4.5rem)]`}>
      {/* <UserPanel title="학습 자료" fileTitle="파일1.pdf" /> */}
      <div
        className={`${isSidebarOpen && 'left-32'} absolute flex bottom-5 left-0 w-full justify-center`}
      >
        <LearningResultUpload />
      </div>
    </div>
  );
};

export default page;
