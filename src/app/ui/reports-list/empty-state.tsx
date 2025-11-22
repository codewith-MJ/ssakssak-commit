import Link from "next/link";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 text-3xl">📄</div>

      <p className="text-[15px] font-medium text-gray-800">
        아직 생성된 리포트가 없어요.
      </p>
      <p className="mt-1 text-sm text-gray-500">
        분석할 GitHub 저장소를 선택해 첫 리포트를 만들어보세요.
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
      >
        <span className="mr-1 text-base">＋</span>새 리포트 생성하기
      </Link>
    </div>
  );
}

export default EmptyState;
