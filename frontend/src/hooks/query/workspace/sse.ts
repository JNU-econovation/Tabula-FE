import { ResultImage, ResultItem } from '@/api/workspace';
import { useSSE } from '@/hooks/common/useSSE';
import { useToastStore } from '@/stores/toastStore';
import { useLearningStore } from '@/stores/useLearningStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

interface ResponseType {
  spaceId: string;
}
interface ProgressData {
  progress: number;
  message?: string;
}

interface useLoadingSSEProps {
  url: string;
  onErrorCallback?: () => void;
}

export const useLoadingSSE = ({ url, onErrorCallback }: useLoadingSSEProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const addToast = useToastStore((state) => state.addToast);

  useSSE<ResponseType, ProgressData>({
    url,
    onSuccess: (response) => {
      const spaceId = response.spaceId;
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
      router.push(`./${spaceId}`);
      localStorage.removeItem('taskId');
    },
    onError: (error) => {
      console.error(
        error.message ? error.message : 'An error occurred during SSE',
      );
      addToast('AI 학습에 실패했습니다. 다시 시도해주세요');
      onErrorCallback && onErrorCallback();

    },

    onProgress: (response) => {
      let progress = 0;
      if (typeof response === 'number') {
        progress = response;
      } else if (typeof response.progress === 'number') {
        progress = response.progress;
      }

      if (progress > 0) {
        setPercent(progress);
      }

      setPercent(progress);
    },
  });
  return {
    percent,
  };
};

interface ResultResponseType {
  resultId: string;
  resultFileName: string;
  fileUrl: string;
  results: ResultImage[];
}

export const useResultLoadingSSE = (url: string, spaceId: string) => {
  const { completeLoadingResult, clearLoading } = useLearningStore(spaceId);
  const [percent, setPercent] = useState(0);
  const addToast = useToastStore((state) => state.addToast);

  useSSE<ResultResponseType, ProgressData>({
    url,
    onSuccess: (response) => {
      completeLoadingResult({
        resultId: response.resultId,
        resultFileName: '',
        resultImages: response.results || [],
      });
      // removeTask(spaceId);
    },
    onError: (error) => {
      console.error('SSE Error:', error);
      addToast('AI 채점에 실패했습니다. 다시 시도해주세요');
      clearLoading();
    },
    onProgress: (response) => {
      let progress = 0;
      if (typeof response === 'number') {
        progress = response;
      } else if (typeof response.progress === 'number') {
        progress = response.progress;
      }

      if (progress > 0) {
        setPercent(progress);
      }

      setPercent(progress);
    },
  });
  return {
    percent,
  };
};
