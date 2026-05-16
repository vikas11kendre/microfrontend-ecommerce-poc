import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Product } from "shared-store";
import { queryClient } from "../lib/queryClient";

export function useProduct(id: string | number): UseQueryResult<Product> {
  return useQuery<Product>(
    {
      queryKey: ["product", id],
      queryFn: () => fetchProduct(id),
      enabled: Boolean(id),
    },
    queryClient,
  );
}

async function fetchProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
