import { useToastStore } from "@/stores/toastStore"
import { usePostFolder } from "../query/usePostFolder"
import { useDeleteFolder } from "../query/useDeleteFolder"
import { usePutFolder } from "../query/usePutFolder"
import { useEffect, useState } from "react"

interface UseFolderProps {
  folderId?: string;
  isAddCard?: boolean;
  initialTitle?: string;
  initialColor?: number;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const useFolder = ({ folderId, isAddCard, initialTitle = "", initialColor = 0, closeModal, isModalOpen }: UseFolderProps) => {
  const addToast = useToastStore((state) => state.addToast)

  const { mutate: createFolder } = usePostFolder({
    onSuccess: () => {
      closeModal()
    },
    onError: () => {
      addToast('폴더 생성에 실패하였습니다. 다시 시도해주세요!')
    }
  })
  const { mutate: updateFolder } = usePutFolder({
    onSuccess: () => {
      addToast("폴더가 수정되었습니다", 3, "default")
      closeModal()
    },
    onError: () => {
      addToast('폴더 수정에 실패하였습니다. 다시 시도해주세요!')
    }
  })
  const { mutate: deleteFolder } = useDeleteFolder({
    onSuccess: () => {
      addToast("폴더가 삭제되었습니다", 3, "default")
      closeModal()
      setIsDeleteModal(false)
    },
    onError: () => {
      addToast("폴더 삭제에 실패하였습니다")
    }
  })

  const [folderTitle, setFolderTitle] = useState<string>(initialTitle)
  const [selectedColor, setSelectedColor] = useState<number | null>(initialColor)
  const [isEditModal, setIsEditModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      setFolderTitle(initialTitle)
      setSelectedColor(initialColor)
    }
  }, [isModalOpen, initialTitle, initialColor])

  const handleSelectColor = (index: number) => {
    setSelectedColor(index)
  }

  const handleConfirm = () => {
    const trimTitle = folderTitle.trim()
      if (trimTitle === "") {
        addToast("폴더 이름을 입력해주세요")
        return
      }

      if (trimTitle.length > 20) {
        addToast("폴더 이름은 20자 이하로 입력해주세요")
        return
      }
      
      if(!isAddCard && trimTitle === initialTitle.trim() && selectedColor === initialColor) {
        addToast("이전 내용과 동일합니다")
        return
      }

      if (selectedColor === null) {
        addToast("색상을 선택해주세요")
        return
      }
  
      if (isAddCard) {
        createFolder(
          {
            folderName: folderTitle.trim(),
            colorIndex: selectedColor
          }
        )
      } else if (folderId) {
        updateFolder(
          {
            folderId: folderId as string,
            folderName: folderTitle,
            colorIndex: selectedColor
          }
        )
      }
  }

  const openDeleteModal = () => {
    setIsDeleteModal(true)
  }

  const handleDelete = () => {
      if (!folderId) {
        console.error('삭제 실패: 폴더 ID가 없습니다')
        return;
      }
      deleteFolder(folderId)
    }

    return {
      folderTitle,
      selectedColor,
      setFolderTitle,
      handleSelectColor,
      handleConfirm,
      handleDelete,
      isEditModal,
      isDeleteModal,
      setIsEditModal,
      setIsDeleteModal,
      openDeleteModal
    }
}