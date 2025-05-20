'use client';

import { useParams } from 'next/navigation';

const page = () => {
  const { spaceId } = useParams();

  return <div className="flex h-full">업로드</div>;
};

export default page;
