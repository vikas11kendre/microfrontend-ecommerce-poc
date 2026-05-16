import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';

export function useCategories() {
  return useQuery<string[]>(
    { queryKey: ['categories'], queryFn: fetchCategories },
    queryClient,
  );
}

async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
