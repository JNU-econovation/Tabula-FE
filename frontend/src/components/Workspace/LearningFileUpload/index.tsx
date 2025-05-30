'use client';

import { Button } from '@/components/common/Button/Button';
import Upload from '@/components/common/Upload/Upload';
import useUploadFile from '@/hooks/common/useUploadFile';
import React, { useContext } from 'react';
import { CiLocationArrow1 } from 'react-icons/ci';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';
import useLearningFile from '@/hooks/workspace/useLearningFile';
import { useParams } from 'next/navigation';
import SelectLanguage from '@/components/Workspace/LearningFileUpload/SelectLanguage';
import SubjectNameInput from '@/components/Workspace/LearningFileUpload/SubjectNameInput';
import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';
import { UploadLearningFileResponse } from '@/hooks/query/workspace/mutation';
import { formatFileSize } from '@/util/formatFileSize';

interface LearningFileUploadProps {
  onSubmit: (data: UploadLearningFileResponse) => void;
}
const LearningFileUpload = ({ onSubmit }: LearningFileUploadProps) => {
  const { folderId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { processFile, selectedFile, handleFile, deleteFile } = useUploadFile();
  const {
    subjectName,
    language,
    uploadLearningFile,
    handleLanguageChange,
    handleSubjectNameChange,
    resetSubjectName,
  } = useLearningFile(
    folderId as string,
    selectedFile as File | null,
    onSubmit,
  );

  return (
    <div
      className={`${isSidebarOpen && 'relative left-32'} flex flex-col items-center justify-center h-full p-3 gap-7`}
    >
      <div className="flex flex-col items-center w-full gap-3 mt-25">
        <h1 className="text-2xl font-bold">학습 자료 업로드 하기</h1>
        <p className="text-sm text-gray-400">
          학습을 원하는 자료를 pdf 형태로 업로드 해주세요. 해당 자료를 기반으로
          채점이 됩니다.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <SelectLanguage
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
        <SubjectNameInput
          inputRef={inputRef}
          handleSubjectNameChange={handleSubjectNameChange}
          subjectName={subjectName}
          resetSubjectName={resetSubjectName}
        />
      </div>
      {selectedFile ? (
        <>
          <SelectedFileItem
            fileName={selectedFile.name}
            content={`PDF · ${formatFileSize(selectedFile.size)}`}
            deleteFile={deleteFile}
          />
          <Button
            size="md"
            colorScheme="gradient"
            onClick={() => {
              inputRef.current && uploadLearningFile(inputRef.current);
            }}
          >
            <div className="flex items-center gap-2">
              <CiLocationArrow1 size={30} />
              <p>학습 자료 학습하러 가기</p>
            </div>
          </Button>
        </>
      ) : (
        <Upload processFile={processFile} handleFile={handleFile} />
      )}
    </div>
  );
};

export default LearningFileUpload;
