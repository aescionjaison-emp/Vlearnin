"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  CheckCircle2,
  Layers,
  ShieldCheck,
  AlertCircle,
  Send,
} from "lucide-react";
import {
  EMPLOYER_ROLE_CATEGORIES,
  EmployerRequestInput,
  EmployerRequestSchema,
  JOB_LOCATION_OPTIONS,
} from "@vlearnin/shared";
import { submitEnquiryWithFallback } from "@/lib/enquiry-store";

export function HireFromVlearninClient() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmployerRequestInput>({
    resolver: zodResolver(EmployerRequestSchema),
    defaultValues: {
      contactPersonName: "",
      companyName: "",
      officialEmail: "",
      phone: "",
      roleCategories: [],
      opportunityType: "Full-Time",
      jobLocation: "Rajajinagar",
      jobDescription: "",
      consent: undefined as unknown as true,
      website: "",
    },
  });

  const selectedRoles = watch("roleCategories") || [];

  const toggleRole = (role: string) => {
    const exists = selectedRoles.includes(role);
    const updated = exists
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setValue("roleCategories", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: EmployerRequestInput) => {
    setServerError(null);
    const res = await submitEnquiryWithFallback("/enquiries/employer", "employer", data as unknown as Record<string, unknown>);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setSuccessRef(res.referenceCode);
  };

  return (
    <div className="bg-white">
      <section className="bg-[#1E3A8A] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
            Hire Pre-Trained, Project-Ready Talent — Zero Recruitment Fee
          </h1>
          <p className="text-base sm:text-lg text-white/80 mt-3 max-w-2xl">
            Connect directly with trained graduates in Power BI, Financial Modelling, AI, and
            Digital Marketing.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="bg-white border border-[#E5E7EB] p-7 space-y-3 rounded-[15px]">
            <Layers className="w-6 h-6 text-[#EA580C]" />
            <h2 className="text-xl font-bold text-[#1E3A8A]">Verified Capstone Portfolios</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Candidates complete practical dashboards, Excel valuation models or marketing projects.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] p-7 space-y-3 rounded-[15px]">
            <Briefcase className="w-6 h-6 text-[#1D4ED8]" />
            <h2 className="text-xl font-bold text-[#1E3A8A]">Domain-Specific Readiness</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Discover candidates for MIS, analytics, accounts, finance, digital marketing and video
              production roles.
            </p>
          </div>
          <div className="bg-white border border-[#E5E7EB] p-7 space-y-3 rounded-[15px]">
            <ShieldCheck className="w-6 h-6 text-[#EA580C]" />
            <h2 className="text-xl font-bold text-[#1E3A8A]">Fast, Zero-Cost Hiring</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Submit your job or internship requirements below to request consented, shortlisted
              candidate profiles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-sm rounded-[15px]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-2">
              Submit Hiring or Internship Requirement
            </h2>
            <p className="text-sm text-[#4B5563] mb-6">
              Candidate profiles are shared only with appropriate learner consent.
            </p>

            {successRef ? (
              <div className="p-8 bg-[#F8FAFC] border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#1E3A8A]">Hiring Request Received</h3>
                <p className="text-sm text-[#4B5563]">
                  Reference ID: <strong className="text-[#1E3A8A]">{successRef}</strong>. Our
                  placement team will review and share relevant consented profiles.
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-person" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      id="emp-person"
                      type="text"
                      {...register("contactPersonName")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.contactPersonName && <p className="text-xs text-red-600 mt-1">{errors.contactPersonName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="emp-company" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Company / Firm Name *
                    </label>
                    <input
                      id="emp-company"
                      type="text"
                      {...register("companyName")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-email" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Official Email *
                    </label>
                    <input
                      id="emp-email"
                      type="email"
                      {...register("officialEmail")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.officialEmail && <p className="text-xs text-red-600 mt-1">{errors.officialEmail.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="emp-phone" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="emp-phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-2">
                    Role Category * (Multi-select)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EMPLOYER_ROLE_CATEGORIES.map((role) => {
                      const checked = selectedRoles.includes(role);
                      return (
                        <label
                          key={role}
                          className={`flex items-center gap-2.5 p-3 border text-xs cursor-pointer ${
                            checked
                              ? "border-[#1E3A8A] bg-[#F8FAFC] font-semibold text-[#1E3A8A]"
                              : "border-[#E5E7EB] bg-white text-[#111827]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleRole(role)}
                            className="accent-[#1E3A8A]"
                          />
                          <span>{role}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.roleCategories && <p className="text-xs text-red-600 mt-1">{errors.roleCategories.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-type" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Opportunity Type *
                    </label>
                    <select
                      id="emp-type"
                      {...register("opportunityType")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Paid Internship">Paid Internship</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="emp-location" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                      Job Location *
                    </label>
                    <select
                      id="emp-location"
                      {...register("jobLocation")}
                      className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                    >
                      {JOB_LOCATION_OPTIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="emp-jd" className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1E3A8A] mb-1">
                    Job Description
                  </label>
                  <textarea
                    id="emp-jd"
                    rows={4}
                    {...register("jobDescription")}
                    placeholder="Key responsibilities, required tools, compensation range, or interview timeline..."
                    className="w-full border border-[#E5E7EB] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1D4ED8] rounded-[15px]"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="mt-0.5 accent-[#1E3A8A]" />
                  <span>
                    I confirm this hiring inquiry is genuine and consent to VLEARNIN sharing
                    consented candidate profiles for recruitment purposes.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Request Candidate Profiles"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
