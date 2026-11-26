import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
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

function loadLocalEnquiries(): StoredEnquiry[] {
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
  } catch {
    // ignore storage quota errors
  }
}

export async function submitEnquiryWithFallback(
  endpoint: string,
  type: StoredEnquiry["type"],
  payload: Record<string, unknown>,
): Promise<{ ok: true; referenceCode: string; downloadUrl?: string } | { ok: false; error: string }> {
  // 1. Try NestJS API first with a short timeout
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
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
    // Backend API offline (static Firebase Hosting) -> save to Firestore + localStorage
  }

  const referenceCode = `VLN-${Date.now().toString().slice(-6)}`;
  const entry: StoredEnquiry = {
    id: referenceCode,
    referenceCode,
    type,
    fullName: String(payload.fullName || payload.contactName || payload.institutionName || payload.companyName || "Enquirer"),
    phone: String(payload.phone || ""),
    email: payload.email ? String(payload.email) : undefined,
    programme: payload.interestedProgramme ? String(payload.interestedProgramme) : undefined,
    status: "NEW",
    createdAt: new Date().toISOString(),
    payload,
  };

  saveLocalEnquiry(entry);

  try {
    const db = getFirestore(firebaseApp);
    await addDoc(collection(db, "enquiries"), entry);
  } catch {
    // Firestore rules or offline fallback already saved to localStorage
  }

  return { ok: true, referenceCode };
}

export async function fetchStoredEnquiries(): Promise<StoredEnquiry[]> {
  const local = loadLocalEnquiries();
  try {
    const db = getFirestore(firebaseApp);
    const snap = await getDocs(query(collection(db, "enquiries"), orderBy("createdAt", "desc")));
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
