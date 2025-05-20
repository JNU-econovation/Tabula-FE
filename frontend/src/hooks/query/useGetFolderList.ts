import { getFolderList } from "@/api/folder"
import { useQuery } from "@tanstack/react-query"

export interface FolderProps {
  folderId: string;
  folderName: string;
  folderColor: number;
}

export const useGetFolderList = () => {
  return useQuery<FolderProps[]>({
    queryKey: ['folder'],
    queryFn: getFolderList
  })
}