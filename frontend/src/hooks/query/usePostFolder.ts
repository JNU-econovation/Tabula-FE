import { postFolder } from "@/api/folder";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { FolderProps } from "./useGetFolderList";

export interface PostFolderProps {
  folderName: string;
  folderColor: number;
}

export const usePostFolder = () => {
  const queryClient = useQueryClient();

  return useMutation<FolderProps, Error, PostFolderProps>({
    mutationFn: (newFolder: PostFolderProps) => postFolder(newFolder.folderName, newFolder.folderColor),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folder']
      });
    },
  })
}