import { IoMdClose } from 'react-icons/io';

interface UploadedImagePreviewProps {
  imageFiles: File[];
  deleteImageFile: (index: number) => void;
}

const UploadedImagePreview = ({ imageFiles, deleteImageFile }: UploadedImagePreviewProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {imageFiles.map((file, index) => (
        <div key={index} className="relative w-16 h-16 border border-gray-300 rounded overflow-hidden">
          <img
            src={URL.createObjectURL(file)}
            alt={`uploaded-${index}`}
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => deleteImageFile(index)}
            className="absolute top-1 right-1 text-white bg-black/50 rounded-full p-0.5 cursor-pointer"
          >
            <IoMdClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UploadedImagePreview;
