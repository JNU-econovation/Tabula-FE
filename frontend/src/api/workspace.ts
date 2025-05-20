import { AxiosInstance } from '@/api';

interface WorkspaceList {
  spaceId: string;
  spaceName: string;
}
interface WorkspaceListResponse {
  response: WorkspaceList[];
}

export const getWorkspaceList = async (
  folderId: string,
): Promise<WorkspaceListResponse> => {
  const data = await AxiosInstance.get(`/v1/spaces/${folderId}`);

  return data.data;
};

// TODO: 추후 에러 코드 별 처리 필요
export const createWorkspace = async (folderId: string) => {
  const data = await AxiosInstance.post(`/v1/spaces/${folderId}`);

  return data.data;
};

export const deleteWorkspace = async (spaceId: string) => {
  const data = await AxiosInstance.delete(`/v1/spaces/${spaceId}`);

  return data.data;
};

export const updateWorkspaceName = async (
  spaceId: string,
  newSpaceName: string,
) => {
  const data = await AxiosInstance.put(`/v1/spaces/${spaceId}`, {
    newSpaceName,
  });

  return data.data;
};
