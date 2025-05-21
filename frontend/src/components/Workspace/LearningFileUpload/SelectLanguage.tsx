interface SelectLanguageProps {
  language: 'english' | 'korean' | 'japanese';
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectLanguage = ({
  language,
  handleLanguageChange,
}: SelectLanguageProps) => {
  return (
    <span className="flex items-center w-full gap-7">
      <p>자료 언어 선택</p>
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
        <option value="japanese">일본어</option>
      </select>
    </span>
  );
};

export default SelectLanguage;
