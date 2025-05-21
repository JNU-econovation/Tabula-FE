'use client';
import usePreventScroll from '@/hooks/common/usePreventScroll';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'blue';
  isXButton?: boolean;
}

const Modal = ({
  isOpen,
  close,
  size,
  children,
  color,
  isXButton = true,
}: React.PropsWithChildren<ModalProps>) => {
  usePreventScroll(isOpen);

  if (!isOpen) return null;

  const modalVariants = cva(
    `p-7 fixed inset-0 z-50 flex items-center justify-center relative rounded-lg shadow-lg transition-all duration-300`,
    {
      variants: {
        size: {
          sm: 'w-64 min-h-32',
          md: 'w-96 min-h-64',
          lg: 'w-128 min-h-96',
          xl: 'w-160 min-h-128',
        },
        color: {
          white: 'bg-white',
          blue: 'bg-[#EEF3FF]',
        },
      },

      defaultVariants: {
        size: 'md',
        color: 'white',
      },
    },
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={close}
    >
      <div
        className={`${modalVariants({ size, color })}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isXButton && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={close}
          >
            <IoMdClose size={24} />
          </button>
        )}
        {children}
      </div>
    </div>,

    document.body,
  );
};

export default Modal;
