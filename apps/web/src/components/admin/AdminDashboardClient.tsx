"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Building2,
  Briefcase,
  ClipboardList,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  RefreshCw,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import { getApiUrl } from "@/lib/api";
import { VlearninLogo } from "@/components/VlearninLogo";

type TabId =
  | "overview"
  | "courses"
  | "enquiries"
  | "students"
  | "certificates"
  | "settings"
  | "audit";

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)vlearnin_csrf_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export function AdminDashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [courses, setCourses] = useState<any[]>([]);
  const [enquiryType, setEnquiryType] = useState("student");
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Student & Certificate creation state
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPhone, setNewStudentPhone] = useState("");
  const [certStudentId, setCertStudentId] = useState("");
  const [certCourseId, setCertCourseId] = useState("");
  const [certGrade, setCertGrade] = useState("");

  const apiFetch = useCallback(async (path: string, init?: RequestInit) => {
    const method = (init?.method || "GET").toUpperCase();
    const headers: Record<string, string> = {
      ...(init?.headers as Record<string, string>),
    };
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
      headers["X-CSRF-Token"] = getCsrfToken();
    }
    const res = await fetch(getApiUrl(path), {
      ...init,
      headers,
      credentials: "include",
    });
    if (res.status === 401) {
      router.push("/admin/login");
      throw new Error("Unauthorized");
    }
    return res;
  }, [router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await apiFetch("/auth/me");
      if (!meRes.ok) {
        router.push("/admin/login");
        return;
      }
      const meData = await meRes.json();
      setUser(meData.user);

      const [dashRes, coursesRes, enqRes, stuRes, certRes, setRes, logRes] =
        await Promise.all([
          apiFetch("/admin/dashboard"),
          apiFetch("/admin/courses"),
          apiFetch(`/admin/enquiries?type=${enquiryType}`),
          apiFetch("/admin/students"),
          apiFetch("/admin/certificates"),
          apiFetch("/admin/settings"),
          apiFetch("/admin/audit-logs"),
        ]);

      if (dashRes.ok) setMetrics((await dashRes.json()).metrics || {});
      if (coursesRes.ok) setCourses((await coursesRes.json()).courses || []);
      if (enqRes.ok) setEnquiries((await enqRes.json()).items || []);
      if (stuRes.ok) setStudents((await stuRes.json()).students || []);
      if (certRes.ok) setCertificates((await certRes.json()).certificates || []);
      if (setRes.ok) setSettings((await setRes.json()).settings || null);
      if (logRes.ok) setAuditLogs((await logRes.json()).logs || []);
    } catch {
      // handled by redirect
    } finally {
      setLoading(false);
    }
  }, [apiFetch, enquiryType, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleUpdateCourseStatus = async (id: string, status: string) => {
    const res = await apiFetch(`/admin/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setFeedback("Course status updated.");
      loadData();
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    const res = await apiFetch(`/admin/enquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ type: enquiryType, status }),
    });
    if (res.ok) {
      setFeedback("Enquiry status updated.");
      loadData();
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetch("/admin/students", {
      method: "POST",
      body: JSON.stringify({
        fullName: newStudentName,
        email: newStudentEmail,
        phone: newStudentPhone,
      }),
    });
    if (res.ok) {
      setNewStudentName("");
      setNewStudentEmail("");
      setNewStudentPhone("");
      setFeedback("Student registered.");
      loadData();
    }
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetch("/admin/certificates", {
      method: "POST",
      body: JSON.stringify({
        studentId: certStudentId,
        courseId: certCourseId,
        grade: certGrade || undefined,
      }),
    });
    if (res.ok) {
      setCertGrade("");
      setFeedback("Certificate issued with unique ID and QR verification token.");
      loadData();
    }
  };

  const handleRevokeCertificate = async (id: string) => {
    const res = await apiFetch(`/admin/certificates/${id}/revoke`, {
      method: "POST",
      body: JSON.stringify({ reason: "Revoked via Admin Dashboard" }),
    });
    if (res.ok) {
      setFeedback("Certificate revoked.");
      loadData();
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    const res = await apiFetch("/admin/settings", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      setFeedback("Site settings saved.");
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center text-sm text-[#667085]">
        Loading VLEARNIN Administrator Dashboard...
      </div>
    );
  }

  const navItems: { id: TabId; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "enquiries", label: "Enquiries", icon: ClipboardList },
    { id: "students", label: "Students", icon: Users },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "settings", label: "Site Settings", icon: Settings },
    { id: "audit", label: "Audit Logs", icon: ShieldAlert },
  ];

  const apiRoot = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/api$/, "");

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#071B3D] text-white shrink-0 flex flex-col justify-between">
        <div>
          <div className="p-5 border-b border-white/15">
            <VlearninLogo variant="light" compact showTagline={false} />
            <p className="font-nav text-[10px] uppercase tracking-[0.18em] text-[#D4A54A] mt-2">
              Admin Console
            </p>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-nav font-semibold transition-colors ${
                    active
                      ? "bg-[#D4A54A] text-[#071B3D]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/15 space-y-3">
          {user && (
            <div className="text-xs text-white/75">
              <p className="font-bold text-white">{user.name}</p>
              <p className="truncate">{user.email}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 text-center border border-white/30 py-2 text-xs font-nav hover:bg-white/10"
            >
              Public Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-600/90 hover:bg-red-600 py-2 text-xs font-nav"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 space-y-6 overflow-x-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#071B3D] capitalize">
            {activeTab}
          </h1>
          <button
            type="button"
            onClick={loadData}
            className="btn-outline-navy px-4 py-2 text-xs inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {feedback && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center justify-between">
            <span>{feedback}</span>
            <button type="button" onClick={() => setFeedback(null)} className="text-xs underline">
              Dismiss
            </button>
          </div>
        )}

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Student Enquiries", val: metrics.totalStudentEnquiries ?? 0, icon: ClipboardList },
              { label: "New Enquiries", val: metrics.newStudentEnquiries ?? 0, icon: FileText },
              { label: "Demo Bookings", val: metrics.demoBookingsCount ?? 0, icon: BookOpen },
              { label: "Brochure Requests", val: metrics.brochureRequestsCount ?? 0, icon: Download },
              { label: "Institutional Enquiries", val: metrics.institutionalEnquiriesCount ?? 0, icon: Building2 },
              { label: "Employer Requests", val: metrics.employerRequestsCount ?? 0, icon: Briefcase },
              { label: "Published Courses", val: metrics.publishedCoursesCount ?? 0, icon: BookOpen },
              { label: "Active Certificates", val: metrics.activeCertificatesCount ?? 0, icon: Award },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="bg-white border border-[#DFE5EE] p-5">
                  <div className="flex items-center justify-between text-[#667085] mb-2">
                    <span className="font-nav text-xs font-semibold uppercase tracking-wider">
                      {m.label}
                    </span>
                    <Icon className="w-4 h-4 text-[#D4A54A]" />
                  </div>
                  <p className="font-editorial text-3xl font-bold text-[#071B3D]">{m.val}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <div className="bg-white border border-[#DFE5EE] overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#071B3D] text-white font-nav text-xs uppercase">
                <tr>
                  <th className="p-4">Programme</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Modules</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE5EE]">
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td className="p-4 font-bold text-[#071B3D]">{c.title}</td>
                    <td className="p-4 text-[#667085]">{c.category?.shortName}</td>
                    <td className="p-4">{c.modules?.length ?? 5}</td>
                    <td className="p-4">
                      <span className="font-nav text-xs font-bold px-2.5 py-1 bg-[#F4F7FC] border border-[#DFE5EE]">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      {c.status !== "PUBLISHED" ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateCourseStatus(c.id, "PUBLISHED")}
                          className="btn-navy px-3 py-1.5 text-xs"
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateCourseStatus(c.id, "DRAFT")}
                          className="btn-outline-navy px-3 py-1.5 text-xs"
                        >
                          Unpublish
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {["student", "demo", "brochure", "institutional", "employer"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEnquiryType(t)}
                    className={`font-nav text-xs font-semibold px-4 py-2 border capitalize ${
                      enquiryType === t
                        ? "bg-[#071B3D] text-white border-[#071B3D]"
                        : "bg-white text-[#101828] border-[#DFE5EE]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <a
                href={`${apiRoot}/api/admin/enquiries/export/csv`}
                className="btn-navy px-4 py-2 text-xs inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </a>
            </div>

            <div className="bg-white border border-[#DFE5EE] overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#071B3D] text-white font-nav text-xs uppercase">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Name / Org</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE5EE]">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-[#667085]">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e.id}>
                        <td className="p-4 font-nav text-xs font-bold text-[#1746A2]">
                          {e.referenceCode}
                        </td>
                        <td className="p-4 font-semibold text-[#071B3D]">
                          {e.fullName || e.institutionName || e.companyName}
                        </td>
                        <td className="p-4 text-[#667085]">{e.phone || e.officialEmail}</td>
                        <td className="p-4 font-nav text-xs font-bold">{e.status}</td>
                        <td className="p-4">
                          <select
                            value={e.status}
                            onChange={(ev) => handleUpdateEnquiryStatus(e.id, ev.target.value)}
                            className="border border-[#DFE5EE] px-2 py-1 text-xs bg-white"
                          >
                            {["NEW", "CONTACTED", "DEMO_SCHEDULED", "FOLLOW_UP", "ENROLLED", "CLOSED"].map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <form onSubmit={handleCreateStudent} className="bg-white border border-[#DFE5EE] p-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Full Name *</label>
                <input
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Phone</label>
                <input
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
              <button type="submit" className="btn-gold py-2.5 px-4 text-xs inline-flex items-center justify-center gap-1.5">
                <Plus className="w-4 h-4" /> Register Student
              </button>
            </form>

            <div className="bg-white border border-[#DFE5EE] overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#071B3D] text-white font-nav text-xs uppercase">
                  <tr>
                    <th className="p-4">Student Code</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE5EE]">
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td className="p-4 font-nav text-xs font-bold text-[#1746A2]">{s.studentCode}</td>
                      <td className="p-4 font-semibold">{s.fullName}</td>
                      <td className="p-4 text-[#667085]">{s.email || "—"}</td>
                      <td className="p-4 text-[#667085]">{s.phone || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CERTIFICATES */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <form onSubmit={handleIssueCertificate} className="bg-white border border-[#DFE5EE] p-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Student *</label>
                <select
                  required
                  value={certStudentId}
                  onChange={(e) => setCertStudentId(e.target.value)}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm bg-white"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.studentCode})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Programme *</label>
                <select
                  required
                  value={certCourseId}
                  onChange={(e) => setCertCourseId(e.target.value)}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm bg-white"
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Grade (Optional)</label>
                <input
                  value={certGrade}
                  onChange={(e) => setCertGrade(e.target.value)}
                  placeholder="e.g., Distinction"
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
              <button type="submit" className="btn-gold py-2.5 px-4 text-xs">
                Issue Certificate
              </button>
            </form>

            <div className="bg-white border border-[#DFE5EE] overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#071B3D] text-white font-nav text-xs uppercase">
                  <tr>
                    <th className="p-4">Certificate ID</th>
                    <th className="p-4">Recipient</th>
                    <th className="p-4">Programme</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFE5EE]">
                  {certificates.map((cert) => (
                    <tr key={cert.id}>
                      <td className="p-4 font-nav text-xs font-bold text-[#1746A2]">{cert.certificateId}</td>
                      <td className="p-4 font-semibold">{cert.recipientName}</td>
                      <td className="p-4 text-[#667085]">{cert.programmeTitle}</td>
                      <td className="p-4 font-nav text-xs font-bold">{cert.status}</td>
                      <td className="p-4 flex flex-wrap gap-2">
                        <a
                          href={`${apiRoot}/api/admin/certificates/${cert.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-navy px-3 py-1.5 text-xs"
                        >
                          PDF
                        </a>
                        <Link
                          href={`/verify-certificate/${cert.verificationToken}`}
                          target="_blank"
                          className="btn-outline-navy px-3 py-1.5 text-xs"
                        >
                          Verify URL
                        </Link>
                        {cert.status === "ACTIVE" && (
                          <button
                            type="button"
                            onClick={() => handleRevokeCertificate(cert.id)}
                            className="bg-red-600 text-white px-3 py-1.5 text-xs font-nav"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && settings && (
          <form onSubmit={handleSaveSettings} className="bg-white border border-[#DFE5EE] p-6 space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-nav font-semibold uppercase mb-1">Institution Name</label>
              <input
                value={settings.institutionName || ""}
                onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-nav font-semibold uppercase mb-1">Address</label>
              <input
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Phone</label>
                <input
                  value={settings.phone || ""}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-nav font-semibold uppercase mb-1">Email</label>
                <input
                  value={settings.email || ""}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full border border-[#DFE5EE] px-3 py-2 text-sm"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(settings.showEmployerTurnaroundClaim)}
                onChange={(e) => setSettings({ ...settings, showEmployerTurnaroundClaim: e.target.checked })}
              />
              <span>Display 48-hour employer turnaround claim on Hire From VLEARNIN page</span>
            </label>
            <button type="submit" className="btn-gold px-6 py-2.5 text-xs uppercase tracking-wider">
              Save Settings
            </button>
          </form>
        )}

        {/* AUDIT LOGS */}
        {activeTab === "audit" && (
          <div className="bg-white border border-[#DFE5EE] overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#071B3D] text-white font-nav text-xs uppercase">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFE5EE]">
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="p-4 text-xs text-[#667085]">
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 font-semibold">{log.actor?.email || "System"}</td>
                    <td className="p-4 font-nav text-xs font-bold text-[#1746A2]">{log.action}</td>
                    <td className="p-4 text-xs">{log.entityType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
