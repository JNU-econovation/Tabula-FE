import { Button } from '@/components/common/Button/Button';
import LoadingSpinner from '@/components/Workspace/StudyLog/LoadingSpinner';
import { FaSearchPlus } from 'react-icons/fa';

interface FeedbackProps {
  status?: 'LOADING' | 'COMPLETED';
  id: string;
  children: React.ReactNode;
}
const Feedback = ({ status, id, children }: FeedbackProps) => {
  return (
    <div>
      {status === 'LOADING' ? (
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner taskId={id} />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p>채점이 완료되었어요.</p>
          <p>자세히보기를 통해 채점결과에 대한 피드백을 확인할 수 있어요.</p>
          <div className="flex gap-5">{children}</div>
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
        </div>
      )}
    </div>
  );
};

export default Feedback;
