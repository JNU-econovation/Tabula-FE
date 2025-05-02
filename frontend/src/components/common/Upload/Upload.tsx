'use client';

import { useRef } from 'react';
import uploadIcon from '../../../../assets/uploadIcon.png';
import { cva } from 'class-variance-authority';
import { SizeType } from '@/type';
import useDragFile from '@/hooks/upload/useDragFile';

interface UploadProps {
  height?: SizeType;
  width?: SizeType | 'full';
  processFile: (file: File) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Upload = ({ height, width, processFile, handleFile }: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragFile(processFile);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadVariants = cva(
    'border-3 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors duration-200',
    {
      variants: {
        height: {
          sm: ['h-32', 'gap-1', 'text-sm', 'p-2', '[&>svg]:hidden'],
          md: ['h-64', 'gap-3', 'text-base', 'p-4'],
          lg: ['h-96', 'gap-6', 'text-lg', 'p-6'],
        },

        width: {
          sm: ['w-sm'],
          md: ['w-md'],
          lg: ['w-lg'],
          full: ['w-full'],
        },

        isDragging: {
          true: 'border-primary-400 bg-primary-50',
          false: 'border-gray-200 bg-white',
        },
      },
      defaultVariants: {
        height: 'md',
        width: 'md',
        isDragging: false,
      },
    },
  );

  return (
    <div
      className={uploadVariants({ height, width, isDragging })}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <>
        <img className="w-7 h-7" src={uploadIcon.src} alt="Upload Icon" />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf"
          onChange={handleFile}
        />
        <div className="flex flex-col gap-1 items-center">
          <p className="text-base">Choose a file or drag & drop it here</p>
          <p className="text-sm text-gray-400">pdf 파일을 업로드 해 주세요</p>
        </div>
        <button
          className="cursor-pointer px-5 py-2 bg-white text-black border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors duration-200"
          onClick={openFileDialog}
        >
          Browse File
        </button>
      </>
    </div>
  );
};

export default Upload;
