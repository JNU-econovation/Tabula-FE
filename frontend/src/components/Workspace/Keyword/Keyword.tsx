import Modal from '@/components/common/Modal/Modal';
import Toggle from '@/components/common/Toggle/Toggle';
import KeywordItem from '@/components/Workspace/Keyword/KeywordItem';
import useModal from '@/hooks/common/useModal';
import { useGetKeywordList } from '@/hooks/query/workspace/query';
import { useParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { SidebarContext } from '../../../../app/workspace/[folderId]/layout';
import clsx from 'clsx';

const Keyword = () => {
  const { spaceId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);

  const [isToggleOn, setIsToggleOn] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { keywordList, isLoading } = useGetKeywordList(spaceId as string);

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
    openModal();
  };

  const close = () => {
    setIsToggleOn(false);
    closeModal();
  };
  return (
    <>
      <div
        className={clsx(
          'fixed top-20 z-50 gap-2 items-center justify-center h-10 bg-primary-300 rounded-4xl px-6 shadow-lg',
          'flex',
          isSidebarOpen && 'sm:flex hidden',
        )}
      >
        <p className="text-white">키워드 확인하기</p>
        <Toggle handleToggle={handleToggle} isToggleOn={isToggleOn} />
      </div>

      <Modal isOpen={isModalOpen} close={close} size="lg">
        <div className="h-[27rem] w-full flex flex-col ">
          {!keywordList || isLoading ? (
            <div>loading...</div>
          ) : (
            <KeywordItem keyword={keywordList} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Keyword;
