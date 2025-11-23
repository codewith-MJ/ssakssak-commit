function ListHeader() {
  return (
    <header>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight">
            🗂️ 리포트 목록
          </h1>

          <p className="text-[15px] leading-relaxed text-gray-600">
            저장된 분석 리포트를 확인하고, 상세 내용을 조회할 수 있습니다.
          </p>
        </div>
      </div>
    </header>
  );
}

export default ListHeader;
