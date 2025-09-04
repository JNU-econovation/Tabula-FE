import {
  deleteWorkspace,
  updateWorkspaceName,
  uploadLearningFile,
  uploadResultFile,
} from '@/api/workspace';
import { useToastStore } from '@/stores/toastStore';
import { useLearningStore } from '@/stores/useLearningStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateWorkspace {
  spaceId: string;
  spaceName: string;
}

export const useUpdateWorkspaceName = () => {
  const addToast = useToastStore.getState().addToast;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, spaceName }: UpdateWorkspace) =>
      updateWorkspaceName(spaceId, spaceName),
    onError: (error) => {
      addToast('워크스페이스 이름 변경에 실패했습니다.', 3, 'error');
      console.error('Error updating workspace name:', error);
    },
    onSuccess: () => {
      addToast('워크스페이스 이름이 변경되었습니다.', 3, 'default');
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
    },
  });
};

export const useDeleteWorkspace = () => {
  const addToast = useToastStore.getState().addToast;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spaceId: string) => deleteWorkspace(spaceId),
    onError: (error) => {
      addToast('워크스페이스 삭제에 실패했습니다.', 3, 'error');
      console.error('Error deleting workspace:', error);
    },
    onSuccess: () => {
      addToast('워크스페이스가 삭제되었습니다.', 3, 'default');
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
    },
  });
};

export interface UploadLearningFileRequest {
  formData: FormData;
  folderId: string;
}

export interface UploadLearningFileResponse {
  spaceId: string;
}

export const useUploadLearningFile = (
  onSuccess: (data: UploadLearningFileResponse) => void,
) => {
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: ({ folderId, formData }: UploadLearningFileRequest) =>
      uploadLearningFile(folderId, formData),
    onError: (error: any) => {
      addToast(
        error.response.data.error.reason || '파일 업로드에 실패했습니다.',
        3,
        'error',
      );
    },
    onSuccess: (data) => {
      onSuccess(data.response);
    },
  });
};

export const useUploadLearningResultFile = (workspaceId: string) => {
  const { addLoadingResult } = useLearningStore(workspaceId);
  const addToast = useToastStore.getState().addToast;

  return useMutation({
    mutationFn: ({
      spaceId,
      formData,
    }: {
      spaceId: string;
      formData: FormData;
    }) => uploadResultFile(spaceId, formData),
    onSuccess: (data) => {
      const response = data.response;
      addLoadingResult(response.resultId, response.fileName);
    },

    onError: (error: any) => {
      // TODO: 추후 에러 핸들링 개선
      addToast(
        error.response.data.error.reason || '파일 업로드에 실패했습니다.',
        3,
        'error',
      );
    },
  });
};
