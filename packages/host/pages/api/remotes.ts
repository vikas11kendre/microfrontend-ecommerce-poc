import type { NextApiRequest, NextApiResponse } from 'next';

type RemoteManifest = {
  remoteProducts: string;
  remoteCart: string;
  remoteOrders: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const remoteProducts = process.env.REMOTE_PRODUCTS_URL;
  const remoteCart = process.env.REMOTE_CART_URL;
  const remoteOrders = process.env.REMOTE_ORDERS_URL;

  if (!remoteProducts || !remoteCart || !remoteOrders) {
    return res.status(500).json({
      error: 'Missing REMOTE_PRODUCTS_URL, REMOTE_CART_URL, or REMOTE_ORDERS_URL',
    });
  }

  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.status(200).json({
    remoteProducts,
    remoteCart,
    remoteOrders,
  } satisfies RemoteManifest);
}
