const MenuItem = ({
  onClick,
  children,
  className = '',
  danger = false,
  disabled = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
}) => {
  const baseClasses =
    'px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 cursor-pointer';
  const textColor = danger
    ? 'text-red-600'
    : disabled
      ? 'text-gray-400'
      : 'text-gray-700';
  const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <div
      className={`${baseClasses} ${textColor} ${cursorClass} ${className}`}
      onClick={disabled ? undefined : onClick}
    >
      <span className="truncate">{children}</span>
    </div>
  );
};

export default MenuItem;
