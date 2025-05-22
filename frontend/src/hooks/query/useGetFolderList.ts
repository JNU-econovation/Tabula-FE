import { getFolderList } from '@/api/http/folder';
import { useQuery } from '@tanstack/react-query';

export interface FolderProps {
  folderId: string;
  folderName: string;
  colorIndex: number;
}

export const useGetFolderList = () => {
  return useQuery<FolderProps[]>({
    queryKey: ['folder'],
    queryFn: getFolderList,
  });
};
