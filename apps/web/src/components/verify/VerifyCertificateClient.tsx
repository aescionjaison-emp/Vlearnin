"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Search, XCircle, AlertTriangle, CheckCircle2, Award } from "lucide-react";
import { getApiUrl } from "@/lib/api";

interface VerifyResult {
  found: boolean;
  status: "VALID" | "INVALID" | "REVOKED";
  message: string;
  certificate?: {
    certificateId: string;
    recipientName?: string;
    programmeTitle?: string;
    programmeDuration?: string;
    capstoneStatus?: string;
    grade?: string | null;
    issueDate?: string;
    issuingAuthority: string;
  };
}

export function VerifyCertificateClient({ initialTokenOrId }: { initialTokenOrId?: string }) {
  const [resolvedInitial] = useState(() => {
    if (initialTokenOrId && initialTokenOrId !== "sample") return initialTokenOrId;
    if (typeof window !== "undefined") {
      const match = window.location.pathname.match(/^\/verify-certificate\/([^/]+)/);
      if (match?.[1] && match[1] !== "sample") return decodeURIComponent(match[1]);
    }
    return "";
  });
  const [certInput, setCertInput] = useState(resolvedInitial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  useEffect(() => {
    if (!resolvedInitial) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          getApiUrl(`/certificates/public/${encodeURIComponent(resolvedInitial)}`),
        );
        const json = await res.json();
        if (!active) return;
        if (!res.ok) {
          setError(json.message || "Unable to verify credential.");
        } else {
          setResult(json);
        }
      } catch {
        if (active) setError("Verification service is temporarily unavailable.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [initialTokenOrId]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = certInput.trim();
    if (!cleaned) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(getApiUrl("/certificates/verify"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificateId: cleaned }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Unable to verify certificate ID.");
      } else {
        setResult(json);
      }
    } catch {
      setError("Unable to reach the verification server. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[70vh]">
      <section className="bg-[#1D4ED8] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Verify a VLEARNIN Certificate
          </h1>
          <p className="text-base text-white/80 mt-3 max-w-xl mx-auto">
            Enter the unique Certificate ID to verify authenticity instantly.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <form
            onSubmit={handleVerify}
            className="bg-[#F8FAFC] border border-[#E5E7EB] p-6 sm:p-8 space-y-4 shadow-xs rounded-[15px]"
          >
            <label
              htmlFor="certificate-id-input"
              className="block font-nav text-xs font-bold uppercase tracking-wider text-[#1D4ED8]"
            >
              Enter Certificate ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#4B5563] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="certificate-id-input"
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Example: VLN-2026-XXXX"
                  required
                  className="w-full bg-white border border-[#E5E7EB] pl-10 pr-4 py-3 text-sm uppercase tracking-wider focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold px-7 py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4" />
                {loading ? "Verifying..." : "Verify Credential"}
              </button>
            </div>
            <p className="text-xs text-[#4B5563]">
              Public verification displays only credential status and programme completion details.
              Private learner records are never exposed.
            </p>
          </form>

          {error && (
            <div className="p-5 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {result?.status === "VALID" && result.certificate && (
            <div className="border-2 border-emerald-600 bg-white p-7 shadow-md space-y-5 rounded-[15px]">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-nav text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Status: Verified Authentic Credential
                  </span>
                  <h2 className="text-2xl font-bold text-[#1D4ED8] mt-0.5">
                    {result.certificate.recipientName}
                  </h2>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Certificate ID
                  </dt>
                  <dd className="font-bold text-[#1D4ED8] mt-0.5">
                    {result.certificate.certificateId}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Programme Completed
                  </dt>
                  <dd className="font-bold text-[#1D4ED8] mt-0.5">
                    {result.certificate.programmeTitle}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Programme Duration
                  </dt>
                  <dd className="text-[#111827] mt-0.5">{result.certificate.programmeDuration}</dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Capstone / Grade
                  </dt>
                  <dd className="text-[#111827] mt-0.5">
                    {result.certificate.capstoneStatus}
                    {result.certificate.grade ? ` • ${result.certificate.grade}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Issue Date
                  </dt>
                  <dd className="text-[#111827] mt-0.5">
                    {result.certificate.issueDate
                      ? new Date(result.certificate.issueDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#4B5563]">
                    Issuing Authority
                  </dt>
                  <dd className="text-[#111827] mt-0.5 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#EA580C]" />
                    <span>{result.certificate.issuingAuthority}</span>
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {result?.status === "INVALID" && (
            <div className="border-2 border-red-300 bg-red-50 p-6 flex items-start gap-3 text-red-900 rounded-[15px]">
              <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-base">Credential Not Found</h2>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            </div>
          )}

          {result?.status === "REVOKED" && (
            <div className="border-2 border-amber-400 bg-amber-50 p-6 flex items-start gap-3 text-amber-950 rounded-[15px]">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-base">Revoked Credential</h2>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
