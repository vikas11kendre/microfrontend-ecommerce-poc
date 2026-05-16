process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

const path = require('path');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const deps = require('./package.json').dependencies;

const sharedDeps = {
  react: { singleton: true, requiredVersion: deps.react },
  'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  '@reduxjs/toolkit': { singleton: true },
  '@tanstack/react-query': { singleton: true },
  'next/router': { singleton: true },
  'react-redux': { singleton: true },
  'redux-persist': { singleton: true },
  'shared-store': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^1.0.0',
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared-store', 'shared-ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
        ],
      },
    ];
  },
  webpack(config, options) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, '../../node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        '../../node_modules/react/jsx-dev-runtime',
      ),
    };

    config.plugins.push(
      new NextFederationPlugin({
        name: 'remoteProducts',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './ProductsPage': './pages/index.tsx',
          './ProductDetailPage': './pages/product/[id].tsx',
        },
        shared: sharedDeps,
      })
    );
    return config;
  },
};

module.exports = nextConfig;
