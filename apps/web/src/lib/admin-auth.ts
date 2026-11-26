import { getApiUrl } from "./api";

export const DEFAULT_ADMIN_ID = "admin@vlearnin.com";
export const DEFAULT_ADMIN_PASSWORD = "Vlearnin@Admin2026";

const AUTH_SESSION_KEY = "vlearnin_admin_session_v1";
const AUTH_CRED_KEY = "vlearnin_admin_credentials_v1";

export interface AdminSession {
  adminId: string;
  name: string;
  role: string;
  expiresAt: number;
  mode: "api" | "portal";
}

interface StoredCredentials {
  adminId: string;
  passwordHash: string;
}

async function sha256Hex(input: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return input;
}

async function getStoredCredentials(): Promise<StoredCredentials> {
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(AUTH_CRED_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredCredentials;
        if (parsed.adminId && parsed.passwordHash) return parsed;
      }
    } catch {
      // ignore
    }
  }
  return {
    adminId: DEFAULT_ADMIN_ID,
    passwordHash: await sha256Hex(DEFAULT_ADMIN_PASSWORD),
  };
}

export async function authenticateAdmin(
  adminIdInput: string,
  passwordInput: string,
): Promise<{ ok: true; session: AdminSession } | { ok: false; error: string }> {
  const normalizedId = adminIdInput.trim().toLowerCase();
  if (!normalizedId || !passwordInput) {
    return { ok: false, error: "Please enter both Admin ID and Password." };
  }

  // 1. Try backend API session first if API is reachable
  try {
    const res = await fetch(getApiUrl("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: normalizedId, password: passwordInput }),
    });
    if (res.ok) {
      const data = await res.json();
      const session: AdminSession = {
        adminId: data.user?.email || normalizedId,
        name: data.user?.name || "VLEARNIN Administrator",
        role: data.user?.role || "SUPER_ADMIN",
        expiresAt: Date.now() + 1000 * 60 * 60 * 12,
        mode: "api",
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      }
      return { ok: true, session };
    }
    if (res.status === 401) {
      // Fall through to portal credentials check in case user updated portal credentials
    }
  } catch {
    // Backend API offline (e.g. static Firebase Hosting); use portal credentials
  }

  // 2. Verify against configured portal Admin ID & Password
  const creds = await getStoredCredentials();
  const inputHash = await sha256Hex(passwordInput);
  const idMatches =
    normalizedId === creds.adminId.toLowerCase() ||
    (creds.adminId === DEFAULT_ADMIN_ID && normalizedId === "vlearnin-admin");

  if (!idMatches || inputHash !== creds.passwordHash) {
    return { ok: false, error: "Invalid Admin ID or Password." };
  }

  const session: AdminSession = {
    adminId: creds.adminId,
    name: "VLEARNIN Administrator",
    role: "SUPER_ADMIN",
    expiresAt: Date.now() + 1000 * 60 * 60 * 12,
    mode: "portal",
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  }
  return { ok: true, session };
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      window.localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function updateAdminCredentials(
  newAdminId: string,
  newPassword: string,
): Promise<void> {
  if (typeof window === "undefined") return;
  const creds: StoredCredentials = {
    adminId: newAdminId.trim().toLowerCase(),
    passwordHash: await sha256Hex(newPassword),
  };
  window.localStorage.setItem(AUTH_CRED_KEY, JSON.stringify(creds));
  const current = getAdminSession();
  if (current) {
    window.localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({ ...current, adminId: creds.adminId }),
    );
  }
}

export async function clearAdminSession(): Promise<void> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
  }
  try {
    await fetch(getApiUrl("/auth/logout"), {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // ignore if API offline
  }
}
