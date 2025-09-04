import { COLOR_PALETTE } from "@/constants/color";
import { darkenColor } from "@/util/colorUtils";
import Modal from "../common/Modal/Modal";
import { Button } from "../common/Button/Button";
import { AiOutlineMore } from "react-icons/ai";
import FloatingMenu from "../common/FloatingMenu/FloatingMenu";
import MenuItem from "../common/FloatingMenu/MenuItem";
import { useFolder } from "@/hooks/Folder/useFolder";
import { useFolderFloatingMenu } from "@/hooks/Folder/useFolderFloatingMenu";
import useModal from "@/hooks/common/useModal";
import { useRouter } from "next/navigation";

interface SubjectFolderProps {
  title?: string;
  isAddCard?: boolean;
  colorIndex?: number;
  folderId?: string;
}

const SubjectFolder: React.FC<SubjectFolderProps> = ({
  title,
  isAddCard,
  colorIndex = 0,
  folderId
}) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const baseColor = isAddCard ? COLOR_PALETTE.folderColors[0] : COLOR_PALETTE.folderColors[colorIndex ?? 0]
  const hoverColor = darkenColor(baseColor, 0.15)

  const {
    folderTitle, selectedColor, setFolderTitle, handleSelectColor, handleConfirm, handleDelete,
    isEditModal, isDeleteModal, setIsDeleteModal, openDeleteModal
  } = useFolder({
    folderId, isAddCard, initialTitle: title, initialColor: colorIndex, closeModal, isModalOpen
  })

  const { openMenuId, toggleMenu, menuRef, moreButtonRef } = useFolderFloatingMenu()
  const router = useRouter()

  return (
    <div className={`relative w-full h-auto max-w-45 aspect-[3/4] flex justify-center rounded-lg shadow-md mb-14 group
      ${isAddCard ? "border-dashed border-2 border-primary-600 items-center hover:bg-violet-100" : ""}`}
      style={{
        backgroundColor: isAddCard ? '' : baseColor,
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (!isAddCard) {
          (e.currentTarget as HTMLElement).style.backgroundColor = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!isAddCard) {
          (e.currentTarget as HTMLElement).style.backgroundColor = baseColor;
        }
      }}
      onClick={() => {
        if (isAddCard) openModal();
        else if (openMenuId !== folderId) {
          router.push(`/workspace/${folderId}/upload`)
        }
      }}
    >
      {isAddCard ? (
        <div className="text-5xl text-primary-600">+</div>
      ) : (
        <div className="absolute bottom-[-40px] text-center text-gray-700 group-hover:font-semibold">{title ?? '새 폴더'}</div>
      )}

      {!isAddCard && (
        <div ref={moreButtonRef}
          className={`absolute top-2 right-2 text-3xl text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-2
            ${openMenuId === folderId ? "opacity-100" : "opacity-0 group-hover:opacity-100"}  
          `}
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu(folderId || "")
          }}
        >
          <AiOutlineMore className="hover:scale-110 transition-transform duration-300" />
        </div>
      )}

      {openMenuId === folderId && (
        <FloatingMenu menuRef={menuRef} buttonRef={moreButtonRef} offset={{ x:- 40, y: -54 }}>
          <MenuItem onClick={openModal}>폴더 수정</MenuItem>
          <MenuItem danger={true} onClick={openDeleteModal}>폴더 삭제</MenuItem>
        </FloatingMenu>
      )}

      {isDeleteModal && (
        <Modal isOpen={isDeleteModal} close={() => setIsDeleteModal(false)}>
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-lg text-gray-800 mt-4 mb-2 font-semibold">
              {title ? `${title}` : ''} 폴더를 삭제하시겠습니까?
            </div>
            <div className="flex text-gray-800 px-4 text-center">삭제한 폴더는 복구가 불가하며, 해당 <br/> 폴더의 워크스페이스도 함께 삭제됩니다.</div>
            <div className="flex gap-4 mt-4">
              <Button colorScheme="gray" size="sm" width={100} onClick={() => setIsDeleteModal(false)}>취소</Button>
              <Button colorScheme="red" size="sm" width={100} onClick={handleDelete}>삭제</Button>
            </div>
          </div>
        </Modal>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} close={closeModal} size="lg" color="blue">
          <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
            <div className="text-xl font-semibold mt-4 mb-8 text-gray-700">
              {isEditModal ? "폴더 수정" : "폴더 생성"}
            </div>
            <input type="text" value={folderTitle || ""} placeholder="제목을 입력하세요"
              onChange={(e) => setFolderTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#7AA3C3] bg-[#D3DCEF] rounded-md focus:outline-none " />
            <div className="flex mt-5 items-center justify-center">
              <div className="mr-6">색상</div>
              <div className="flex space-x-4">
                {COLOR_PALETTE.folderColors.map((color, index) => (
                  <div key={color}
                    className={`w-5 h-5 rounded-full cursor-pointer gap-1 ${selectedColor === index ? "ring-3 ring-[#7AA3C3]" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelectColor(index)}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = darkenColor(color, 0.15)}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = color}
                  ></div>
                ))}
              </div>
            </div>
            <div className="mt-8 w-full flex justify-center">
              <Button colorScheme="primary" size="sm" width={150}
                 onClick={handleConfirm}
              >완료</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SubjectFolder