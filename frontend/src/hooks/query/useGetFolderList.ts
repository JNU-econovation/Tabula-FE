import { getFolderList } from '@/api/folder';
import { useQuery } from '@tanstack/react-query';

export interface FolderProps {
  folderId: string;
  folderName: string;
  colorIndex: number;
}

export interface FolderResponse {
  success: boolean;
  response: FolderProps[];
  error: any;
}

export const useGetFolderList = () => {
  return useQuery<FolderResponse>({
    queryKey: ['folder'],
    queryFn: getFolderList,
  });
};
