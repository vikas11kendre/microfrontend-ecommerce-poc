import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../shared-ui/src/**/*.{ts,tsx}',
    '../remote-products/pages/**/*.{ts,tsx}',
    '../remote-products/components/**/*.{ts,tsx}',
    '../remote-cart/pages/**/*.{ts,tsx}',
    '../remote-cart/components/**/*.{ts,tsx}',
    '../remote-orders/pages/**/*.{ts,tsx}',
    '../remote-orders/components/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
