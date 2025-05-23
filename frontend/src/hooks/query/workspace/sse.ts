import { useSSE } from '@/hooks/common/useSSE';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
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
    onSuccess: (data) => {
      const spaceId = data.spaceId;
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
      router.push(`./${spaceId}`);
    },
    onError: (error) => {
      console.error('SSE Error:', error);
    },
    onProgress: (parsedData) => {
      let progress = 0;
      if (typeof parsedData === 'number') {
        progress = parsedData;
      } else if (typeof parsedData.progress === 'number') {
        progress = parsedData.progress;
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
