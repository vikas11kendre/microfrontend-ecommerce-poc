import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState((router.query.q as string) || "");
  const debouncedValue = useDebounce(value, 300);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) return;
    const current = (router.query.q as string) || "";
    if (debouncedValue !== current) {
      void router.push(
        { pathname: router.pathname, query: { ...router.query, q: debouncedValue || undefined } },
        undefined,
        { shallow: true }
      );
    }
  }, [debouncedValue, router]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const qFromQuery = (router.query.q as string) || "";
    if (qFromQuery !== value) {
      setValue(qFromQuery);
    }
  }, [router.query.q, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex-1">
      <label htmlFor="search-bar" className="sr-only">
        Search products
      </label>
      <input
        id="search-bar"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
      />
    </div>
  );
}
