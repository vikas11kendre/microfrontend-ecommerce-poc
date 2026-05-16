import type { AppEvents } from './events';

type EventName = keyof AppEvents;

export function emit<K extends EventName>(name: K, detail: AppEvents[K]): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function on<K extends EventName>(
  name: K,
  handler: (detail: AppEvents[K]) => void,
): () => void {
  if (typeof window === 'undefined') return () => {};

  const listener = (event: Event) => {
    handler((event as CustomEvent<AppEvents[K]>).detail);
  };

  window.addEventListener(name, listener as EventListener);
  return () => window.removeEventListener(name, listener as EventListener);
}
