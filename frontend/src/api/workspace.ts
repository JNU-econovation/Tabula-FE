import { AxiosInstance } from '@/api';

export const getWorkspaceList = async (spaceId: string) => {
  const response = await AxiosInstance.get(`/v1/spaces/${spaceId}`);
  return response.data;
};
