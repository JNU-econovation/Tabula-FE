interface LayoutProps {
  isToggleOn?: boolean;
  handleToggle?: () => void;
}

const Toggle = ({ isToggleOn, handleToggle }: LayoutProps) => {
  return (
    <div
      className={`${isToggleOn ? 'bg-primary-500' : 'bg-gray-300'} w-10 h-6 rounded-4xl flex items-center`}
    >
      <button
        onClick={handleToggle}
        className={`${
          isToggleOn ? 'translate-x-5' : 'translate-x-1'
        } transition-transform duration-300 ease-in-out bg-white w-4 h-4 rounded-full shadow-md cursor-pointer`}
      ></button>
    </div>
  );
};

export default Toggle;
