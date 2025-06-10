import { Button } from '@/components/common/Button/Button';
import LoadingSpinner from '@/components/Workspace/StudyLog/LoadingSpinner';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaSearchPlus } from 'react-icons/fa';

interface FeedbackProps {
  status?: 'LOADING' | 'COMPLETED';
  id: string;
  children: React.ReactNode;
}
const Feedback = ({ status, id, children }: FeedbackProps) => {
  const { spaceId, folderId } = useParams();
  return (
    <div>
      {status === 'LOADING' ? (
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner taskId={id} spaceId={spaceId as string} />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p>채점이 완료되었어요.</p>
          <p>자세히보기를 통해 채점결과에 대한 피드백을 확인할 수 있어요.</p>
          <div className="flex flex-wrap gap-5">{children}</div>
          <Link href={`/workspace/${folderId}/${spaceId}/${id}`}>
            <Button
              variant="line"
              size="md"
              style={{
                border: '2px solid #2F0DA9',
                color: '#2F0DA9',
                width: '10rem',
                borderRadius: '1rem',
              }}
            >
              <div className="flex items-center gap-2">
                <FaSearchPlus />
                <p>자세히보기</p>
              </div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Feedback;
