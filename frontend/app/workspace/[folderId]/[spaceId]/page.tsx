'use client';

import UserPanel from '@/components/Workspace/User/UserPanel';
import { useParams } from 'next/navigation';

const page = () => {
  const { spaceId } = useParams();

  return (
    <div className="relative flex w-full">
      <div className='absolute top-15 right-5 sm:right-10 md:right-15 xl:right-20 space-y-4'>
        <UserPanel
          title="학습 자료"
          fileTitle='파일1.pdf'
         />
      </div>
    </div>
  ) 
  ;
};

export default page;
