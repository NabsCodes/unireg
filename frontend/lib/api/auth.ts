import { apiGet, apiPost } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import type { ApiAuthUser, ApiLoginResponse } from "@/types/api";

export async function login(
  identifier: string,
  password: string,
): Promise<ApiLoginResponse> {
  if (usesMockData()) {
    throw new Error(
      "Login API is only available when NEXT_PUBLIC_DATA_SOURCE=api.",
    );
  }

  return apiPost<ApiLoginResponse, { identifier: string; password: string }>(
    "/api/auth/login",
    { identifier, password },
  );
}

export async function fetchCurrentUser(): Promise<ApiAuthUser> {
  return apiGet<ApiAuthUser>("/api/auth/me");
}
