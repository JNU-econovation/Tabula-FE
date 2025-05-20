'use client';

import { Button } from '@/components/common/Button/Button';
import FloatingMenu from '@/components/common/FloatingMenu/FloatingMenu';
import MenuItem from '@/components/common/FloatingMenu/MenuItem';

import Modal from '@/components/common/Modal/Modal';

import { useHandleOutside } from '@/hooks/common/useHandleOutside';
import useModal from '@/hooks/common/useModal';
import {
  useUpdateWorkspaceName,
  useDeleteWorkspace,
} from '@/hooks/query/workspace/mutation';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface WorkspaceItemProps {
  spaceId: string;
  spaceName: string;
}

//TODO: 리팩토링 필요
const WorkspaceItem = ({ spaceId, spaceName }: WorkspaceItemProps) => {
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateWorkspace } = useUpdateWorkspaceName();
  const { mutate: deleteWorkspace } = useDeleteWorkspace();
  const [spaceNameValue, setSpaceNameValue] = useState(spaceName);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { menuRef, buttonRef } = useHandleOutside(isSpaceOpen, () => {
    setIsSpaceOpen(false);
  });

  const toggleSpaceOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setSpaceNameValue(spaceName);
    setIsSpaceOpen(!isSpaceOpen);
  };

  const handleDelete = async () => {
    await deleteWorkspace(spaceId);
    closeModal();
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
            className="border border-gray-300 rounded-md px-2 py-1 w-full text-sm"
            placeholder="폴더 이름을 입력하세요"
            onBlur={() => setIsEditing(false)}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                setIsEditing(false);
                await updateWorkspace({
                  spaceId,
                  newSpaceName: spaceNameValue,
                });
                setSpaceNameValue('');
                setIsSpaceOpen(false);
              }
              e.stopPropagation();
            }}
            value={spaceNameValue}
            onChange={(e) => setSpaceNameValue(e.target.value)}
            onClick={(e) => e.preventDefault()}
            autoFocus
          />
        ) : (
          <>
            <div className="text-sm text-gray-700 truncate w-4/5">
              {spaceName}
            </div>
            <div className="absolute right-1 pr-2">
              <button
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 rounded-2xl p-2"
                onClick={toggleSpaceOpen}
                ref={buttonRef}
              >
                <HiOutlineDotsHorizontal />
              </button>
            </div>
          </>
        )}
      </Link>

      {isSpaceOpen && (
        <FloatingMenu
          menuRef={menuRef}
          buttonRef={buttonRef}
          width="8rem"
          offset={{ x: -35, y: -10 }}
        >
          <MenuItem onClick={handleEdit}>이름 수정하기</MenuItem>
          <MenuItem onClick={openModal} danger>
            삭제하기
          </MenuItem>
        </FloatingMenu>
      )}

      <Modal
        isOpen={isModalOpen}
        close={closeModal}
        size="sm"
        isXButton={false}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h2>
          <p className="text-sm text-gray-600 mb-4">
            삭제된 폴더는 복구할 수 없어요
          </p>
          <div className="flex gap-4">
            <Button
              size="sm"
              onClick={handleDelete}
              colorScheme="secondary"
              className="hover:bg-red-300"
            >
              삭제
            </Button>
            <Button
              size="sm"
              onClick={closeModal}
              colorScheme="gray"
              variant="line"
            >
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkspaceItem;
