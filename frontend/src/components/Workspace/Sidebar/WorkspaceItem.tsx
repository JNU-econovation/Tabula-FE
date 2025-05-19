'use client';

import { useHandleOutside } from '@/hooks/common/useHandleOutside';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface WorkspaceItemProps {
  spaceId: string;
  spaceName: string;
}

const WorkspaceItem = ({ spaceId, spaceName }: WorkspaceItemProps) => {
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { menuRef, buttonRef } = useHandleOutside(isSpaceOpen, () => {
    setIsSpaceOpen(false);
  });

  const toggleSpaceOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsSpaceOpen(!isSpaceOpen);
  };

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // TODO: 실제 API 연동 필요
      console.log(`Deleting workspace ${spaceId}`);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSpaceOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between h-8 rounded-md hover:bg-gray-200">
      <Link
        href={`${spaceId}`}
        className="flex-1 flex items-center px-4 py-2"
        onClick={(e) => {
          if (isEditing) {
            e.preventDefault();
          }
        }}
      >
        {isEditing ? (
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
            placeholder="폴더 이름을 입력하세요"
            defaultValue={spaceName}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // TODO: api 요청 추가
                setIsEditing(false);
              }
              e.stopPropagation();
            }}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <div className="text-sm text-gray-700 truncate w-full">
            {spaceName}
          </div>
        )}
      </Link>

      <div className="flex items-center pr-2">
        <button
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-2xl p-2"
          onClick={toggleSpaceOpen}
          ref={buttonRef}
        >
          <HiOutlineDotsHorizontal />
        </button>
      </div>

      {isSpaceOpen && (
        <div
          ref={menuRef}
          className="absolute right-1 top-full mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200"
        >
          <div
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={handleEdit}
          >
            수정
          </div>
          <div
            className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            onClick={handleDelete}
          >
            삭제
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceItem;
