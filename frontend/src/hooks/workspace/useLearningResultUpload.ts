import { useUploadLearningResultFile } from '@/hooks/query/workspace/mutation';

export const useLearningResultUpload = (
  folderId: string,
  spaceId: string,
  file: File | File[] | null,
  // TODO: 추후 타입 인자 수정
) => {
  // 업로드 됐을 때 파일 post 및
  // taskId를 받아서 로딩 컴포넌트에 넣어주어야함.
  // 업로드 시 learningResults 에 추가해주기. filename 과 응답값인 response.task_id 가 필요함.

  const { mutate } = useUploadLearningResultFile();

  const uploadLearningResultFile = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();

    if (file instanceof File) {
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB를 초과할 수 없습니다.');
        return;
      }
      formData.append('file', file);
    } else if (Array.isArray(file)) {
      for (const image of file) {
        formData.append('file', image);
      }
    }

    formData.append('folderId', folderId);
    formData.append('spaceId', spaceId);

    console.log('[UPLOAD]', Object.fromEntries(formData.entries()));

    await mutate({ spaceId, formData });
  };
  return {
    uploadLearningResultFile,
  };
};
