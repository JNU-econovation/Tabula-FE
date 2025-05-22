export const useLearningResultUpload = (
  folderId: string,
  spaceId: string,
  file: File | File[] | null,
  onSuccess: () => void
) => {

  const uploadLearningResultFile = async (ref: HTMLInputElement) => {
    
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
        formData.append('file', image)
      }
    }
    
    formData.append('folderId', folderId);
    formData.append('spaceId', spaceId);

    console.log('[UPLOAD]', Object.fromEntries(formData.entries()));

    onSuccess();
  }
  return {
    uploadLearningResultFile
  }
}