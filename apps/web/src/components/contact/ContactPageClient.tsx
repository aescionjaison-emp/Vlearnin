"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import {
  BATCH_TIMING_OPTIONS,
  BRAND,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  QUALIFICATION_OPTIONS,
  StudentEnquiryInput,
  StudentEnquirySchema,
  buildWhatsAppUrl,
} from "@vlearnin/shared";
import { submitEnquiryWithFallback } from "@/lib/enquiry-store";

const ALL_COURSE_COMBO_OPTIONS = [
  ...OFFICIAL_COURSES.map((c) => c.title),
  ...OFFICIAL_COMBOS.map((c) => `${c.title} (${c.durationLabel})`),
];

export function ContactPageClient() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentEnquiryInput>({
    resolver: zodResolver(StudentEnquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      qualification: "",
      interestedProgramme: ALL_COURSE_COMBO_OPTIONS[0],
      preferredBatch: "Weekend Only",
      sourcePage: "/contact",
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: StudentEnquiryInput) => {
    setServerError(null);
    const res = await submitEnquiryWithFallback("/enquiries/student", "student", data as unknown as Record<string, unknown>);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setSuccessRef(res.referenceCode);
  };

  const mapsQuery = encodeURIComponent(
    "VLEARNIN Academy, 6th Block, Rajajinagar, Bengaluru, Karnataka 560010",
  );

  return (
    <div className="bg-white">
      <section className="bg-[#1E3A8A] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl">
            Start Your Learning Journey with VLEARNIN
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-3 max-w-2xl">
            Visit our Rajajinagar campus, book a free demo class, or chat on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column — Verified Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-7 space-y-5 rounded-[15px]">
                <h2 className="text-2xl font-bold text-[#1E3A8A]">{BRAND.legalName}</h2>

                <div className="space-y-4 text-sm text-[#111827]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                    <p>{BRAND.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                    <a href={BRAND.phoneHref} className="font-semibold hover:text-[#1D4ED8]">
                      {BRAND.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                    <a href={`mailto:${BRAND.email}`} className="font-semibold hover:text-[#1D4ED8]">
                      {BRAND.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-[#E5E7EB]">
                    <Clock className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-nav text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                        Center Timings
                      </p>
                      <p>{BRAND.timings.weekdays}</p>
                      <p>{BRAND.timings.sunday}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={buildWhatsAppUrl("Hello VLEARNIN Academy, I would like to book a free demo class.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-navy px-5 py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#EA580C]" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-navy px-5 py-3 text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column — Student & Demo Inquiry Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] p-7 sm:p-9 shadow-sm rounded-[15px]">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
                Book a Free Demo Class or Request Fee Details
              </h2>
              <p className="text-sm text-[#4B5563] mb-6">
                Fill out the form below and our academic counselor will call you back with batch
                timings, fee structure, and brochure details.
              </p>

              {successRef ? (
                <div className="p-8 bg-[#F8FAFC] border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-[#1E3A8A]">Callback Request Confirmed</h3>
                  <p className="text-sm text-[#4B5563]">
                    Reference ID: <strong className="text-[#1E3A8A]">{successRef}</strong>. Our
                    team will reach out shortly.
                  </p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        {...register("fullName")}
                        className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                      />
                      {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        {...register("phone")}
                        className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-qual" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                        Current Qualification / Status *
                      </label>
                      <select
                        id="contact-qual"
                        {...register("qualification")}
                        className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                      >
                        <option value="">Select qualification</option>
                        {QUALIFICATION_OPTIONS.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      {errors.qualification && <p className="text-xs text-red-600 mt-1">{errors.qualification.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-batch" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                        Preferred Batch Timing
                      </label>
                      <select
                        id="contact-batch"
                        {...register("preferredBatch")}
                        className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                      >
                        {BATCH_TIMING_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-programme" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Course or Combo Interested In
                    </label>
                    <select
                      id="contact-programme"
                      {...register("interestedProgramme")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    >
                      {ALL_COURSE_COMBO_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Email (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register("email")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                    <input type="checkbox" {...register("consent")} className="mt-0.5 accent-[#1E3A8A]" />
                    <span>
                      I consent to VLEARNIN Academy contacting me regarding my enquiry, demo session,
                      and fee details.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-amber w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Request Callback & Brochure"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Google Map Embed using Verified Business Location */}
          <div className="border border-[#E5E7EB] overflow-hidden h-[360px] bg-[#F8FAFC] rounded-[15px]">
            <iframe
              title="VLEARNIN Academy Rajajinagar Bengaluru Location Map"
              src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
