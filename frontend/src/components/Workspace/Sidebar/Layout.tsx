import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

interface LayoutProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Layout = ({ isOpen, onToggle, children }: LayoutProps) => {
  return (
    <>
      <div
        className={`
          flex flex-col
          fixed top-18 left-0 h-[calc(100vh-4.5rem)] z-50 w-72
          transform transition-transform duration-300 ease-in-out
          bg-gray-100
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-2 flex-none">
          <button
            onClick={onToggle}
            className="text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <RxHamburgerMenu size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2 flex-1 p-2">{children}</div>
      </div>

      {!isOpen && (
        <div className="fixed top-18 left-0 z-40 p-2 ">
          <button
            onClick={onToggle}
            className="text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <RxHamburgerMenu size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default Layout;
