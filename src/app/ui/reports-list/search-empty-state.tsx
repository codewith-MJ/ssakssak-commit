import { SearchXIcon } from "lucide-react";

type SearchEmptyStateProps = {
  searchTerm: string;
  onClear: () => void;
};

function SearchEmptyState({ searchTerm, onClear }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
      <SearchXIcon className="mb-4 h-12 w-12 text-gray-400" />
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        검색 결과가 없습니다
      </h3>
      <p className="mb-4 text-sm text-gray-500">
        &quot;{searchTerm}&quot;에 대한 검색 결과를 찾을 수 없어요
      </p>
      <button
        onClick={onClear}
        className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
      >
        검색 초기화
      </button>
    </div>
  );
}

export default SearchEmptyState;
