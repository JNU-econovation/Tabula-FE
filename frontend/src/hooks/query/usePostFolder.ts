import { postFolder } from '@/api/folder';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { FolderProps } from './useGetFolderList';

export interface PostFolderProps {
  folderName: string;
  colorIndex: number;
}

export const usePostFolder = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<FolderProps, Error, PostFolderProps>({
    mutationFn: (newFolder: PostFolderProps) =>
      postFolder(newFolder.folderName, newFolder.colorIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folder'],
      });
      options?.onSuccess?.();
    },
    onError: () => {
      options?.onError?.();
    },
  });
};
