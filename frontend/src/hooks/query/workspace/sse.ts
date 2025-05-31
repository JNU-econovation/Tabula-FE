import { ResultImage, ResultItem } from '@/api/workspace';
import { useSSE } from '@/hooks/common/useSSE';
import { useLearningStore } from '@/stores/useLearningStore';
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

export const useLoadingSSE = (url: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [percent, setPercent] = useState(0);

  useSSE<ResponseType, ProgressData>({
    url,
    onSuccess: (response) => {
      const spaceId = response.spaceId;
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
      router.push(`./${spaceId}`);
    },
    onError: (error) => {
      console.error('SSE Error:', error);
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

export const useResultLoadingSSE = (url: string) => {
  const { completeLoadingResult } = useLearningStore();
  const [percent, setPercent] = useState(0);

  useSSE<ResultResponseType, ProgressData>({
    url,
    onSuccess: (response) => {
      console.log('SSE Success:', response);
      completeLoadingResult({
        resultId: response.resultId,
        resultFileName: response.resultFileName,
        resultImages: response.results || [],
      });
    },
    onError: (error) => {
      console.error('SSE Error:', error);
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
