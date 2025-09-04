import { deleteFolder } from '@/api/folder';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteFolder = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folder'],
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.();
    },
  });
};
