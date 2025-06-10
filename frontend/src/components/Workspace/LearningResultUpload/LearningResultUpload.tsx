import Upload from '@/components/common/Upload/Upload';
import useUploadFile from '@/hooks/common/useUploadFile';
import { useLearningResultUpload } from '@/hooks/workspace/useLearningResultUpload';
import { useParams } from 'next/navigation';
import React from 'react';
import SelectedFileItem from '../LearningFileUpload/SelectedFileItem';
import { Button } from '@/components/common/Button/Button';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import UploadedImagePreview from './UploadImagePreview';
import { useLearningStore } from '@/stores/useLearningStore';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { formatFileSize } from '@/util/formatFileSize';

const LearningResultUpload = () => {
  const { folderId, spaceId } = useParams();
  const {
    selectedFile,
    imageFiles,
    handleFile,
    deleteFile,
    deleteImageFile,
    processFile,
    resetFiles,
  } = useUploadFile('multi-type');

  const { uploadLearningResultFile, isPending } = useLearningResultUpload(
    folderId as string,
    spaceId as string,
    selectedFile || imageFiles,
  );

  const { isLoading } = useLearningStore(spaceId as string);

  const isImageMode = imageFiles.length > 0;
  const isPdfMode = selectedFile && !isImageMode;

  return (
    <div
      className={`w-[60%] relative border rounded-xl border-gray-300 bg-white shadow-lg mx-10 sm:mx-20 md:mx-30 xl:mx-40 ${isPdfMode ? 'px-4' : 'pl-4 pr-4 pb-4 pt-2'}`}
    >
      <div
        className={`flex relative items-center ${isPdfMode ? 'mb-3 ml-2' : 'mb-3 ml-2`'}`}
      >
        {imageFiles.length > 0 && (
          <UploadedImagePreview
            imageFiles={imageFiles}
            deleteImageFile={deleteImageFile}
          />
        )}
        {(selectedFile || imageFiles.length > 0) && (
          <div className={`absolute right-0 ${isPdfMode ? 'top-8' : ''}`}>
            {isLoading ? (
              <Button
                colorScheme="gray"
                size="icon"
                className="hover:cursor-not-allowed"
                icon={<IoMdCloseCircleOutline />}
              />
            ) : (
              <Button
                onClick={() => {
                  if (isPending) return;
                  resetFiles();
                  uploadLearningResultFile();
                }}
                colorScheme="purple"
                size="icon"
                icon={
                  <HiOutlinePaperAirplane className="rotate-45 -translate-y-0.5" />
                }
              />
            )}
          </div>
        )}
      </div>
      <div className="z-20">
        {selectedFile ? (
          <SelectedFileItem
            fileName={selectedFile.name}
            content={`PDF · ${formatFileSize(selectedFile.size)}`}
            deleteFile={deleteFile}
          />
        ) : (
          <Upload
            height="xs"
            width="full"
            handleFile={handleFile}
            processFile={processFile}
            mode="multi-type"
            selectedFile={selectedFile}
            imageFiles={imageFiles}
          />
        )}
      </div>
    </div>
  );
};

export default LearningResultUpload;
