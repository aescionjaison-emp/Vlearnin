"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ShieldCheck } from "lucide-react";
import { VlearninLogo } from "@/components/VlearninLogo";
import { getApiUrl } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Invalid email or password");
        return;
      }
      router.push("/admin/dashboard");
    } catch {
      setError("Unable to reach authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-t-4 border-[#EA580C] shadow-2xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <VlearninLogo variant="dark" showTagline={false} />
          <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8] pt-2">
            ADMINISTRATOR PORTAL
          </p>
          <h1 className="text-2xl font-bold text-[#1E3A8A]">Sign In to Dashboard</h1>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
              Administrator Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vlearnin.com"
              className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Signing In..." : "Sign In Securely"}
          </button>
        </form>

        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-center gap-2 text-xs text-[#4B5563]">
          <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
          <span>Protected with Argon2 &amp; HTTP-Only Sessions</span>
        </div>
      </div>
    </div>
  );
}
