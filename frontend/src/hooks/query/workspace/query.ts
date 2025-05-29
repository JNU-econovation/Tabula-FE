import { getKeywordList, getLearningResultList } from '@/api/workspace';
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ['learningResultList'],
    queryFn: () => getLearningResultList(spaceId),
  });

  const fileUrl = data?.response?.fileUrl || '';
  const fileName = data?.response?.fileName || '';
  const resultList = data?.response?.results || [];

  const setLearningResult = useLearningStore(
    (state) => state.setLearningResult,
  );

  useEffect(() => {
    if (resultList.length > 0) {
      setLearningResult(resultList);
    }
  }, [resultList, setLearningResult]);

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
