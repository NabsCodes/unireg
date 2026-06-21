import type { ApiAuthUser } from "@/types/api";

const TOKEN_KEY = "unireg_access_token";
const USER_KEY = "unireg_user";

export type StoredAuthUser = ApiAuthUser;

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function setAuth(accessToken: string, user: StoredAuthUser): void {
  if (!canUseStorage()) return;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuthToken(): string | null {
  if (!canUseStorage()) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): StoredAuthUser | null {
  if (!canUseStorage()) return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAuthUser;
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
