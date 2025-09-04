import { BASE_URL_AI, END_POINT } from '@/api';
import Loading from '@/components/common/Loading/Loading';
import { useResultLoadingSSE } from '@/hooks/query/workspace/sse';
import { useParams } from 'next/navigation';

interface LoadingSpinnerProps {
  taskId: string | null;
  spaceId: string;
}
const LoadingSpinner = ({ spaceId, taskId }: LoadingSpinnerProps) => {
  const { folderId } = useParams();

  const { percent } = useResultLoadingSSE(
    `${BASE_URL_AI}${END_POINT.aiResult}${folderId}/progress/${taskId}`,
    spaceId,
  );
  return (
    <div>
      <Loading
        type="spinner"
        text="ai가 채점을 하고 있습니다. 잠시만 기다려주세요!"
        percent={percent}
      />
    </div>
  );
};

export default LoadingSpinner;
