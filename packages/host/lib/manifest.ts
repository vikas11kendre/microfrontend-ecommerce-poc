import { init } from '@module-federation/runtime';
import * as ReduxToolkit from '@reduxjs/toolkit';
import * as ReactQuery from '@tanstack/react-query';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReduxPersist from 'redux-persist';
import * as SharedStore from 'shared-store';
import * as NextRouter from 'next/router';

const CACHE_KEY = 'mfe:remotes:lkg';

type Manifest = {
  remoteProducts: string;
  remoteCart: string;
  remoteOrders: string;
};

type BootstrapResult = {
  usedCache: boolean;
};

type RemoteEntry = {
  name: string;
  entry: string;
  type: 'global';
  entryGlobalName: string;
};

function readCache(): Manifest | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Manifest;
  } catch {
    return null;
  }
}

function writeCache(manifest: Manifest): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(manifest));
  } catch {
    // quota exceeded — degrade gracefully
  }
}

function manifestToRemotes(manifest: Manifest): RemoteEntry[] {
  return [
    {
      name: 'remoteProducts',
      entry: `${manifest.remoteProducts}/_next/static/chunks/remoteEntry.js`,
      type: 'global',
      entryGlobalName: 'remoteProducts',
    },
    {
      name: 'remoteCart',
      entry: `${manifest.remoteCart}/_next/static/chunks/remoteEntry.js`,
      type: 'global',
      entryGlobalName: 'remoteCart',
    },
    {
      name: 'remoteOrders',
      entry: `${manifest.remoteOrders}/_next/static/chunks/remoteEntry.js`,
      type: 'global',
      entryGlobalName: 'remoteOrders',
    },
  ];
}

export async function bootstrapRemotes(): Promise<BootstrapResult> {
  // Try network first
  try {
    const res = await fetch('/api/remotes');
    if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);

    const manifest: Manifest = await res.json();
    writeCache(manifest);

    init({
      name: 'host',
      remotes: manifestToRemotes(manifest),
      shared: {
        react: {
          version: '18.3.1',
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: '18.3.1',
          },
        },
        'react-dom': {
          version: '18.3.1',
          lib: () => ReactDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: '18.3.1',
          },
        },
        '@reduxjs/toolkit': {
          version: '2.12.0',
          lib: () => ReduxToolkit,
          shareConfig: {
            singleton: true,
            requiredVersion: false,
          },
        },
        '@tanstack/react-query': {
          version: '5.100.10',
          lib: () => ReactQuery,
          shareConfig: {
            singleton: true,
            requiredVersion: false,
          },
        },
        'next/router': {
          version: '14.2.35',
          lib: () => NextRouter,
          shareConfig: {
            singleton: true,
            requiredVersion: false,
          },
        },
        'react-redux': {
          version: '9.3.0',
          lib: () => ReactRedux,
          shareConfig: {
            singleton: true,
            requiredVersion: false,
          },
        },
        'redux-persist': {
          version: '6.0.0',
          lib: () => ReduxPersist,
          shareConfig: {
            singleton: true,
            requiredVersion: false,
          },
        },
        'shared-store': {
          version: '1.0.0',
          lib: () => SharedStore,
          shareConfig: {
            singleton: true,
            requiredVersion: '^1.0.0',
            strictVersion: true,
          },
        },
      },
    });

    return { usedCache: false };
  } catch {
    // Network failed — try cache
    const cached = readCache();
    if (cached) {
      init({
        name: 'host',
        remotes: manifestToRemotes(cached),
        shared: {
          react: {
            version: '18.3.1',
            lib: () => React,
            shareConfig: {
              singleton: true,
              requiredVersion: '18.3.1',
            },
          },
          'react-dom': {
            version: '18.3.1',
            lib: () => ReactDOM,
            shareConfig: {
              singleton: true,
              requiredVersion: '18.3.1',
            },
          },
          '@reduxjs/toolkit': {
            version: '2.12.0',
            lib: () => ReduxToolkit,
            shareConfig: {
              singleton: true,
              requiredVersion: false,
            },
          },
          '@tanstack/react-query': {
            version: '5.100.10',
            lib: () => ReactQuery,
            shareConfig: {
              singleton: true,
              requiredVersion: false,
            },
          },
          'next/router': {
            version: '14.2.35',
            lib: () => NextRouter,
            shareConfig: {
              singleton: true,
              requiredVersion: false,
            },
          },
          'react-redux': {
            version: '9.3.0',
            lib: () => ReactRedux,
            shareConfig: {
              singleton: true,
              requiredVersion: false,
            },
          },
          'redux-persist': {
            version: '6.0.0',
            lib: () => ReduxPersist,
            shareConfig: {
              singleton: true,
              requiredVersion: false,
            },
          },
          'shared-store': {
            version: '1.0.0',
            lib: () => SharedStore,
            shareConfig: {
              singleton: true,
              requiredVersion: '^1.0.0',
              strictVersion: true,
            },
          },
        },
      });

      return { usedCache: true };
    }
  }

  // Both network and cache failed — graceful degradation
  init({
    name: 'host',
    remotes: [],
    shared: {
      react: {
        version: '18.3.1',
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: '18.3.1',
        },
      },
      'react-dom': {
        version: '18.3.1',
        lib: () => ReactDOM,
        shareConfig: {
          singleton: true,
          requiredVersion: '18.3.1',
        },
      },
      '@reduxjs/toolkit': {
        version: '2.12.0',
        lib: () => ReduxToolkit,
        shareConfig: {
          singleton: true,
          requiredVersion: false,
        },
      },
      '@tanstack/react-query': {
        version: '5.100.10',
        lib: () => ReactQuery,
        shareConfig: {
          singleton: true,
          requiredVersion: false,
        },
      },
      'next/router': {
        version: '14.2.35',
        lib: () => NextRouter,
        shareConfig: {
          singleton: true,
          requiredVersion: false,
        },
      },
      'react-redux': {
        version: '9.3.0',
        lib: () => ReactRedux,
        shareConfig: {
          singleton: true,
          requiredVersion: false,
        },
      },
      'redux-persist': {
        version: '6.0.0',
        lib: () => ReduxPersist,
        shareConfig: {
          singleton: true,
          requiredVersion: false,
        },
      },
      'shared-store': {
        version: '1.0.0',
        lib: () => SharedStore,
        shareConfig: {
          singleton: true,
          requiredVersion: '^1.0.0',
          strictVersion: true,
        },
      },
    },
  });

  return { usedCache: false };
}
