import type { Product } from './types';

export interface AppEvents {
  'product:added-to-cart': { product: Product };
  'auth:logout': void;
}
