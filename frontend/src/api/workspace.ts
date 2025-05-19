import { AxiosInstance } from '@/api';

export const getWorkspaceList = async (id: string) => {
  const response = await AxiosInstance.get(`/v1/spaces/${id}`);
  return response.data;
};
