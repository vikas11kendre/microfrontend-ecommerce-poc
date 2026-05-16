import { useRouter } from 'next/router';
import { useCategories } from '../hooks/useCategories';

export default function CategoryTabs() {
  const router = useRouter();
  const { data: categories } = useCategories();
  const active = (router.query.category as string) || '';

  if (!categories) return null;

  const tabs = ['All', ...categories];

  const handleClick = (cat: string) => {
    if (cat === 'All') {
      const rest = { ...router.query };
      delete rest.category;
      void router.replace({ pathname: router.pathname, query: rest }, undefined, {
        shallow: true,
      });
    } else {
      void router.replace(
        { pathname: router.pathname, query: { ...router.query, category: cat } },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-1" role="tablist">
      {tabs.map((cat) => {
        const isActive = cat === 'All' ? !active : active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(cat)}
            className={
              isActive
                ? 'whitespace-nowrap rounded-t-md border-x border-t border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900'
                : 'whitespace-nowrap rounded-t-md px-4 py-2 text-sm text-slate-500 hover:text-slate-700'
            }
          >
            {cat}
          </button>
        );
      })}
    </nav>
  );
}
