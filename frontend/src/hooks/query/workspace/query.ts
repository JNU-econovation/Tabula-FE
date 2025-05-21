import { getWorkspaceList } from '@/api/workspace';
import { useQuery } from '@tanstack/react-query';

const useGetWorkspaceList = (folderId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => getWorkspaceList(folderId),
  });

  const workspaceList = data?.response || [];

  return { workspaceList, isLoading, isError };
};

export default useGetWorkspaceList;
