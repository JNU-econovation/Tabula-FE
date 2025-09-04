import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface SubjectNameInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSubjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subjectName: string;
  resetSubjectName: () => void;
}

const SubjectNameInput = ({
  inputRef,
  handleSubjectNameChange,
  subjectName,
  resetSubjectName,
}: SubjectNameInputProps) => {
  return (
    <span className="flex items-center w-full gap-4">
      <p>학습 자료 과목명</p>
      <div
        className="px-4 py-2 bg-gray-50 text-sm rounded-md w-[240px] md:w-[340px]
                     border border-gray-300 
                     outline-none 
                     focus-within:border-primary-400 focus-within:bg-primary-50 
                     flex items-center gap-2"
      >
        <input
          ref={inputRef}
          className="border-none outline-none w-full bg-transparent"
          id="learning-name"
          placeholder="학습 자료명을 입력해주세요."
          onChange={handleSubjectNameChange}
          value={subjectName}
        />
        {subjectName && (
          <button
            onClick={resetSubjectName}
            className="ml-4 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <IoMdClose size={15} />
          </button>
        )}
      </div>
    </span>
  );
};

export default SubjectNameInput;
