interface SummaryBoxProps {
  reportSummary: string;
}

/** 불릿(•) 앞 공백을 줄바꿈으로 바꿔 pre-line에서 항목이 나뉘어 보이게 함 */
function normalizeBulletLineBreaks(text: string): string {
  return text.replace(/\s+•\s+/g, "\n• ");
}

function SummaryBox({ reportSummary }: SummaryBoxProps) {
  const normalizedSummary = normalizeBulletLineBreaks(reportSummary);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 border-b text-xl font-bold text-gray-900">
        📊 전체 분석 및 요약
      </h2>
      <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">
        {normalizedSummary}
      </p>
    </div>
  );
}

export default SummaryBox;
