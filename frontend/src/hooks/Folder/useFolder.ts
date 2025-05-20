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
}

export const useFolder = ({ folderId, isAddCard, initialTitle = "", initialColor = 0, closeModal }: UseFolderProps) => {
  const addToast = useToastStore((state) => state.addToast)
  const { mutate: createFolder } = usePostFolder()
  const { mutate: deleteFolder } = useDeleteFolder()
  const { mutate: updateFolder } = usePutFolder()

  const [folderTitle, setFolderTitle] = useState<string>(initialTitle)
  const [selectedColor, setSelectedColor] = useState<number | null>(initialColor)
  const [isEditModal, setIsEditModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const handleSelectColor = (index: number) => {
    setSelectedColor(index)
  }

  const handleConfirm = () => {
      if (selectedColor === null || folderTitle.trim() === "") {
        addToast("폴더 이름과 색상은 필수입니다")
        return
      }
  
      if (isAddCard) {
        createFolder(
          {
            folderName: folderTitle.trim(),
            folderColor: selectedColor
          },
          {
            onSuccess: () => {
              closeModal()
            },
            onError: () => {
              addToast('폴더 생성에 실패하였습니다')
            }
          }
        )
      } else if (folderId) {
        updateFolder(
          {
            folderId: folderId as string,
            folderName: folderTitle,
            folderColor: selectedColor
          },
          {
            onSuccess: () => {
              addToast("폴더가 수정되었습니다", 3, "default")
              closeModal()
            },
            onError: () => {
              addToast("폴더 수정에 실패하였습니다")
            }
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
      deleteFolder(folderId, {
        onSuccess: () => {
          addToast("폴더가 삭제되었습니다", 3, "default")
          closeModal()
          setIsDeleteModal(false)
        },
        onError: () => {
          addToast("폴더 삭제에 실패하였습니다")
        }
      })
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