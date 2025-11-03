import { cookies } from "next/headers";

/**
 * Get the current user ID for development testing
 * In production, this would come from authentication
 * For now, it reads from localStorage via a cookie set by RoleSwitcher
 */
export async function getDevUserId(): Promise<string> {
  const cookieStore = await cookies();
  const devUser = cookieStore.get("dev-current-user");
  return devUser?.value || "user-001";
}
