'use client';

import FloatingMenu from '@/components/common/FloatingMenu/FloatingMenu';
import MenuItem from '@/components/common/FloatingMenu/MenuItem';

import DeleteWorkspaceModal from '@/components/Workspace/Sidebar/DeleteWorkspaceModal';

import { useHandleOutside } from '@/hooks/common/useHandleOutside';
import useModal from '@/hooks/common/useModal';

import { useEditSpaceName } from '@/hooks/workspace/useEditSpaceName';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface WorkspaceItemProps {
  spaceId: string;
  spaceName: string;
}

const WorkspaceItem = ({ spaceId, spaceName }: WorkspaceItemProps) => {
  const {
    spaceNameValue,
    updateWorkspaceName,
    isEditingToggle,
    isEditing,
    resetInputValue,
    handleInputChange,
  } = useEditSpaceName(spaceName, spaceId);

  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { menuRef, buttonRef } = useHandleOutside(isMenuOpen, () => {
    setIsMenuOpen(false);
  });

  const menuOpenToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
            className="border border-gray-300 rounded-md px-2 py-1 w-full text-sm"
            placeholder="폴더 이름을 입력하세요"
            onBlur={() => {
              isEditingToggle();
              resetInputValue();
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                updateWorkspaceName();
              }
            }}
            value={spaceNameValue}
            onChange={handleInputChange}
            onClick={(e) => e.preventDefault()}
            autoFocus
          />
        ) : (
          <>
            <div className="text-sm text-gray-700 truncate w-50">
              {spaceName}
            </div>
            <div className="absolute right-1 pr-2">
              <button
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-2xl p-2"
                onClick={menuOpenToggle}
                ref={buttonRef}
              >
                <HiOutlineDotsHorizontal />
              </button>
            </div>
          </>
        )}
      </Link>
      {isMenuOpen && (
        <FloatingMenu
          menuRef={menuRef}
          buttonRef={buttonRef}
          width="8rem"
          offset={{ x: -35, y: -10 }}
        >
          <MenuItem onClick={isEditingToggle}>이름 수정하기</MenuItem>
          <MenuItem onClick={openModal} danger>
            삭제하기
          </MenuItem>
        </FloatingMenu>
      )}

      <DeleteWorkspaceModal
        spaceId={spaceId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default WorkspaceItem;
