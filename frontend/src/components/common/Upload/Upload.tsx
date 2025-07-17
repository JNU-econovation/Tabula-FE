'use client';

import { useRef } from 'react';
import uploadIcon from '../../../../assets/uploadIcon.png';
import { cva } from 'class-variance-authority';
import { SizeType } from '@/type';
import useDragFile from '@/hooks/common/useDragFile';

interface UploadProps {
  height?: SizeType | 'xs';
  width?: SizeType | 'full';
  processFile: (file: File) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: 'pdf-type' | 'multi-type';
  selectedFile?: File | null;
  imageFiles?: File[];
}

const Upload = ({
  height,
  width,
  processFile,
  handleFile,
  mode = 'pdf-type',
  selectedFile,
  imageFiles = [],
}: UploadProps) => {
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
          xs: ['h-28', 'gap-1', 'text-sm', '[&>svg]:hidden'],
          sm: ['h-32', 'gap-1', 'text-sm', 'p-2', '[&>svg]:hidden'],
          md: ['h-64', 'gap-3', 'text-base', 'p-4'],
          lg: ['h-96', 'gap-6', 'text-lg', 'p-6'],
        },

        width: {
          sm: ['w-sm'],
          md: ['w-xs sm:w-sm md:w-md'],
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
        {height !== 'sm' && height !== 'xs' && (
          <img className="w-7 h-7" src={uploadIcon.src} alt="Upload Icon" />
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={
            mode === 'pdf-type'
              ? '.pdf'
              : selectedFile
                ? '.pdf'
                : imageFiles?.length > 0
                  ? '.png,.jpg,.jpeg'
                  : '.pdf,.png,.jpg,.jpeg'
          }
          multiple={mode === 'multi-type'}
          onChange={handleFile}
        />
        <div className="flex flex-col gap-1 items-center">
          {height !== 'xs' && (
            <p className="text-base description">
              Choose a file or drag & drop it here
            </p>
          )}
          <p className="text-xs sm:text-sm text-gray-400 mb-2 whitespace-">
            {height === 'xs' ? (
              <>
                pdf 또는 png / jpg 파일을 업로드 해 주세요
                <br className="block lg:hidden" />
                (png / jpg는 여러 장 업로드 가능)
              </>
            ) : (
              'pdf 파일을 업로드 해 주세요'
            )}
          </p>
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
