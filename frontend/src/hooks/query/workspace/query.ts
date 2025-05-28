import { getLearningResultList } from '@/api/workspace';
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

  // ✅ 데이터가 변경될 때마다 zustand 상태를 동기화
  useEffect(() => {
    if (resultList.length > 0) {
      setLearningResult(resultList);
    }
  }, [resultList, setLearningResult]);

  return { fileUrl, fileName, isLoading, isError, resultList };
};
