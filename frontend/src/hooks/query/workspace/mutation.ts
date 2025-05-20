import {
  createWorkspace,
  deleteWorkspace,
  updateWorkspaceName,
} from '@/api/workspace';
import { useToastStore } from '@/stores/toastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateWorkspaceProps {
  spaceId: string;
  spaceName: string;
}
export const useCreateWorkspace = (folderId: string) => {
  const addToast = useToastStore.getState().addToast;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => createWorkspace(folderId),
    onError: (error) => {
      addToast('워크스페이스 생성에 실패했습니다.', 3, 'error');
      console.error('Error creating workspace:', error);
    },
    onSuccess: () => {
      addToast('워크스페이스가 생성되었습니다.', 3, 'default');
      queryClient.invalidateQueries({ queryKey: ['workspaceList'] });
    },
  });
};

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
