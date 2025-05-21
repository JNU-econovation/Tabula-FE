import { useUploadLearningFile } from '@/hooks/query/workspace/mutation';
import { useState } from 'react';

const useLearningFile = (
  folderId: string,
  file: File | null,
  onSuccess: () => void,
) => {
  const { mutate } = useUploadLearningFile(onSuccess);
  const [subjectName, setSubjectName] = useState('');
  const [language, setLanguage] = useState<'english' | 'korean' | 'japanese'>(
    'korean',
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'english' | 'korean' | 'japanese');
  };
  const handleSubjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectName(e.target.value);
  };
  const resetSubjectName = () => {
    setSubjectName('');
  };

  const uploadLearningFile = async (ref: HTMLInputElement) => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }
    if (!subjectName) {
      alert('과목명을 입력해주세요.');
      ref.focus();
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('langType', language);
    formData.append('fileDomain', subjectName);

    return mutate({ folderId, formData });
  };

  return {
    subjectName,
    language,
    uploadLearningFile,
    handleLanguageChange,
    handleSubjectNameChange,
    resetSubjectName,
  };
};

export default useLearningFile;
