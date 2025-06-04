interface SelectLanguageProps {
  language: 'english' | 'korean';
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showLabel?: boolean;
}

const SelectLanguage = ({
  language,
  handleLanguageChange,
  showLabel = true,
}: SelectLanguageProps) => {
  return (
    <span
      className={`flex items-center ${
        showLabel ? 'w-full gap-7' : 'mr-5 gap-0'
      }`}
    >
      {showLabel && <p>자료 언어 선택</p>}
      <select
        className="bg-gray-100 rounded-xl px-2 py-2 text-sm text-gray-700 
             focus:border-primary-400 focus:bg-primary-50 
             focus:outline-none focus:ring-0"
        id="language"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="korean">한국어</option>
        <option value="english">영어</option>
      </select>
    </span>
  );
};

export default SelectLanguage;
