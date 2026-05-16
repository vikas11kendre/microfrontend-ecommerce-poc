import Image from 'next/image';
import React from 'react';

export interface ProductCardProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: { rate: number; count: number };
}

const ProductCard = React.memo(function ProductCard({
  product,
}: {
  product: ProductCardProduct;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.rating && (
            <span className="text-sm text-yellow-600">
              ★ {product.rating.rate} ({product.rating.count})
            </span>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
