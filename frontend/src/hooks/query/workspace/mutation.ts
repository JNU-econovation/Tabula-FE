import {
  deleteWorkspace,
  updateWorkspaceName,
  uploadLearningFile,
} from '@/api/workspace';
import { useToastStore } from '@/stores/toastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateWorkspace {
  spaceId: string;
  newSpaceName: string;
}

export const useUpdateWorkspaceName = () => {
  const addToast = useToastStore.getState().addToast;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, newSpaceName }: UpdateWorkspace) =>
      updateWorkspaceName(spaceId, newSpaceName),
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

export interface UploadLearningFileResponse {
  formData: FormData;
  folderId: string;
}
export const useUploadLearningFile = () => {
  const addToast = useToastStore.getState().addToast;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ folderId, formData }: UploadLearningFileResponse) =>
      uploadLearningFile(folderId, formData),
    onError: (error) => {
      addToast('파일 업로드에 실패했습니다.', 3, 'error');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
    },
  });
};
