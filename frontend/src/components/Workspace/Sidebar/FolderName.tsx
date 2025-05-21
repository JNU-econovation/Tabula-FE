'use client';

import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';

interface FolderNameProps {
  folderName: string;
  //   children: React.ReactNode;
}
const FolderName = ({ folderName }: FolderNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  //   const {name, handleName}= useEditFolderName();

  const isEditingToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div
      className={` h-7 flex justify-between items-center px-2 text-sm flex-none`}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1"
            placeholder="폴더 이름을 입력하세요"
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // TODO: api 요청 추가
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        </>
      ) : (
        <>
          <div>{folderName}</div>
        </>
      )}

      <button
        className="cursor-pointer text-gray-700 rounded-full transition ease-in-out duration-100 group-hover:scale-105 group-hover:shadow-sm relative left-1 active:scale-110"
        onClick={isEditingToggle}
      >
        {isEditing ? <TiDelete size={25} /> : <BsPencilSquare size={20} />}
      </button>
    </div>
  );
};

export default FolderName;
