import { KEYWORD_COLORS } from '@/constants/color';
import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

interface KeywordNode {
  name: string;
  children?: KeywordNode[];
}

export const KeywordItem = ({
  keyword,
  depth = 0,
  rootColor = '',
  colorIndex = 0,
}: {
  keyword: KeywordNode;
  depth?: number;
  rootColor?: string;
  colorIndex?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = keyword?.children && keyword.children.length > 0;

  const isDepth1 = depth === 1;
  const isRoot = depth === 0;

  const thisColor =
    isDepth1 && !rootColor
      ? KEYWORD_COLORS[colorIndex % KEYWORD_COLORS.length]
      : rootColor || '';

  const toggleOpen = () => {
    if (hasChildren && !isRoot) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`w-full pl-4 py-1 overflow-y-auto ${thisColor}`}>
      <div
        className={`flex items-center space-x-2 ${
          hasChildren && !isRoot ? 'cursor-pointer' : ''
        } ${isRoot ? 'font-bold text-lg' : ''}`}
        onClick={toggleOpen}
      >
        {!isRoot && hasChildren && (
          <span className="text-sm">
            {isOpen ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </span>
        )}
        <span>{keyword?.name}</span>
      </div>

      {hasChildren && (isRoot || isOpen) && (
        <div className="mt-1 space-y-1">
          {keyword.children?.map((child, idx) => (
            <KeywordItem
              key={idx}
              keyword={child}
              depth={depth + 1}
              rootColor={thisColor}
              colorIndex={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KeywordItem;
