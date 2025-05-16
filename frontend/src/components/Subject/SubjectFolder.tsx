interface SubjectFolderProps {
  title?: string;
  isAddCard?: boolean;
  colorIndex?: number;
  onClick?: () => void;
}

const colorArray = ['#999CD0', '#A6D0DD', '#859EDF', '#BBBDE1', '#DBB9F3', '#B9C6EA']

const SubjectFolder: React.FC<SubjectFolderProps> = ({ title, isAddCard, colorIndex =0, onClick }) => {
  return (
    <div className={`relative w-45 h-60 flex justify-center rounded-lg shadow-md mb-14
      ${isAddCard ? "border-dashed border-2 border-primary-600 items-center" : ""}`}
      style={{ backgroundColor: isAddCard ? "transparent" : colorArray[colorIndex] }}
      onClick={onClick}
    >
      {isAddCard ? (
        <div className="text-5xl text-primary-600">+</div>
      ) : (
        <div className="absolute bottom-[-40px] text-center text-gray-700">{title}</div>
      )}
    </div>
  )
}

export default SubjectFolder