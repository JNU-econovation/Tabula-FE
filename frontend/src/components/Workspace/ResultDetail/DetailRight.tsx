import { PageResult } from '@/api/workspace';
import Modal from '@/components/common/Modal/Modal';

interface ResultDetail {
  currentPageData?: PageResult | null;
  isWrongModalOpen?: boolean;
  closeWrongModal?: () => void;
}
const DetailRight = ({
  currentPageData,
  isWrongModalOpen = false,
  closeWrongModal = () => {},
}: ResultDetail) => {
  return (
    <>
      {currentPageData && (
        <>
          <h2 className="text-lg font-bold text-red-600 mb-3 whitespace-pre">
            ❌ 틀린 내용
          </h2>
          <ul className="space-y-4">
            {currentPageData.result.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-gray-700">• {item.wrong}</p>
                <p className="text-gray-600 ml-4">→ {item.feedback}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <Modal
        isOpen={isWrongModalOpen}
        close={closeWrongModal}
        size="lg"
        location="bottom"
      >
        <>
          <h2 className="text-lg font-bold text-red-600 mb-3 whitespace-pre">
            ❌ 틀린 내용
          </h2>
          <ul className="space-y-4">
            {currentPageData?.result.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-gray-700">• {item.wrong}</p>
                <p className="text-gray-600 ml-4">→ {item.feedback}</p>
              </li>
            ))}
          </ul>
        </>
      </Modal>
    </>
  );
};

export default DetailRight;
