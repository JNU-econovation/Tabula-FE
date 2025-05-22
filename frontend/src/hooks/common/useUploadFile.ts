'use client';

import { useState } from 'react';

type UploadMode = 'pdf-type' | 'multi-type';

const useUploadFile = (mode: UploadMode = 'pdf-type') => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        processFile(file);
      });
    }
  };

  const processFile = async (file: File | File[]) => {
    if (!file) return;

    const files = Array.isArray(file) ? file : [file];

    for (const f of files) {
      const isPdf = f.type === 'application/pdf';
      const isImage = f.type === 'image/png' || f.type === 'image/jpg' || f.type === 'image/jpeg'

      if (mode === 'pdf-type') {
        if (isPdf) {
          setSelectedFile(f);
        } else {
          alert('PDF 파일만 업로드 가능합니다.');
        }
        continue;
      }

      if (isPdf) {
        if (imageFiles.length > 0) {
          alert('이미지를 업로드한 상태에서는 PDF를 추가할 수 없습니다.');
          continue;
        }
        if (selectedFile) {
          alert('PDF는 한 개만 업로드할 수 있습니다.');
          continue;
        }
        setSelectedFile(f);
        continue;
      }

      if (isImage) {
        if (selectedFile) {
          alert('PDF를 업로드한 상태에서는 이미지를 추가할 수 없습니다.');
          continue;
        }
        setImageFiles((prev) => [...prev, f]);
        continue;
      }

      alert('지원되지 않는 파일 형식입니다.');
    }
  };

  const deleteFile = () => {
    setSelectedFile(null);
  };

  const deleteImageFile = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    selectedFile,
    imageFiles,
    handleFile,
    processFile,
    deleteFile,
    deleteImageFile,
  };
};

export default useUploadFile;
