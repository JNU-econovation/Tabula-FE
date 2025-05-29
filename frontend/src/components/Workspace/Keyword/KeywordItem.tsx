import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

const level1Colors = [
  'bg-purple-50',
  'bg-blue-50',
  'bg-indigo-50',
  'bg-pink-50',
];

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
  const hasChildren = keyword.children && keyword.children.length > 0;

  const isDepth1 = depth === 1;
  const isRoot = depth === 0;

  const thisColor =
    isDepth1 && !rootColor
      ? level1Colors[colorIndex % level1Colors.length]
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
        <span>{keyword.name}</span>
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
