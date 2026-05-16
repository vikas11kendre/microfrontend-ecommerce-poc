import { useState } from "react";

export type PaginationMode = "infinite" | "load-more";

export function usePagination() {
  const [mode, setMode] = useState<PaginationMode>("infinite");

  return { mode, setMode };
}
