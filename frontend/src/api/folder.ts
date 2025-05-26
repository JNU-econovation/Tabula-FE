import { AxiosInstance, END_POINT } from '.';

export const getFolderList = async () => {
  const response = await AxiosInstance.get(END_POINT.folderList);
  return response.data;
};

export const postFolder = async (folderName: string, colorIndex: number) => {
  const response = await AxiosInstance.post(END_POINT.folderList, {
    folderName,
    colorIndex,
  });
  return response.data;
};

export const putFolder = async (
  folderId: string,
  folderName: string,
  colorIndex: number,
) => {
  const response = await AxiosInstance.put(
    `${END_POINT.folderList}/${folderId}`,
    {
      folderName,
      colorIndex,
    },
  );
  return response.data;
};

export const deleteFolder = async (folderId: string) => {
  const response = await AxiosInstance.delete(
    `${END_POINT.folderList}/${folderId}`,
  );
  return response.data;
};
