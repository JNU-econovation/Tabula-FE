import {
  getFolderName,
  getKeywordList,
  getLearningResultList,
  getResultList,
} from '@/api/workspace';
import { getWorkspaceList } from '@/api/workspace';
import { useLearningStore } from '@/stores/useLearningStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetWorkspaceList = (folderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => getWorkspaceList(folderId),
  });

  const workspaceList = data?.response || [];

  return { workspaceList, isLoading, isError };
};
export const useGetLearningResultList = (spaceId: string) => {
  const { setLearningResult, addLoadingResult } = useLearningStore(spaceId);
  const { hasLoading, getTaskId } = useLoadingStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['learningResultList', spaceId],
    queryFn: () => getLearningResultList(spaceId),
  });

  const fileUrl = data?.response?.fileUrl || '';
  const fileName = data?.response?.fileName || '';
  const resultList = data?.response?.results || [];

  // useEffect(() => {
  //   if (resultList.length > 0) {
  //     setLearningResult(resultList);
  //   }
  // }, [resultList, setLearningResult, spaceId]);

  useEffect(() => {
    if (resultList.length > 0) {
      // 1. 서버에서 가져온 결과 세팅
      setLearningResult(resultList);

      // 2. 로컬스토리지 기반 LOADING 복원
      if (hasLoading(spaceId)) {
        const taskId = getTaskId(spaceId);
        if (taskId) {
          // setLearningResult 이후에 호출되도록 0ms 딜레이
          setTimeout(() => {
            addLoadingResult(taskId, '백지 학습 진행중...');
          }, 0);
        }
      }
    }
  }, [
    resultList,
    setLearningResult,
    addLoadingResult,
    hasLoading,
    getTaskId,
    spaceId,
  ]);

  return { fileUrl, fileName, isLoading, isError, resultList };
};

export const useGetKeywordList = (spaceId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['keyword', spaceId],
    queryFn: () => getKeywordList(spaceId),
  });

  const keywordList = data?.response.keywords;

  return { keywordList, isLoading, isError };
};

export const useGetResultList = (spaceId: string, resultId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['feedbackList', spaceId, resultId],
    queryFn: () => getResultList(spaceId, resultId),
  });
  const resultList = data?.response.results || [];
  const missingAnswer = data?.response.missingAnswer || [];

  return { resultList, missingAnswer, isLoading, isError };
};

export const useGetFolderName = (folderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['folderName', folderId],
    queryFn: () => getFolderName(folderId),
  });

  const folderName = data?.response.folderName || '';

  return { folderName, isLoading, isError };
};
