import Image from "next/image";
import { useRouter } from "next/router";
import type { Product } from "shared-store";
import { addItem, emit, useAppDispatch } from "shared-store";
import { useProduct } from "../../hooks/useProduct";

interface ProductDetailData extends Product {
  description?: string;
  rating?: { rate: number; count: number };
}

export default function ProductDetailPage() {
  const router = useRouter();
  const id = (router.query.id as string) || "";
  const { data, isLoading, isError } = useProduct(id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-slate-500">Loading product...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-red-500">Failed to load product.</p>
      </main>
    );
  }

  const product = data as ProductDetailData;

  const handleAddToCart = () => {
    dispatch(addItem(product));
    emit("product:added-to-cart", { product });
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>

          <p className="text-3xl font-semibold text-slate-800">
            ${product.price.toFixed(2)}
          </p>

          {product.rating && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-yellow-500">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span>
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {product.description && (
            <p className="leading-relaxed text-slate-600">{product.description}</p>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-4 rounded-lg bg-slate-800 px-6 py-3 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
