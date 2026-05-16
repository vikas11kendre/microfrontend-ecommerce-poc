import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import CategoryTabs from "../components/CategoryTabs";
import PaginationToggle from "../components/PaginationToggle";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SortFilter from "../components/SortFilter";
import { usePagination } from "../hooks/usePagination";
import { useProducts } from "../hooks/useProducts";
import { queryClient } from "../lib/queryClient";

function ProductsList() {
  const router = useRouter();
  const { mode } = usePagination();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useProducts();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const products = data?.pages.flat() ?? [];

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (mode !== "infinite") return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, handleObserver]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {products.length === 0 && !isFetchingNextPage && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-slate-500">No products found.</p>
          <button
            type="button"
            onClick={() => router.replace(router.pathname)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm text-slate-400">Loading more...</p>
      )}

      {mode === "infinite" && hasNextPage && (
        <div ref={sentinelRef} className="h-4" />
      )}

      {mode === "load-more" && hasNextPage && (
        <div className="flex justify-center pb-8">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar />
          <SortFilter />
        </div>
        <CategoryTabs />
        <PaginationToggle />
        <ProductsList />
      </main>
    </QueryClientProvider>
  );
}
