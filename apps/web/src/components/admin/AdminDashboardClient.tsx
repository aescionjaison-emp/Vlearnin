"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  Eye,
  KeyRound,
  Layers,
  LogOut,
  Pencil,
  PlusSquare,
  RotateCcw,
  Save,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { fetchStoredEnquiries } from "@/lib/enquiry-store";
import {
  AdminSession,
  clearAdminSession,
  getAdminSession,
  updateAdminCredentials,
} from "@/lib/admin-auth";
import { useSiteContent } from "@/components/SiteContentProvider";
import { GlobalHeader } from "@/components/GlobalHeader";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { QuickAccessStrip } from "@/components/home/QuickAccessStrip";
import { BrandIntroSection } from "@/components/home/BrandIntroSection";
import { HomeCatalogSections } from "@/components/home/HomeCatalogSections";
import { GlobalFooter } from "@/components/GlobalFooter";
import { AdminContentManager } from "./AdminContentManager";

type StudioTab = "visual" | "manager" | "inspector" | "operations" | "credentials";

interface FlatField {
  path: string;
  value: string | number | boolean;
  type: "string" | "number" | "boolean";
}

function flattenObject(obj: unknown, prefix = ""): FlatField[] {
  const out: FlatField[] = [];
  if (obj === null || obj === undefined) return out;
  if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      const nextPath = prefix ? `${prefix}.${idx}` : String(idx);
      if (typeof item === "object" && item !== null) {
        out.push(...flattenObject(item, nextPath));
      } else {
        out.push({
          path: nextPath,
          value: item,
          type: typeof item === "number" ? "number" : typeof item === "boolean" ? "boolean" : "string",
        });
      }
    });
    return out;
  }
  if (typeof obj === "object") {
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      const nextPath = prefix ? `${prefix}.${key}` : key;
      if (val !== null && typeof val === "object") {
        out.push(...flattenObject(val, nextPath));
      } else if (val !== undefined && val !== null) {
        out.push({
          path: nextPath,
          value: val as string | number | boolean,
          type: typeof val === "number" ? "number" : typeof val === "boolean" ? "boolean" : "string",
        });
      }
    }
  }
  return out;
}

export function AdminDashboardClient() {
  const router = useRouter();
  const {
    content,
    isEditMode,
    setEditMode,
    hasUnsavedChanges,
    saving,
    lastSavedAt,
    setByPath,
    replaceContent,
    saveAndPublish,
    resetToDefault,
  } = useSiteContent();

  const [session, setSession] = useState<AdminSession | null>(null);
  const [activeTab, setActiveTab] = useState<StudioTab>("visual");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiConnected, setApiConnected] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Credentials update state
  const [newAdminId, setNewAdminId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const s = getAdminSession();
    if (!s) {
      router.replace("/admin/login");
      return;
    }
    setSession(s);
    setNewAdminId(s.adminId);
    setEditMode(true);
    return () => setEditMode(false);
  }, [router, setEditMode]);

  useEffect(() => {
    if (activeTab === "visual") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [activeTab, setEditMode]);

  const loadApiOperations = useCallback(async () => {
    try {
      const res = await fetch(getApiUrl("/admin/dashboard"), { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setApiConnected(true);
        setMetrics(data.metrics || {});
        setEnquiries(data.recentEnquiries || []);
        return;
      }
    } catch {
      setApiConnected(false);
    }
    const localAndRemote = await fetchStoredEnquiries();
    setEnquiries(localAndRemote);
  }, []);

  useEffect(() => {
    loadApiOperations();
  }, [loadApiOperations]);

  const flatFields = useMemo(() => flattenObject(content), [content]);
  const filteredFields = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return flatFields;
    return flatFields.filter(
      (f) =>
        f.path.toLowerCase().includes(q) ||
        String(f.value).toLowerCase().includes(q),
    );
  }, [flatFields, searchQuery]);

  const handleSave = async () => {
    const res = await saveAndPublish();
    setFeedback(
      res.remoteSynced
        ? "All changes saved and published live to Firebase & browser storage."
        : "All changes saved and published locally. (Enable Firestore rules to sync globally across devices.)",
    );
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all website text, images, and courses to original defaults?")) return;
    await resetToDefault();
    setFeedback("Website content restored to official defaults.");
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vlearnin-site-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        replaceContent(parsed);
        setFeedback("JSON content imported. Click 'Save & Publish' to apply live.");
      } catch {
        setFeedback("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminId.trim() || newPassword.length < 6) {
      setFeedback("Admin ID is required and password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }
    await updateAdminCredentials(newAdminId, newPassword);
    setNewPassword("");
    setConfirmPassword("");
    setFeedback("Admin ID and Password updated successfully.");
  };

  const handleLogout = async () => {
    await clearAdminSession();
    router.push("/admin/login");
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="font-nav text-sm font-semibold text-[#1E3A8A]">
          Loading VLEARNIN Admin Studio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Sticky Admin Control Toolbar */}
      <div className="sticky top-0 z-50 bg-[#1E3A8A] text-white border-b-4 border-[#EA580C] shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-nav text-xs font-bold uppercase tracking-[0.18em] bg-[#EA580C] px-2.5 py-1 rounded-[10px]">
              ADMIN STUDIO
            </span>
            <span className="font-nav text-xs text-white/85 hidden sm:inline">
              Signed in as <strong>{session.adminId}</strong>
            </span>
            {hasUnsavedChanges && (
              <span className="font-nav text-[11px] font-bold bg-amber-400 text-[#1E3A8A] px-2.5 py-0.5 rounded-[10px]">
                Unsaved Edits
              </span>
            )}
            {lastSavedAt && !hasUnsavedChanges && (
              <span className="font-nav text-[11px] text-[#93C5FD] hidden md:inline">
                Saved at {lastSavedAt}
              </span>
            )}
          </div>

          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "visual"
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Visual Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manager")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "manager"
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <PlusSquare className="w-3.5 h-3.5" />
              Manual Editor (Add / Edit / Delete)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inspector")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "inspector"
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              All Fields ({flatFields.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("operations")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "operations"
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Leads &amp; Backend
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("credentials")}
              className={`px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "credentials"
                  ? "bg-white text-[#1E3A8A]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              ID &amp; Password
            </button>
          </div>

          {/* Save / Reset / Logout */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-3.5 py-1.5 text-xs font-nav font-bold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save & Publish"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Public Site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600/90 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-nav font-semibold rounded-[12px] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {feedback && (
          <div className="bg-[#EFF6FF] text-[#1E3A8A] border-t border-[#BFDBFE] px-4 sm:px-8 py-2 text-xs font-nav font-semibold flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
              {feedback}
            </span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: LIVE VISUAL EDITOR — Exact Public Website UI with Direct Inline Editing */}
      {activeTab === "visual" && (
        <div>
          <div className="bg-[#EFF6FF] border-b border-[#BFDBFE] py-2 px-4 text-center text-xs font-nav text-[#1E3A8A]">
            <Pencil className="w-3.5 h-3.5 inline mr-1.5 text-[#EA580C]" />
            <strong>Visual Edit Mode Active ({isEditMode ? "ON" : "OFF"}):</strong> Click any
            heading, paragraph, button label, stat, or &ldquo;Edit Image&rdquo; button below to
            edit even a single character directly in the public UI, then click{" "}
            <strong>Save &amp; Publish</strong>.
          </div>
          <GlobalHeader forceShow />
          <HeroCarousel />
          <QuickAccessStrip />
          <BrandIntroSection />
          <HomeCatalogSections
            categories={content.categories}
            courses={content.courses}
            combos={content.combos}
          />
          <GlobalFooter forceShow />
        </div>
      )}

      {/* TAB 2: ADD / DELETE MANAGER */}
      {activeTab === "manager" && <AdminContentManager />}

      {/* TAB 3: ALL CONTENT FIELDS (DOT-BY-DOT INSPECTOR) */}
      {activeTab === "inspector" && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[15px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                COMPLETE CONTENT INSPECTOR
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mt-1">
                Edit Every Single Field &amp; Dot
              </h1>
              <p className="text-sm text-[#4B5563] mt-1">
                Search and modify any of the {flatFields.length} content keys across Brand, Header,
                Hero Slides, Courses, Modules, Combos, Campus Gallery, and Footer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleExportJson}
                className="btn-outline-navy px-4 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export JSON
              </button>
              <label className="btn-navy px-4 py-2 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Import JSON
                <input type="file" accept="application/json" onChange={handleImportJson} className="hidden" />
              </label>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#4B5563] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any key or text (e.g. heroBanners, courses, phoneDisplay, footer, pillars)..."
              className="w-full bg-white border border-[#E5E7EB] pl-11 pr-4 py-3 text-sm rounded-[15px] focus:outline-none focus:border-[#1D4ED8]"
            />
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-[15px] divide-y divide-[#E5E7EB]">
            {filteredFields.map((field) => (
              <div
                key={field.path}
                className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start hover:bg-[#F8FAFC]"
              >
                <div className="lg:col-span-4">
                  <code className="text-xs font-mono font-semibold text-[#1E3A8A] break-all">
                    {field.path}
                  </code>
                </div>
                <div className="lg:col-span-8">
                  {field.type === "boolean" ? (
                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(field.value)}
                        onChange={(e) => setByPath(field.path, e.target.checked)}
                      />
                      <span>{field.value ? "Enabled (true)" : "Disabled (false)"}</span>
                    </label>
                  ) : field.type === "number" ? (
                    <input
                      type="number"
                      value={Number(field.value)}
                      onChange={(e) => setByPath(field.path, Number(e.target.value))}
                      className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
                    />
                  ) : String(field.value).length > 85 ? (
                    <textarea
                      rows={2}
                      value={String(field.value)}
                      onChange={(e) => setByPath(field.path, e.target.value)}
                      className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(field.value)}
                      onChange={(e) => setByPath(field.path, e.target.value)}
                      className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BACKEND LEADS & OPERATIONS */}
      {activeTab === "operations" && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[15px] p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                  OPERATIONS &amp; ENQUIRIES
                </p>
                <h2 className="text-2xl font-bold text-[#1E3A8A] mt-1">
                  Backend API Status:{" "}
                  <span className={apiConnected ? "text-emerald-600" : "text-[#EA580C]"}>
                    {apiConnected ? "Connected" : "Static / Offline Mode"}
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={loadApiOperations}
                className="btn-outline-navy px-4 py-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                Refresh Backend Data
              </button>
            </div>

            {apiConnected ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-[15px]">
                  <p className="text-xs font-nav text-[#4B5563]">Student Enquiries</p>
                  <p className="text-2xl font-bold text-[#1E3A8A] mt-1">
                    {metrics.totalStudentEnquiries ?? 0}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-[15px]">
                  <p className="text-xs font-nav text-[#4B5563]">Demo Bookings</p>
                  <p className="text-2xl font-bold text-[#1E3A8A] mt-1">
                    {metrics.demoBookingsCount ?? 0}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-[15px]">
                  <p className="text-xs font-nav text-[#4B5563]">Published Courses</p>
                  <p className="text-2xl font-bold text-[#1E3A8A] mt-1">
                    {metrics.publishedCoursesCount ?? 0}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-[15px]">
                  <p className="text-xs font-nav text-[#4B5563]">Active Certificates</p>
                  <p className="text-2xl font-bold text-[#1E3A8A] mt-1">
                    {metrics.activeCertificatesCount ?? 0}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#4B5563] mt-4">
                The NestJS PostgreSQL API is not currently reachable from this browser session. All
                website content editing in <strong>Live Visual Editor</strong> and{" "}
                <strong>All Fields</strong> continues to work and persists via Firebase/local
                storage.
              </p>
            )}

            {enquiries.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm text-left border-t border-[#E5E7EB]">
                  <thead>
                    <tr className="text-xs font-nav uppercase text-[#4B5563] border-b border-[#E5E7EB]">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Phone</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {enquiries.map((e) => (
                      <tr key={e.id}>
                        <td className="py-2.5 pr-4 font-semibold text-[#1E3A8A]">{e.fullName}</td>
                        <td className="py-2.5 pr-4">{e.email}</td>
                        <td className="py-2.5 pr-4">{e.phone}</td>
                        <td className="py-2.5">{e.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: ADMIN ID & PASSWORD */}
      {activeTab === "credentials" && (
        <div className="max-w-xl mx-auto px-4 py-12">
          <div className="bg-white border border-[#E5E7EB] border-t-4 border-t-[#1D4ED8] rounded-[15px] p-8 space-y-6 shadow-sm">
            <div>
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                ADMIN SECURITY
              </p>
              <h2 className="text-2xl font-bold text-[#1E3A8A] mt-1">
                Update Admin ID &amp; Password
              </h2>
              <p className="text-sm text-[#4B5563] mt-1">
                Change the administrator login ID and password for this portal.
              </p>
            </div>

            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1.5">
                  Admin ID / Email
                </label>
                <input
                  type="text"
                  required
                  value={newAdminId}
                  onChange={(e) => setNewAdminId(e.target.value)}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm rounded-[15px]"
                />
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm rounded-[15px]"
                />
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm rounded-[15px]"
                />
              </div>
              <button
                type="submit"
                className="btn-primary-amber w-full py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                Save New Credentials
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
