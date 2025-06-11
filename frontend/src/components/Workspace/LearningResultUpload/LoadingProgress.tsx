'use client';

import Loading from '@/components/common/Loading/Loading';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';
import { useLoadingSSE } from '@/hooks/query/workspace/sse';
import { BASE_URL_AI, END_POINT } from '@/api';
import { usePreventRefresh } from '@/hooks/common/usePreventRefresh';

interface LoadingProgressProps {
  taskId: string | null;
}
const LoadingProgress = ({ taskId }: LoadingProgressProps) => {
  if (!taskId) {
    return null;
  }
  usePreventRefresh();
  const { folderId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);
  const { percent } = useLoadingSSE(
    `${BASE_URL_AI}${END_POINT.aiWorkspaceList}${folderId}/progress/${taskId}`,
  );

  return (
    <div
      className={`${isSidebarOpen && 'relative left-32'} w-full relative top-40 flex flex-col items-center justify-center p-3 gap-1`}
    >
      <Loading
        type="progress"
        percent={percent}
        text="학습자료를 읽는 중 입니다. 조금만 기다려주세요..."
      />
    </div>
  );
};

export default LoadingProgress;
