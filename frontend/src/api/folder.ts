import { AxiosInstance } from "."

export const getFolderList = async () => {
  const response = await AxiosInstance.get(`/v1/folders`);
  return response.data;
}

export const postFolder = async (folderName: string, folderColor: number) => {
  const response = await AxiosInstance.post('/v1/folders', {
    folderName,
    folderColor
  });
  return response.data;
}

export const putFolder = async (folderId: string, folderName: string, folderColor: number) => {
  const response = await AxiosInstance.put(`/v1/folders/${folderId}`, {
    folderName,
    folderColor
  });
  return response.data;
}

export const deleteFolder = async (folderId: string) => {
  const response = await AxiosInstance.delete(`/v1/folders/${folderId}`);
  return response.data
}