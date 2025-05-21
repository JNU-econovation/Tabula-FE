import { formatFileSize } from '@/util/formatFileSize';
import { FaFileAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface SelectedFileItemProps {
  selectedFile: File;
  deleteFile: () => void;
}
const SelectedFileItem = ({
  selectedFile,
  deleteFile,
}: SelectedFileItemProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md px-4 py-3 my-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200">
        <FaFileAlt />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <p className="text-sm font-medium text-gray-800 truncate">
          {selectedFile.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          PDF · {formatFileSize(selectedFile.size)}
        </p>
      </div>

      <button
        onClick={deleteFile}
        className="ml-4 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        aria-label="파일 삭제"
      >
        <IoMdClose size={15} />
      </button>
    </div>
  );
};

export default SelectedFileItem;
