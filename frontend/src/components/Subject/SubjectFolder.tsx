import { COLOR_PALETTE } from "@/constants/color";
import { darkenColor } from "@/util/colorUtils";

interface SubjectFolderProps {
  title?: string;
  isAddCard?: boolean;
  colorIndex?: number;
  onClick?: () => void;
}

const SubjectFolder: React.FC<SubjectFolderProps> = ({ title, isAddCard, colorIndex = 0, onClick }) => {
  const baseColor = isAddCard ? COLOR_PALETTE.folderColors[0] : COLOR_PALETTE.folderColors[colorIndex]
  const hoverColor = darkenColor(baseColor, 0.15)

  return (
    <div className={`relative w-45 h-60 flex justify-center rounded-lg shadow-md mb-14 group
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
      onClick={onClick}
    >
      {isAddCard ? (
        <div className="text-5xl text-primary-600">+</div>
      ) : (
        <div className="absolute bottom-[-40px] text-center text-gray-700 group-hover:font-semibold">{title}</div>
      )}
    </div>
  )
}

export default SubjectFolder