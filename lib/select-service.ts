/**
 * Clicking a card in the services rail jumps to the quote form and pre-fills
 * the "service you require" field. The two sections don't share a parent that
 * could hold the state, and one value doesn't warrant a provider, so they talk
 * over a window event instead.
 */
export const SERVICE_PICKED = "gj:service-picked";

export function pickService(title: string) {
  window.dispatchEvent(new CustomEvent<string>(SERVICE_PICKED, { detail: title }));
}

export function onServicePicked(handler: (title: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(SERVICE_PICKED, listener);
  return () => window.removeEventListener(SERVICE_PICKED, listener);
}
