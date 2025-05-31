'use client';

import Loading from '@/components/common/Loading/Loading';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';
import { useLoadingSSE } from '@/hooks/query/workspace/sse';
import { BASE_URL, END_POINT } from '@/api';

interface LoadingProgressProps {
  taskId: string | null;
}
const LoadingProgress = ({ taskId }: LoadingProgressProps) => {
  if (!taskId) {
    return null;
  }
  const { folderId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);
  const { percent } = useLoadingSSE(
    `${BASE_URL}${END_POINT.workspaceList}${folderId}/progress/${taskId}`,
  );

  //  서버에서 30 -> 60 -> 90 으로 보내주기떄문에 자연스럽게 늘어나도록 해야함

  return (
    <div
      className={`${isSidebarOpen && 'relative left-32'} w-full relative top-40`}
    >
      <Loading type="progress" percent={percent} text="로딩중 입니다." />
    </div>
  );
};

export default LoadingProgress;
