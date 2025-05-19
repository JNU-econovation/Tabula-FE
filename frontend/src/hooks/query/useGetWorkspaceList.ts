import { getWorkspaceList } from '@/api/workspace';
import { useQuery } from '@tanstack/react-query';

const useGetWorkspaceList = (spaceId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => getWorkspaceList(spaceId),
  });

  return { data, isLoading, isError };
};

export default useGetWorkspaceList;
