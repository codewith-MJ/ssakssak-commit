"use client";

import CardLayout from "@/app/ui/layout/card-layout";
import NavigateButton from "@/app/ui/common/navigate-button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <CardLayout
      title="이런! 오류가 발생했어요!"
      body={
        <div className="text-center">
          <p className="mb-2">데이터를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-sm text-gray-600">잠시 후 다시 시도해 주세요.</p>
        </div>
      }
      actions={
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            다시 시도
          </button>
          <NavigateButton to="/">메인 페이지로 이동</NavigateButton>
        </div>
      }
      cardSrc="/error-cat.svg"
    />
  );
}
