import { AxiosInstance, AxiosInstanceFormData, END_POINT } from '@/api';

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
  const data = await AxiosInstance.get(`${END_POINT.workspaceList}${folderId}`);

  return data.data;
};

export const deleteWorkspace = async (spaceId: string) => {
  const data = await AxiosInstance.delete(
    `${END_POINT.workspaceList}${spaceId}`,
  );

  return data.data;
};

export const updateWorkspaceName = async (
  spaceId: string,
  newSpaceName: string,
) => {
  const data = await AxiosInstance.put(`${END_POINT.workspaceList}${spaceId}`, {
    newSpaceName,
  });

  return data.data;
};

export interface UploadLearningFileResponse {
  formdata: FormData;
  folderId: string;
}
export const uploadLearningFile = async (
  folderId: string,
  formData: FormData,
) => {
  const response = await AxiosInstanceFormData.post(
    `${END_POINT.workspaceList}${folderId}`,
    formData,
  );

  return response.data;
};
