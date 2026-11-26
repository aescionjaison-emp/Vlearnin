"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ShieldCheck, KeyRound } from "lucide-react";
import { VlearninLogo } from "@/components/VlearninLogo";
import { authenticateAdmin, getAdminSession } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAdminSession()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authenticateAdmin(adminId, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin/dashboard");
    } catch {
      setError("Unable to verify administrator credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Matching Public Brand Header Strip */}
      <div className="bg-[#1E3A8A] text-white border-b-4 border-[#EA580C]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
          <VlearninLogo variant="light" showTagline={false} />
          <span className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#93C5FD]">
            Restricted Admin Portal
          </span>
        </div>
      </div>

      {/* Login Card matching Public UI */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white border border-[#E5E7EB] border-t-4 border-t-[#1D4ED8] shadow-xl p-8 space-y-6 rounded-[15px]">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-[15px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1E3A8A]">
              <KeyRound className="w-6 h-6" />
            </div>
            <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8] pt-1">
              ADMINISTRATOR ACCESS
            </p>
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Sign In to Website Studio
            </h1>
            <p className="text-sm text-[#4B5563]">
              Edit every text, image, course, and section of VLEARNIN live.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2 rounded-[15px]">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-id"
                className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1.5"
              >
                Admin ID / Email
              </label>
              <input
                id="admin-id"
                type="text"
                required
                autoComplete="username"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="admin@vlearnin.com"
                className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter administrator password"
                className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-amber w-full py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Verifying..." : "Sign In to Admin Studio"}
            </button>
          </form>

          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-center gap-2 text-xs text-[#4B5563]">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>Protected Admin Session • Direct Access Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
