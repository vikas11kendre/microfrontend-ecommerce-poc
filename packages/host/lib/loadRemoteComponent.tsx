import { loadRemote } from '@module-federation/runtime';
import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic';
import type { ComponentType, ReactElement } from 'react';

type RemoteModule<TProps> =
  | ComponentType<TProps>
  | {
      default: ComponentType<TProps>;
    };

function resolveComponent<TProps>(mod: RemoteModule<TProps>): ComponentType<TProps> {
  return typeof mod === 'function' ? mod : mod.default;
}

export function createRemoteComponent<TProps extends object>(
  remoteId: string,
  loading?: (props: DynamicOptionsLoadingProps) => ReactElement | null,
) {
  return dynamic<TProps>(
    async () => {
      const mod = await loadRemote<RemoteModule<TProps>>(remoteId);

      if (!mod) {
        throw new Error(`Failed to load remote module: ${remoteId}`);
      }

      return resolveComponent(mod);
    },
    {
      ssr: false,
      loading,
    },
  );
}
