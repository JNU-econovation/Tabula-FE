import { useEffect } from 'react';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useLearningStore } from '@/stores/useLearningStore';
import { useParams } from 'next/navigation';

const StudyLogLoader = () => {
  const { spaceId } = useParams();
  const { getTaskId, hasLoading } = useLoadingStore();
  const { addLoadingResult, initWorkspace } = useLearningStore(
    spaceId as string,
  );

  useEffect(() => {
    initWorkspace();

    if (hasLoading(spaceId as string)) {
      const taskId = getTaskId(spaceId as string);
      if (taskId) {
        addLoadingResult(taskId, '백지 학습 진행중...');
      }
    }
  }, [spaceId, addLoadingResult, initWorkspace, getTaskId, hasLoading]);

  return null;
};

export default StudyLogLoader;
