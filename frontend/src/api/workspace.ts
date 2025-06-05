import { AxiosAIInstanceFormData, AxiosInstance, END_POINT } from '@/api';
import axios from 'axios';

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
  const data = await AxiosInstance.get(
    `${END_POINT.workspaceList}${folderId}/lists`,
  );

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

export const uploadLearningFile = async (
  folderId: string,
  formData: FormData,
) => {
  const response = await AxiosAIInstanceFormData.post(
    `${END_POINT.aiWorkspaceList}${folderId}/upload`,
    formData,
  );

  if (response.status == 413) {
    throw new Error(
      '파일에 너무 많은 양의 내용이 들어가 있어요. 파일을 분할하여 업로드 해주세요.',
    );
  }

  return response.data;
};

interface Data {
  fileUrl: string;
  fileName: string;
  results: ResultItem[];
}

export interface ResultItem {
  resultId: string;
  resultFileName: string;
  resultImages: ResultImage[];
  resultStatus?: 'LOADING' | 'COMPLETED';
  taskId?: string;
}

export interface ResultImage {
  id: number;
  postImageUrl: string;
}

export interface getLearningResultListResponse {
  success: boolean;
  response: Data;
  error: string | null;
}

export const getLearningResultList = async (
  spaceId: string,
): Promise<getLearningResultListResponse> => {
  const response = await AxiosInstance.get(
    `${END_POINT.workspaceList}${spaceId}`,
  );

  return response.data;
};

export const uploadResultFile = async (spaceId: string, formData: FormData) => {
  const response = await AxiosAIInstanceFormData.post(
    `${END_POINT.aiResult}${spaceId}/result`,
    formData,
  );

  return response.data;
};

export interface KeywordNode {
  name: string;
  children?: KeywordNode[];
}
interface KeywordResponse {
  success: boolean;
  response: {
    keywords: KeywordNode;
    error: string | null;
  };
}

export const getKeywordList = async (
  spaceId: string,
): Promise<KeywordResponse> => {
  const response = await AxiosInstance.get(
    `${END_POINT.workspaceList}${spaceId}/keywords`,
  );
  return response.data;
};

export interface FeedbackItem {
  id: number;
  wrong: string;
  feedback: string;
}

export interface PageResult {
  page: number;
  postImageUrl: string;
  result: FeedbackItem[];
}

interface ResponseData {
  results: PageResult[];
  missingAnswer: string[];
}

interface getResultListResponse {
  success: boolean;
  response: ResponseData;
  error: string | null;
}

export const getResultList = async (
  spaceId: string,
  resultId: string,
): Promise<getResultListResponse> => {
  const response = await AxiosInstance.get(
    `${END_POINT.workspaceList}${spaceId}/${resultId}`,
  );

  return response.data;
};

interface getFolderNameResponse {
  response: {
    folderName: string;
  };
}

export const getFolderName = async (
  folderId: string,
): Promise<getFolderNameResponse> => {
  const response = await AxiosInstance.get(
    `${END_POINT.workspaceList}${folderId}/name`,
  );

  return response.data;
};
