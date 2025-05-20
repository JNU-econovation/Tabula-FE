'use client';

import { useParams } from 'next/navigation';

const page = () => {
  const { spaceId } = useParams();

  return <div className="flex h-full">디테일공간</div>;
};

export default page;
