import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FolderProps } from './useGetFolderList';
import { putFolder } from '@/api/folder';

export interface PutFolderProps {
  folderId: string;
  folderName: string;
  colorIndex: number;
}

export const usePutFolder = (options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<FolderProps, Error, PutFolderProps>({
    mutationFn: (newFolder: PutFolderProps) =>
      putFolder(newFolder.folderId, newFolder.folderName, newFolder.colorIndex),
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
