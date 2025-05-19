import { COLOR_PALETTE } from "@/constants/color";
import useModal from "@/hooks/Modal/useModal";
import { darkenColor } from "@/util/colorUtils";
import Modal from "../common/Modal/Modal";
import { Button } from "../common/Button/Button";
import { useEffect, useState } from "react";
import { useToastStore } from "@/stores/toastStore";

interface SubjectFolderProps {
  title?: string;
  isAddCard?: boolean;
  colorIndex?: number;
  onClick?: () => void;
}

const SubjectFolder: React.FC<SubjectFolderProps> = ({ title, isAddCard, colorIndex = 0, onClick }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const addToast = useToastStore((state) => state.addToast)

  const [folderTitle, setFolderTitle] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<number | null>(null)

  const baseColor = isAddCard ? COLOR_PALETTE.folderColors[0] : COLOR_PALETTE.folderColors[colorIndex]
  const hoverColor = darkenColor(baseColor, 0.15)

  useEffect(() => {
    if (!isModalOpen) {
      setFolderTitle("")
      setSelectedColor(null)
    }
  }, [isModalOpen])

  const handleSelectColor = (index: number) => {
    setSelectedColor(index)
  }
  
  const handleConfirm = () => {
    if (selectedColor === null || folderTitle.trim() === "") {
      addToast("제목과 색상을 모두 입력하세요")
      return
    }
    console.log('폴더 제목: ', folderTitle)
    console.log('선택된 색상 인덱스: ', selectedColor)
    closeModal()
  }

  return (
    <div className={`relative w-45 h-60 flex justify-center rounded-lg shadow-md mb-14 group
      ${isAddCard ? "border-dashed border-2 border-primary-600 items-center hover:bg-violet-100" : ""}`}
      style={{
        backgroundColor: isAddCard ? '' : baseColor,
        transition: "background-color 0.3s easeㅇ",
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
        else if (onClick) {
          onClick()
        }
      }}
    >
      {isAddCard ? (
        <div className="text-5xl text-primary-600">+</div>
      ) : (
        <div className="absolute bottom-[-40px] text-center text-gray-700 group-hover:font-semibold">{title}</div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} close={closeModal} size="lg" color="blue">
          <div></div>
          <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
            <div className="text-xl font-semibold mt-4 mb-8 text-gray-700">폴더 이름</div>
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
              >확인</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SubjectFolder