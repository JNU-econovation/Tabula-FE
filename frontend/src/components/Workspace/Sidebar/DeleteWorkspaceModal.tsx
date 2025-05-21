import { Button } from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { useDeleteWorkspace } from '@/hooks/query/workspace/mutation';
import React from 'react';

interface DeleteWorkspaceModalProps {
  spaceId: string;
  isModalOpen: boolean;
  closeModal: () => void;
}
const DeleteWorkspaceModal = ({
  spaceId,
  isModalOpen,
  closeModal,
}: DeleteWorkspaceModalProps) => {
  const { mutate: deleteWorkspaceMutation } = useDeleteWorkspace();
  const handleDelete = () => {
    deleteWorkspaceMutation(spaceId);
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} close={closeModal} size="sm" isXButton={false}>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h2>
        <p className="text-sm text-gray-600 mb-4">
          삭제된 폴더는 복구할 수 없어요
        </p>
        <div className="flex gap-4">
          <Button
            size="sm"
            onClick={closeModal}
            colorScheme="gray"
            variant="line"
          >
            취소
          </Button>
          <Button
            size="sm"
            onClick={handleDelete}
            colorScheme="secondary"
            className="hover:bg-red-300"
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWorkspaceModal;
