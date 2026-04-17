export type AudienceProfile = "particulier" | "professionnel";

const STORAGE_KEY = "earthlease-audience-v1";

const CHANGE_EVENT = "earthlease-audience-change";

export function readAudienceProfile(): AudienceProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "particulier" || raw === "professionnel") return raw;
    return null;
  } catch {
    return null;
  }
}

export function writeAudienceProfile(value: AudienceProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* ignore quota / private mode */
  }
}

export function subscribeAudienceProfile(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
