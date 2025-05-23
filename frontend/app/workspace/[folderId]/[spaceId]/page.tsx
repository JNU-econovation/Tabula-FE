'use client';

import LearningResultUpload from '@/components/Workspace/LearningResultUpload/LearningResultUpload';
import UserPanel from '@/components/Workspace/User/UserPanel';
import { useParams } from 'next/navigation';

const page = () => {
  const { spaceId } = useParams();

  return (
    <div className="relative flex w-full min-h-[calc(100vh-4.5rem)]">
      <div className='absolute top-15 right-5 sm:right-10 md:right-15 xl:right-[7.5rem] space-y-4'>
        <UserPanel
          title="학습 자료"
          fileTitle='파일1.pdf'
         />
      </div>
      <div className='absolute flex bottom-5 left-0 w-full justify-center'>
        <LearningResultUpload />
        </div>
    </div>
  ) 
  ;
};

export default page;
