"use client";

import React, { useRef, useState } from "react";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Download,
  Building2,
  AlertCircle,
  Send,
  GraduationCap,
} from "lucide-react";
import {
  BATCH_SIZE_OPTIONS,
  INSTITUTIONAL_DESIGNATIONS,
  InstitutionalEnquiryInput,
  InstitutionalEnquirySchema,
  OFFICIAL_COURSES,
} from "@vlearnin/shared";
import { submitEnquiryWithFallback } from "@/lib/enquiry-store";

const PORTFOLIO_ROWS = [
  {
    programme: "AI Tools for Commerce & Business",
    duration: "30 Hours",
    streams: "B.Com, BBA, M.Com, MBA",
    skillArea: "AI-enabled productivity, research and reporting",
  },
  {
    programme: "Data Visualization Using Power BI",
    duration: "30 Hours",
    streams: "B.Com, BBA, BCA, B.Sc, MBA",
    skillArea: "Business intelligence, Power Query, DAX and dashboards",
  },
  {
    programme: "Financial Modelling for Business",
    duration: "30 Hours",
    streams: "B.Com Finance/Accounting, BBA, MBA, M.Com",
    skillArea: "Financial forecasting, valuation and corporate models",
  },
  {
    programme: "Investment Banking Professional",
    duration: "30 Hours",
    streams: "MBA, M.Com, Finance Specializations",
    skillArea: "Capital markets, M&A and deal structuring",
  },
  {
    programme: "AI-Powered Digital Marketing",
    duration: "30 Hours",
    streams: "BBA, B.Com, BCA, BA, MBA",
    skillArea: "SEO, Google and Meta ads, GA4 and AI campaigns",
  },
  {
    programme: "Social Media Marketing & Content Creation",
    duration: "30 Hours",
    streams: "All Undergraduate and Postgraduate Streams",
    skillArea: "Brand storytelling, Canva design and social growth",
  },
  {
    programme: "Video Editing & Reels Production",
    duration: "30 Hours",
    streams: "Journalism, Mass Communication, BBA, BCA and Creators",
    skillArea: "Commercial video editing, sound design and short-form media",
  },
];

const DELIVERY_STEPS = [
  {
    step: "Step 1",
    title: "Curriculum Consultation",
    desc: "Align programme selection, batch size and academic calendar with institutional leadership.",
  },
  {
    step: "Step 2",
    title: "Programme Orientation",
    desc: "Introduce industry demand, software requirements and career pathways.",
  },
  {
    step: "Step 3",
    title: "Hands-On Classroom & Lab Sessions",
    desc: "Deliver 30 hours of practical instructor-led training with guided exercises and live datasets.",
  },
  {
    step: "Step 4",
    title: "Assignments & Case Studies",
    desc: "Reinforce learning through practical problem solving.",
  },
  {
    step: "Step 5",
    title: "Capstone Project & Practical Assessment",
    desc: "Final hands-on project presentation and evaluation.",
  },
  {
    step: "Step 6",
    title: "Certification & Career Readiness",
    desc: "Issue QR-verified certificates alongside resume and portfolio guidance.",
  },
];

const PROGRAMME_OPTIONS = [
  ...OFFICIAL_COURSES.map((c) => c.title),
  "Custom Workshop",
];

export function AcademicPartnershipsClient() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InstitutionalEnquiryInput>({
    resolver: zodResolver(InstitutionalEnquirySchema),
    defaultValues: {
      fullName: "",
      designation: "",
      institutionName: "",
      cityArea: "",
      officialEmail: "",
      phone: "",
      interestedProgrammes: [],
      estimatedBatchSize: "30–50",
      message: "",
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const selectedProgrammes = watch("interestedProgrammes") || [];

  const toggleProgramme = (prog: string) => {
    const exists = selectedProgrammes.includes(prog);
    const updated = exists
      ? selectedProgrammes.filter((p) => p !== prog)
      : [...selectedProgrammes, prog];
    setValue("interestedProgrammes", updated, { shouldValidate: true });
  };

  useStaggerReveal(timelineRef, ".timeline-step", "cardReveal", 0.08);

  const onSubmit = async (data: InstitutionalEnquiryInput) => {
    setServerError(null);
    const res = await submitEnquiryWithFallback("/enquiries/institutional", "institutional", data as unknown as Record<string, unknown>);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setSuccessRef(res.referenceCode);
  };

  const apiRoot = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/api$/, "");

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1D4ED8] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
            Empowering Colleges to Build Industry-Ready Graduates
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-3 max-w-2xl leading-relaxed">
            30-hour value-added certifications delivered on campus across Karnataka.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#institutional-form"
              className="btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Request Institutional Proposal
            </a>
            <a
              href={`${apiRoot}/api/brochures/academic`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/60 hover:bg-white hover:text-[#1D4ED8] text-white font-nav font-semibold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors rounded-[15px]"
            >
              <Download className="w-4 h-4" />
              Download Academic Brochure PDF
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Bridging the Campus-to-Corporate Gap */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-bold text-[#1D4ED8]">
              Bridging the Campus-to-Corporate Gap
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              We partner with college leadership, HODs, and placement cells to build practical tool
              mastery and job-ready project portfolios on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "NEP & Add-On Course Alignment",
                desc: "Modular 30-hour certification structures designed to fit semester schedules, skill-enhancement electives or pre-placement bootcamps.",
              },
              {
                title: "Practical, Capstone-Driven Delivery",
                desc: "Guided lab exercises, business case studies, assignments and an evaluated capstone project.",
              },
              {
                title: "Flexible Infrastructure Requirements",
                desc: "Delivery through college computer labs or hybrid live-instructor sessions.",
              },
              {
                title: "QR-Verified Dual-Branded Certification",
                desc: "Verifiable certificates upon meeting attendance and assessment criteria, with dual branding where agreed by the institution.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white border border-[#E5E7EB] p-6 border-t-4 border-t-[#1D4ED8] rounded-[15px]">
                <GraduationCap className="w-6 h-6 text-[#EA580C] mb-3" />
                <h3 className="text-lg font-bold text-[#1D4ED8] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Institutional Certification Portfolio */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
              CURRICULUM MATRIX
            </p>
            <h2 className="text-3xl font-bold text-[#1D4ED8] mt-1">
              Institutional Certification Portfolio
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-[#E5E7EB] rounded-[15px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1D4ED8] text-white font-nav text-xs uppercase tracking-wider">
                  <th className="py-4 px-5">Programme</th>
                  <th className="py-4 px-5">Duration</th>
                  <th className="py-4 px-5">Target Student Streams</th>
                  <th className="py-4 px-5">Core Industry Skill Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-sm">
                {PORTFOLIO_ROWS.map((row, idx) => (
                  <tr
                    key={row.programme}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]/60"}
                  >
                    <td className="py-4 px-5 font-bold text-[#1D4ED8]">{row.programme}</td>
                    <td className="py-4 px-5 font-nav font-semibold text-[#1D4ED8] whitespace-nowrap">
                      {row.duration}
                    </td>
                    <td className="py-4 px-5 text-[#111827]">{row.streams}</td>
                    <td className="py-4 px-5 text-[#4B5563]">{row.skillArea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-4">
            {PORTFOLIO_ROWS.map((row) => (
              <div key={row.programme} className="border border-[#E5E7EB] p-5 bg-[#F8FAFC] space-y-2 rounded-[15px]">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-[#1D4ED8] text-base">{row.programme}</h3>
                  <span className="font-nav text-xs font-bold bg-[#1D4ED8] text-[#93C5FD] px-2.5 py-1 shrink-0 rounded-[8px]">
                    {row.duration}
                  </span>
                </div>
                <p className="text-xs text-[#111827]">
                  <strong>Streams:</strong> {row.streams}
                </p>
                <p className="text-xs text-[#4B5563]">
                  <strong>Skill Area:</strong> {row.skillArea}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Six-Step Academic Delivery Framework */}
      <section ref={timelineRef} className="py-16 bg-[#1D4ED8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Structured Implementation from Orientation to Certification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DELIVERY_STEPS.map((s) => (
              <div
                key={s.step}
                className="timeline-step bg-[#1E40AF] border border-white/15 border-t-4 border-t-[#3B82F6] p-6 space-y-2.5 rounded-[15px]"
              >
                <span className="font-nav text-xs font-bold uppercase tracking-widest text-[#93C5FD]">
                  {s.step}
                </span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Institutional Partnership Inquiry Form */}
      <section id="institutional-form" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E5E7EB] shadow-md p-6 sm:p-10 rounded-[15px]">
            <div className="mb-8">
              <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
                CAMPUS COLLABORATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D4ED8] mt-1">
                Invite VLEARNIN for an Institutional Presentation
              </h2>
              <p className="text-sm text-[#4B5563] mt-2">
                Share your institution&apos;s details below, and our Academic Partnerships team will
                connect with you to customize a programme proposal.
              </p>
            </div>

            {successRef ? (
              <div className="p-8 bg-[#F8FAFC] border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#1D4ED8]">
                  Institutional Proposal Request Received
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Reference ID: <strong className="text-[#1D4ED8]">{successRef}</strong>. Our
                  Academic Partnerships team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

                {serverError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="inst-fullName" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="inst-fullName"
                      type="text"
                      {...register("fullName")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="inst-designation" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      Designation *
                    </label>
                    <select
                      id="inst-designation"
                      {...register("designation")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    >
                      <option value="">Select designation</option>
                      {INSTITUTIONAL_DESIGNATIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.designation && <p className="text-xs text-red-600 mt-1">{errors.designation.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="inst-name" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      College / Institution Name *
                    </label>
                    <input
                      id="inst-name"
                      type="text"
                      {...register("institutionName")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.institutionName && <p className="text-xs text-red-600 mt-1">{errors.institutionName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="inst-city" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      City / Area
                    </label>
                    <input
                      id="inst-city"
                      type="text"
                      {...register("cityArea")}
                      placeholder="e.g., Bengaluru / Mysuru / Tumakuru"
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="inst-email" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      Official Email *
                    </label>
                    <input
                      id="inst-email"
                      type="email"
                      {...register("officialEmail")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.officialEmail && <p className="text-xs text-red-600 mt-1">{errors.officialEmail.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="inst-phone" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="inst-phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-2">
                    Interested Programmes * (Select all that apply)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PROGRAMME_OPTIONS.map((prog) => {
                      const checked = selectedProgrammes.includes(prog);
                      return (
                        <label
                          key={prog}
                          className={`flex items-start gap-2.5 p-3 border text-xs cursor-pointer transition-colors ${
                            checked
                              ? "border-[#1D4ED8] bg-[#F8FAFC] font-semibold text-[#1D4ED8]"
                              : "border-[#E5E7EB] bg-white text-[#111827]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleProgramme(prog)}
                            className="mt-0.5 accent-[#1D4ED8]"
                          />
                          <span>{prog}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.interestedProgrammes && (
                    <p className="text-xs text-red-600 mt-1">{errors.interestedProgrammes.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="inst-batchSize" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Estimated Student Batch Size *
                  </label>
                  <select
                    id="inst-batchSize"
                    {...register("estimatedBatchSize")}
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  >
                    {BATCH_SIZE_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="inst-message" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8] mb-1">
                    Message / Preferred Timeline
                  </label>
                  <textarea
                    id="inst-message"
                    rows={3}
                    {...register("message")}
                    placeholder="Share preferred semester dates, student streams, or lab availability..."
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="mt-0.5 accent-[#1D4ED8]" />
                  <span>
                    I authorize VLEARNIN Academy to contact our institution regarding this academic
                    partnership proposal.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Request Institutional Proposal"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
