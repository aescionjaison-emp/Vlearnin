"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { X, CheckCircle2, Download, Calendar, MessageCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BATCH_TIMING_OPTIONS,
  BRAND,
  BrochureRequestInput,
  BrochureRequestSchema,
  DemoBookingInput,
  DemoBookingSchema,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  QUALIFICATION_OPTIONS,
  buildWhatsAppUrl,
} from "@vlearnin/shared";
import { submitEnquiryWithFallback } from "@/lib/enquiry-store";

type ModalMode = "demo" | "brochure" | null;

interface OpenDemoOptions {
  preselectedProgramme?: string;
  sourcePage?: string;
}

interface OpenBrochureOptions {
  preselectedProgramme?: string;
  brochureType?: "complete" | "course" | "combo" | "academic";
  brochureSlug?: string;
}

interface LeadModalContextValue {
  openDemoModal: (opts?: OpenDemoOptions) => void;
  openBrochureModal: (opts?: OpenBrochureOptions) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside LeadModalProvider");
  }
  return ctx;
}

const ALL_PROGRAMME_OPTIONS = [
  ...OFFICIAL_COURSES.map((c) => c.title),
  ...OFFICIAL_COMBOS.map((c) => `${c.title} (${c.durationLabel})`),
];

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ModalMode>(null);
  const [demoOpts, setDemoOpts] = useState<OpenDemoOptions>({});
  const [brochureOpts, setBrochureOpts] = useState<OpenBrochureOptions>({});

  const openDemoModal = useCallback((opts?: OpenDemoOptions) => {
    setDemoOpts(opts || {});
    setMode("demo");
  }, []);

  const openBrochureModal = useCallback((opts?: OpenBrochureOptions) => {
    setBrochureOpts(opts || {});
    setMode("brochure");
  }, []);

  const closeModal = useCallback(() => {
    setMode(null);
  }, []);

  return (
    <LeadModalContext.Provider value={{ openDemoModal, openBrochureModal, closeModal }}>
      {children}
      {mode === "demo" && (
        <DemoModal
          preselectedProgramme={demoOpts.preselectedProgramme}
          sourcePage={demoOpts.sourcePage}
          onClose={closeModal}
        />
      )}
      {mode === "brochure" && (
        <BrochureModal
          preselectedProgramme={brochureOpts.preselectedProgramme}
          brochureType={brochureOpts.brochureType || "complete"}
          brochureSlug={brochureOpts.brochureSlug}
          onClose={closeModal}
        />
      )}
    </LeadModalContext.Provider>
  );
}

function DemoModal({
  preselectedProgramme,
  sourcePage,
  onClose,
}: {
  preselectedProgramme?: string;
  sourcePage?: string;
  onClose: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemoBookingInput>({
    resolver: zodResolver(DemoBookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      qualification: "",
      interestedProgramme: preselectedProgramme || ALL_PROGRAMME_OPTIONS[0],
      preferredBatch: "Weekend Only",
      sourcePage: sourcePage || "modal",
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const selectedProgramme = watch("interestedProgramme");

  const onSubmit = async (data: DemoBookingInput) => {
    setServerError(null);
    const res = await submitEnquiryWithFallback("/enquiries/demo", "demo", data as unknown as Record<string, unknown>);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setSuccessRef(res.referenceCode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D4ED8]/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto rounded-[15px]">
        <div className="bg-[#1D4ED8] text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-nav text-[11px] uppercase tracking-[0.18em] text-[#93C5FD] font-semibold">
              VLEARNIN Academy • Rajajinagar
            </p>
            <h2 id="demo-modal-title" className="text-xl sm:text-2xl font-bold mt-1">
              Book a Free Demo Class
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo booking modal"
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {successRef ? (
            <div className="text-center py-4 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-[#1D4ED8]">Demo Request Confirmed</h3>
              <p className="text-sm text-[#4B5563]">
                Reference ID: <strong className="text-[#1D4ED8]">{successRef}</strong>. Our
                admissions counselor will contact you shortly to confirm your slot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={buildWhatsAppUrl(
                    `Hello VLEARNIN, I just booked a Free Demo Class (Ref: ${successRef}) for ${selectedProgramme}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-navy px-5 py-2.5 text-sm inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-outline-navy px-5 py-2.5 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div>
                <label htmlFor="demo-fullName" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Full Name *
                </label>
                <input
                  id="demo-fullName"
                  type="text"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-phone" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+91 98XXXXXXXX"
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="demo-qualification" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Qualification *
                  </label>
                  <select
                    id="demo-qualification"
                    {...register("qualification")}
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  >
                    <option value="">Select qualification</option>
                    {QUALIFICATION_OPTIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                  {errors.qualification && <p className="text-xs text-red-600 mt-1">{errors.qualification.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="demo-programme" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Course or Combo Interested In *
                </label>
                <select
                  id="demo-programme"
                  {...register("interestedProgramme")}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                >
                  {ALL_PROGRAMME_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-batch" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Preferred Batch Timing *
                  </label>
                  <select
                    id="demo-batch"
                    {...register("preferredBatch")}
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  >
                    {BATCH_TIMING_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="demo-email" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Email (Optional)
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-0.5 accent-[#1D4ED8]"
                />
                <span>
                  I consent to VLEARNIN Academy contacting me via phone, WhatsApp, or email regarding demo sessions, fee details, and programme updates.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-amber w-full py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Confirm Free Demo Class"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function BrochureModal({
  preselectedProgramme,
  brochureType,
  brochureSlug,
  onClose,
}: {
  preselectedProgramme?: string;
  brochureType: "complete" | "course" | "combo" | "academic";
  brochureSlug?: string;
  onClose: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrochureRequestInput>({
    resolver: zodResolver(BrochureRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      qualification: "",
      interestedProgramme: preselectedProgramme || "",
      brochureType,
      brochureSlug,
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: BrochureRequestInput) => {
    setServerError(null);
    const res = await submitEnquiryWithFallback("/enquiries/brochure", "brochure", data as unknown as Record<string, unknown>);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    if (res.downloadUrl) {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/api$/, "");
      setDownloadUrl(`${apiBase}${res.downloadUrl}`);
    } else {
      setDownloadUrl(buildWhatsAppUrl(`Hello VLEARNIN Academy, I have requested the brochure (${res.referenceCode}) for ${data.interestedProgramme || "All Programmes"}.`));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D4ED8]/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      <div className="relative w-full max-w-md bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden rounded-[15px]">
        <div className="bg-[#1D4ED8] text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-nav text-[11px] uppercase tracking-[0.18em] text-[#93C5FD] font-semibold">
              Official PDF Brochure
            </p>
            <h2 id="brochure-modal-title" className="text-xl font-bold mt-1">
              Download VLEARNIN Brochure
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close brochure modal"
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {downloadUrl ? (
            <div className="text-center py-3 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#1D4ED8]">Your Brochure Is Ready</h3>
              <p className="text-sm text-[#4B5563]">
                Click below to download the official VLEARNIN PDF brochure.
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-3 text-sm inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF Brochure
              </a>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline-navy w-full py-2.5 text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                  {serverError}
                </div>
              )}

              <div>
                <label htmlFor="bro-name" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Full Name *
                </label>
                <input
                  id="bro-name"
                  type="text"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="bro-phone" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  id="bro-phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+91 98XXXXXXXX"
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="bro-qual" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Qualification *
                </label>
                <select
                  id="bro-qual"
                  {...register("qualification")}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                >
                  <option value="">Select qualification</option>
                  {QUALIFICATION_OPTIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                {errors.qualification && <p className="text-xs text-red-600 mt-1">{errors.qualification.message}</p>}
              </div>

              <div>
                <label htmlFor="bro-prog" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                  Interested Programme (Optional)
                </label>
                <select
                  id="bro-prog"
                  {...register("interestedProgramme")}
                  className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                >
                  <option value="">All Programmes</option>
                  {ALL_PROGRAMME_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                <input type="checkbox" {...register("consent")} className="mt-0.5 accent-[#1D4ED8]" />
                <span>
                  I consent to receive the requested VLEARNIN brochure PDF and admissions follow-up via phone or WhatsApp.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-amber w-full py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {isSubmitting ? "Preparing PDF..." : "Unlock & Download Brochure"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
