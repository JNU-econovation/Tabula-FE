import { getLearningResultList } from '@/api/workspace';
import { getWorkspaceList } from '@/api/workspace';
import { useQuery } from '@tanstack/react-query';

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

  const learningResultList = data?.response || [];

  return { learningResultList, isLoading, isError };
};
