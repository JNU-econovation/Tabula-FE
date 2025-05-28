import { BASE_URL, END_POINT } from '@/api';
import Loading from '@/components/common/Loading/Loading';
import { useResultLoadingSSE } from '@/hooks/query/workspace/sse';
import { useParams } from 'next/navigation';

interface LoadingSpinnerProps {
  taskId: string | null;
}
const LoadingSpinner = ({ taskId }: LoadingSpinnerProps) => {
  const { folderId } = useParams();

  const { percent } = useResultLoadingSSE(
    `${BASE_URL}${END_POINT.workspaceList}${folderId}/progress/${taskId}`,
  );
  return (
    <div>
      <Loading type="spinner" text="로딩중 입니다." percent={percent} />
    </div>
  );
};

export default LoadingSpinner;
