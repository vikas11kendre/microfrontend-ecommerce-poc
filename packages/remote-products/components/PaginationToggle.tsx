import { usePagination } from "../hooks/usePagination";

export default function PaginationToggle() {
  const { mode, setMode } = usePagination();

  return (
    <div className="flex items-center rounded-lg border border-slate-300 bg-white p-1 text-sm" role="radiogroup" aria-label="Pagination mode">
      <button
        type="button"
        role="radio"
        aria-checked={mode === "infinite"}
        onClick={() => setMode("infinite")}
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          mode === "infinite"
            ? "bg-slate-800 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Infinite scroll
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === "load-more"}
        onClick={() => setMode("load-more")}
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          mode === "load-more"
            ? "bg-slate-800 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Load more
      </button>
    </div>
  );
}
