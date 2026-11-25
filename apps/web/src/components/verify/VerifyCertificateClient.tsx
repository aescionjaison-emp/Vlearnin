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
  const [certInput, setCertInput] = useState(initialTokenOrId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  useEffect(() => {
    if (!initialTokenOrId) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          getApiUrl(`/certificates/public/${encodeURIComponent(initialTokenOrId)}`),
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
      <section className="bg-[#071B3D] text-white py-16 border-b-4 border-[#D4A54A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#D4A54A]">
            CREDENTIAL AUTHENTICATION
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Verify a VLEARNIN Certificate
          </h1>
          <p className="text-base text-white/80 mt-4 max-w-2xl mx-auto">
            Employers, universities and institutions can verify the authenticity of certificates
            issued by VLEARNIN using the unique Certificate ID printed on the document.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <form
            onSubmit={handleVerify}
            className="bg-[#F4F7FC] border border-[#DFE5EE] p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <label
              htmlFor="certificate-id-input"
              className="block font-nav text-xs font-bold uppercase tracking-wider text-[#071B3D]"
            >
              Enter Certificate ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="certificate-id-input"
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Example: VLN-2026-XXXX"
                  required
                  className="w-full bg-white border border-[#DFE5EE] pl-10 pr-4 py-3 text-sm uppercase tracking-wider focus:outline-none focus:border-[#1746A2]"
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
            <p className="text-xs text-[#667085]">
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
            <div className="border-2 border-emerald-600 bg-white p-7 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#DFE5EE]">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-nav text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Status: Verified Authentic Credential
                  </span>
                  <h2 className="text-2xl font-bold text-[#071B3D] mt-0.5">
                    {result.certificate.recipientName}
                  </h2>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Certificate ID
                  </dt>
                  <dd className="font-bold text-[#071B3D] mt-0.5">
                    {result.certificate.certificateId}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Programme Completed
                  </dt>
                  <dd className="font-bold text-[#1746A2] mt-0.5">
                    {result.certificate.programmeTitle}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Programme Duration
                  </dt>
                  <dd className="text-[#101828] mt-0.5">{result.certificate.programmeDuration}</dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Capstone / Grade
                  </dt>
                  <dd className="text-[#101828] mt-0.5">
                    {result.certificate.capstoneStatus}
                    {result.certificate.grade ? ` • ${result.certificate.grade}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Issue Date
                  </dt>
                  <dd className="text-[#101828] mt-0.5">
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
                  <dt className="font-nav text-xs uppercase tracking-wider text-[#667085]">
                    Issuing Authority
                  </dt>
                  <dd className="text-[#101828] mt-0.5 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D4A54A]" />
                    <span>{result.certificate.issuingAuthority}</span>
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {result?.status === "INVALID" && (
            <div className="border-2 border-red-300 bg-red-50 p-6 flex items-start gap-3 text-red-900">
              <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-base">Credential Not Found</h2>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            </div>
          )}

          {result?.status === "REVOKED" && (
            <div className="border-2 border-amber-400 bg-amber-50 p-6 flex items-start gap-3 text-amber-950">
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
