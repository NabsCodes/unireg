export function usesMockData(): boolean {
  return process.env.NEXT_PUBLIC_DATA_SOURCE !== "api";
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
