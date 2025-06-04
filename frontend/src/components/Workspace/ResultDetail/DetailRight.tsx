import { PageResult } from '@/api/workspace';

interface ResultDetail {
  currentPageData?: PageResult | null;
  missingAnswer: string[];
}
const DetailRight = ({ currentPageData, missingAnswer }: ResultDetail) => {
  return (
    <>
      {currentPageData ? (
        <>
          <h2 className="text-lg font-bold text-red-600 mb-3 whitespace-pre">
            ❌   틀린 내용
          </h2>
          <ul className="space-y-4">
            {currentPageData.result.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-gray-700">• {item.wrong}</p>
                <p className="text-gray-600 ml-4">→ {item.feedback}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold text-gray-800 mb-3 whitespace-pre">
            💬   누락된 내용
          </h2>
          {missingAnswer.map((miss, index) => (
            <div key={`miss-${index}`} className="mb-3 text-sm">
              • {miss}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default DetailRight;
