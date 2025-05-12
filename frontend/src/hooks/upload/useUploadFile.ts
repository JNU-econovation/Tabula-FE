'use client';

import { useState } from 'react';

const useUploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (file.type === 'application/pdf') {
      setSelectedFile(file);
      if (selectedFile) {
        setSelectedFile(file);
      }
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  const deleteFile = () => {
    setSelectedFile(null);
  };

  return { processFile, selectedFile, handleFile, deleteFile };
};
export default useUploadFile;
