import {
  getFolderName,
  getKeywordList,
  getLearningResultList,
  getResultList,
} from '@/api/workspace';
import { getWorkspaceList } from '@/api/workspace';
import { useLearningStore } from '@/stores/useLearningStore';
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
  const { setLearningResult } = useLearningStore(spaceId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['learningResultList', spaceId],
    queryFn: () => getLearningResultList(spaceId),
  });

  const fileUrl = data?.response?.fileUrl || '';
  const fileName = data?.response?.fileName || '';
  const resultList = data?.response?.results || [];

  useEffect(() => {
    if (resultList.length > 0) {
      setLearningResult(resultList);
    }
  }, [resultList, setLearningResult, spaceId]);

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
