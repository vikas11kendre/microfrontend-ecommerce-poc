import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
] as const;

export default function SortFilter() {
  const router = useRouter();
  const active = (router.query.sort as string) || "rating-desc";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    void router.push(
      { pathname: router.pathname, query: { ...router.query, sort: value } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      <label htmlFor="sort-filter" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-filter"
        value={active}
        onChange={handleChange}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
