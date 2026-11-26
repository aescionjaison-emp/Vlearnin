import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getApiUrl } from "./api";
import { firebaseApp } from "./firebase";

export interface StoredEnquiry {
  id: string;
  referenceCode: string;
  type: "demo" | "brochure" | "student" | "institutional" | "employer";
  fullName: string;
  phone: string;
  email?: string;
  programme?: string;
  status: string;
  createdAt: string;
  payload: Record<string, unknown>;
}

const LOCAL_ENQUIRIES_KEY = "vlearnin_enquiries_v1";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms)),
  ]);
}

function shouldTryBackendApi(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_API_URL) return true;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

export function loadLocalEnquiries(): StoredEnquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_ENQUIRIES_KEY);
    return raw ? (JSON.parse(raw) as StoredEnquiry[]) : [];
  } catch {
    return [];
  }
}

function saveLocalEnquiry(item: StoredEnquiry): void {
  if (typeof window === "undefined") return;
  try {
    const prev = loadLocalEnquiries();
    window.localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify([item, ...prev]));
    window.dispatchEvent(new CustomEvent("vlearnin:enquiries-updated"));
  } catch {
    // ignore storage quota errors
  }
}

export async function submitEnquiryWithFallback(
  endpoint: string,
  type: StoredEnquiry["type"],
  payload: Record<string, unknown>,
): Promise<{ ok: true; referenceCode: string; downloadUrl?: string } | { ok: false; error: string }> {
  // 1. Only try NestJS API when running locally or NEXT_PUBLIC_API_URL is configured
  if (shouldTryBackendApi()) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(getApiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const json = await res.json();
      if (!res.ok) {
        return { ok: false, error: json.message || "Unable to submit request. Please try again." };
      }
      return {
        ok: true,
        referenceCode: json.referenceCode || "CONFIRMED",
        downloadUrl: json.downloadUrl,
      };
    } catch {
      // Fall through to local + Firestore persistence
    }
  }

  const referenceCode = `VLN-${Date.now().toString().slice(-6)}`;
  const entry: StoredEnquiry = {
    id: referenceCode,
    referenceCode,
    type,
    fullName: String(
      payload.fullName || payload.contactName || payload.institutionName || payload.companyName || "Enquirer",
    ),
    phone: String(payload.phone || ""),
    email: payload.email ? String(payload.email) : undefined,
    programme: payload.interestedProgramme ? String(payload.interestedProgramme) : undefined,
    status: "NEW",
    createdAt: new Date().toISOString(),
    payload,
  };

  // Save immediately to localStorage so Admin sees it right away
  saveLocalEnquiry(entry);

  // Best-effort sync to Firestore with a strict 1.5s timeout so UI never hangs
  try {
    const db = getFirestore(firebaseApp);
    await withTimeout(addDoc(collection(db, "enquiries"), entry), 1500);
  } catch {
    // Already saved to localStorage
  }

  return { ok: true, referenceCode };
}

export async function fetchStoredEnquiries(): Promise<StoredEnquiry[]> {
  const local = loadLocalEnquiries();
  try {
    const db = getFirestore(firebaseApp);
    const snap = await withTimeout(
      getDocs(query(collection(db, "enquiries"), orderBy("createdAt", "desc"))),
      2000,
    );
    const remote = snap.docs.map((d) => d.data() as StoredEnquiry);
    const byId = new Map<string, StoredEnquiry>();
    [...remote, ...local].forEach((item) => {
      if (item?.id) byId.set(item.id, item);
    });
    return Array.from(byId.values()).sort((a, b) =>
      (b.createdAt || "").localeCompare(a.createdAt || ""),
    );
  } catch {
    return local;
  }
}

export async function updateStoredEnquiryStatus(id: string, status: string): Promise<void> {
  if (typeof window !== "undefined") {
    const next = loadLocalEnquiries().map((item) =>
      item.id === id || item.referenceCode === id ? { ...item, status } : item,
    );
    window.localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(next));
  }
  try {
    const db = getFirestore(firebaseApp);
    const snap = await withTimeout(
      getDocs(query(collection(db, "enquiries"), where("id", "==", id))),
      1500,
    );
    await Promise.all(snap.docs.map((d) => withTimeout(updateDoc(d.ref, { status }), 1500)));
  } catch {
    // localStorage already updated
  }
}

export async function deleteStoredEnquiry(id: string): Promise<void> {
  if (typeof window !== "undefined") {
    const next = loadLocalEnquiries().filter(
      (item) => item.id !== id && item.referenceCode !== id,
    );
    window.localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(next));
  }
  try {
    const db = getFirestore(firebaseApp);
    const snap = await withTimeout(
      getDocs(query(collection(db, "enquiries"), where("id", "==", id))),
      1500,
    );
    await Promise.all(snap.docs.map((d) => withTimeout(deleteDoc(d.ref), 1500)));
  } catch {
    // localStorage already updated
  }
}
