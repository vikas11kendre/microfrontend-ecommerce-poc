import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryClient } from "../lib/queryClient";

const PAGE_SIZE = 8;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: { rate: number; count: number };
}

export function useProducts() {
  const router = useRouter();
  const search = (router.query.q as string) || "";
  const sort = (router.query.sort as string) || "rating-desc";
  const category = (router.query.category as string) || "";

  return useInfiniteQuery<Product[]>(
    {
      queryKey: ["products", { search, sort, category }],
      queryFn: async ({ pageParam }) => {
        const page = pageParam as number;
        let url: string;
        if (category) {
          url = `${process.env.NEXT_PUBLIC_API_BASE}/products/category/${encodeURIComponent(category)}`;
        } else if (sort === "price-desc") {
          url = `${process.env.NEXT_PUBLIC_API_BASE}/products?sort=desc`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_BASE}/products`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        let products: Product[] = await res.json();

        if (search) {
          const q = search.toLowerCase();
          products = products.filter((p) => p.title.toLowerCase().includes(q));
        }

        if (category && sort === "price-desc") {
          products.sort((a, b) => b.price - a.price);
        }
        if (sort === "price-asc") {
          products.sort((a, b) => a.price - b.price);
        }
        if (sort === "rating-desc") {
          products.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
        }

        const start = (page - 1) * PAGE_SIZE;
        return products.slice(start, start + PAGE_SIZE);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1;
      },
    },
    queryClient,
  );
}
