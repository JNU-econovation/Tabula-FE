"use client"

import Image from "next/image";
import Modal from "../common/Modal/Modal"
import KeywordImage from '../../../assets/keywordButton.png'
import LearningEx from '../../../assets/learningEx.png'

interface GuideModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const GuideModal = ({ isModalOpen, closeModal }: GuideModalProps) => {

  return (
    <Modal isOpen={isModalOpen} close={closeModal} size="xl">
      <div className="flex flex-col items-center gap-4 p-4 max-h-[80vh]">
        <h2 className="text-xl font-semibold p-2 mb-2 text-gray-800">Tabula 사용법 가이드라인</h2>
        <div className="overflow-y-auto px-4">
          <ul className="flex flex-col list-disc list-inside text-sm text-gray-700 gap-4">
            <h3 className="text-lg font-semibold w-full bg-secondary-100">🔍 키워드 확인하기</h3>
            <li>
              학습 중 막히는 부분이 있다면 <span className="font-semibold">'키워드 확인하기'</span> 토글을 통해 도움 받을 수 있어요.
              <Image src={KeywordImage} alt="키워드 확인하기 버튼" width={160} priority className="flex items-center my-2 ml-4" />
            </li>
            <h3 className="text-lg font-semibold w-full bg-secondary-100">📝 백지학습 작성 팁</h3>
            <li>
              또렷하고 <span className="font-semibold">정갈한 글씨</span>로 작성한 경우 가장 좋은 결과가 나옵니다.
            </li>
            <li>
              <span className="font-semibold">스캔본이나 전자 필기본</span> 업로드 시 인식률이 더욱 향상됩니다.
            </li>
            <li>
              기호보다는 <span className="font-semibold">텍스트</span> 위주로 작성해주세요.
            </li>
            <li>
              아래 예시 사진과 같이 <span className="font-semibold">2분할</span> 기준으로 작성해주세요.
              <Image src={LearningEx} alt="백지학습 2분할 예시 사진" width={400} priority className="ml-4 my-2" />
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export default GuideModal