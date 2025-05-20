import { deleteFolder } from "@/api/folder"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folder']
      })
    },
    onError: (error) => {
      console.error('폴더 삭제 실패: ', error)
    }
  })
}