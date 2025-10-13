import { BASE_URL_AI, END_POINT } from '@/api';
import Loading from '@/components/common/Loading/Loading';
import { usePreventRefresh } from '@/hooks/common/usePreventRefresh';
import { useResultLoadingSSE } from '@/hooks/query/workspace/sse';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  taskId: string | null;
  spaceId: string;
}

const messages = [
  '천 리 길도 한 걸음부터. 채점도 한 줄 한 줄 확인 중이에요.',
  '작은 누락이 큰 차이를 만듭니다. 놓친 부분을 곧 알려드릴게요.',
  '느리지만 꼼꼼하게, 놓치지 않고 살펴보는 중이에요.',
  '오늘의 작은 채점이 내일의 큰 성장을 만듭니다.',
  '지식 퍼즐을 맞추는 중… 잠시만요!',
];

const LoadingSpinner = ({ spaceId, taskId }: LoadingSpinnerProps) => {
  const { folderId } = useParams();

  usePreventRefresh();

  const { percent } = useResultLoadingSSE(
    `${BASE_URL_AI}${END_POINT.aiResult}${folderId}/progress/${taskId}`,
    spaceId,
  );

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Loading
        type="spinner"
        text={messages[currentMessageIndex]}
        percent={percent}
      />
    </div>
  );
};

export default LoadingSpinner;
