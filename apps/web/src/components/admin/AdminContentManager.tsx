"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ImageDropzoneInput } from "@/components/ImageDropzoneInput";

type SectionKey =
  | "brand"
  | "heroBanners"
  | "courses"
  | "combos"
  | "categories"
  | "quickAccess"
  | "navLinks"
  | "brandIntro"
  | "pillars"
  | "highlights"
  | "advantages"
  | "placement"
  | "academic"
  | "bullets"
  | "gallery"
  | "footer"
  | "customSections";

const SECTION_TABS: { key: SectionKey; label: string }[] = [
  { key: "brand", label: "Brand & Contact" },
  { key: "navLinks", label: "Header & Nav Links" },
  { key: "heroBanners", label: "Hero Slides (Image/Video)" },
  { key: "quickAccess", label: "Quick Access" },
  { key: "brandIntro", label: "Welcome & Campus Image" },
  { key: "pillars", label: "V-Way Pillars" },
  { key: "highlights", label: "Stat Counters" },
  { key: "categories", label: "Learning Domains" },
  { key: "courses", label: "Programmes (Courses)" },
  { key: "combos", label: "Career Combos" },
  { key: "advantages", label: "V-Way Advantages" },
  { key: "placement", label: "Placement Stages" },
  { key: "academic", label: "Academic Partnerships" },
  { key: "bullets", label: "Academic Bullets" },
  { key: "gallery", label: "Campus Gallery (Image/Video)" },
  { key: "footer", label: "Final CTA & Footer" },
  { key: "customSections", label: "Custom Sections" },
];

export function AdminContentManager() {
  const { content, setByPath, appendItem, removeItem } = useSiteContent();
  const [selected, setSelected] = useState<SectionKey>("courses");

  const renderHeader = (title: string, path: string, createItem: () => unknown, btnLabel: string) => (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
      <div>
        <h2 className="text-2xl font-bold text-[#1E3A8A]">{title}</h2>
        <p className="text-xs font-nav text-[#4B5563] mt-0.5">
          Add new items, edit any field, or delete existing items. Click Save &amp; Publish when done.
        </p>
      </div>
      <button
        type="button"
        onClick={() => appendItem(path, createItem())}
        className="btn-primary-amber px-4 py-2.5 text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>{btnLabel}</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Section Selector */}
      <aside className="lg:col-span-3 space-y-1.5">
        <p className="font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8] px-3 pb-2">
          ADD / DELETE SECTIONS
        </p>
        {SECTION_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setSelected(t.key)}
            className={`w-full text-left px-4 py-2.5 text-sm font-nav font-semibold rounded-[15px] transition-colors cursor-pointer ${
              selected === t.key
                ? "bg-[#1E3A8A] text-white"
                : "bg-white border border-[#E5E7EB] text-[#1E3A8A] hover:bg-[#EFF6FF]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </aside>

      {/* Right CRUD Panel */}
      <div className="lg:col-span-9 bg-white border border-[#E5E7EB] rounded-[15px] p-6 sm:p-8 space-y-6">
        {selected === "brand" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] pb-3 border-b border-[#E5E7EB]">
              Brand &amp; Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  ["brand.name", "Brand Name", content.brand.name],
                  ["brand.legalName", "Legal Name", content.brand.legalName],
                  ["brand.tagline", "Tagline", content.brand.tagline],
                  ["brand.email", "Contact Email", content.brand.email],
                  ["brand.phoneDisplay", "Phone Display", content.brand.phoneDisplay],
                  ["brand.whatsappNumber", "WhatsApp Number", content.brand.whatsappNumber],
                  ["brand.shortLocation", "Short Location", content.brand.shortLocation],
                  ["brand.weekdaysTiming", "Weekdays Timing", content.brand.weekdaysTiming],
                  ["brand.sundayTiming", "Sunday Timing", content.brand.sundayTiming],
                ] as const
              ).map(([path, lbl, val]) => (
                <div key={path}>
                  <label className="block text-xs font-nav font-semibold uppercase text-[#1E3A8A] mb-1">
                    {lbl}
                  </label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => setByPath(path, e.target.value)}
                    className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-nav font-semibold uppercase text-[#1E3A8A] mb-1">
                Full Address
              </label>
              <input
                type="text"
                value={content.brand.address}
                onChange={(e) => setByPath("brand.address", e.target.value)}
                className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
            <div>
              <label className="block text-xs font-nav font-semibold uppercase text-[#1E3A8A] mb-1">
                Placement Assistance Disclaimer
              </label>
              <textarea
                rows={3}
                value={content.brand.placementDisclaimer}
                onChange={(e) => setByPath("brand.placementDisclaimer", e.target.value)}
                className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
          </div>
        )}

        {selected === "brandIntro" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] pb-3 border-b border-[#E5E7EB]">
              Welcome Section &amp; Campus Photo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={content.brandIntro.eyebrow}
                onChange={(e) => setByPath("brandIntro.eyebrow", e.target.value)}
                placeholder="Eyebrow"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.brandIntro.subTagline}
                onChange={(e) => setByPath("brandIntro.subTagline", e.target.value)}
                placeholder="Sub-tagline"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.brandIntro.heading}
                onChange={(e) => setByPath("brandIntro.heading", e.target.value)}
                placeholder="Heading"
                className="sm:col-span-2 border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.brandIntro.ctaLabel}
                onChange={(e) => setByPath("brandIntro.ctaLabel", e.target.value)}
                placeholder="Primary CTA Label"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.brandIntro.secondaryLinkLabel}
                onChange={(e) => setByPath("brandIntro.secondaryLinkLabel", e.target.value)}
                placeholder="Secondary Link Label"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
            <textarea
              rows={3}
              value={content.brandIntro.description}
              onChange={(e) => setByPath("brandIntro.description", e.target.value)}
              className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
            />
            <ImageDropzoneInput
              label="Welcome Section Campus Image"
              allowVideo={false}
              value={content.brandIntro.image}
              onChange={(next) => setByPath("brandIntro.image", next)}
            />
          </div>
        )}

        {selected === "academic" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] pb-3 border-b border-[#E5E7EB]">
              Academic Partnerships Section
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={content.academicSection.eyebrow}
                onChange={(e) => setByPath("academicSection.eyebrow", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.academicSection.heading}
                onChange={(e) => setByPath("academicSection.heading", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.academicSection.primaryCtaLabel}
                onChange={(e) => setByPath("academicSection.primaryCtaLabel", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.academicSection.secondaryCtaLabel}
                onChange={(e) => setByPath("academicSection.secondaryCtaLabel", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
            <textarea
              rows={3}
              value={content.academicSection.description}
              onChange={(e) => setByPath("academicSection.description", e.target.value)}
              className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
            />
            <ImageDropzoneInput
              label="Academic Partnerships Image"
              allowVideo={false}
              value={content.academicSection.image}
              onChange={(next) => setByPath("academicSection.image", next)}
            />
          </div>
        )}

        {selected === "footer" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] pb-3 border-b border-[#E5E7EB]">
              Final CTA Banner &amp; Footer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={content.finalCtaSection.heading}
                onChange={(e) => setByPath("finalCtaSection.heading", e.target.value)}
                placeholder="Final CTA Heading"
                className="sm:col-span-2 border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.finalCtaSection.demoLabel}
                onChange={(e) => setByPath("finalCtaSection.demoLabel", e.target.value)}
                placeholder="Demo Button Label"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.finalCtaSection.contactLabel}
                onChange={(e) => setByPath("finalCtaSection.contactLabel", e.target.value)}
                placeholder="Contact Button Label"
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
            <textarea
              rows={2}
              value={content.finalCtaSection.description}
              onChange={(e) => setByPath("finalCtaSection.description", e.target.value)}
              className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
            />
            <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={content.footer.programmesHeading}
                onChange={(e) => setByPath("footer.programmesHeading", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.footer.quickLinksHeading}
                onChange={(e) => setByPath("footer.quickLinksHeading", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.footer.contactHeading}
                onChange={(e) => setByPath("footer.contactHeading", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
              <input
                type="text"
                value={content.footer.copyrightSuffix}
                onChange={(e) => setByPath("footer.copyrightSuffix", e.target.value)}
                className="border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
              />
            </div>
            <textarea
              rows={3}
              value={content.footer.description}
              onChange={(e) => setByPath("footer.description", e.target.value)}
              className="w-full border border-[#E5E7EB] px-3 py-2 text-sm rounded-[15px]"
            />
          </div>
        )}

        {selected === "courses" && (
          <>
            {renderHeader(
              `Programmes / Courses (${content.courses.length})`,
              "courses",
              () => ({
                slug: `programme-${Date.now()}`,
                title: "New Certification Programme",
                categorySlug: content.categories[0]?.slug || "ai-business-intelligence",
                categoryName: content.categories[0]?.name || "AI & Business Intelligence",
                durationHours: 30,
                durationLabel: "30 Hours (5 Modules × 6 Hours)",
                idealFor: "Students & Working Professionals",
                summary: "Practical 30-hour certification with live projects.",
                overview: "Instructor-led certification programme.",
                capstoneTitle: "Live Capstone Project",
                capstoneDescription: "Build a portfolio-ready project.",
                careerPathways: ["Analyst"],
                learningModes: ["Classroom (Rajajinagar)", "Live Online"],
                image: "/images/course-ai-commerce.jpg",
                tools: ["AI Tools", "Excel"],
                outcomes: ["Master practical workplace skills"],
                modules: [],
              }),
              "Add New Programme",
            )}
            <div className="space-y-4">
              {content.courses.map((c, idx) => (
                <div key={`${c.slug}-${idx}`} className="border border-[#E5E7EB] rounded-[15px] p-4 space-y-3 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-nav text-xs font-bold text-[#EA580C] uppercase">
                      Programme #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem("courses", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={c.title}
                      onChange={(e) => setByPath(`courses.${idx}.title`, e.target.value)}
                      placeholder="Course Title"
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={c.categoryName}
                      onChange={(e) => setByPath(`courses.${idx}.categoryName`, e.target.value)}
                      placeholder="Category Name"
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="number"
                      value={c.durationHours}
                      onChange={(e) => setByPath(`courses.${idx}.durationHours`, Number(e.target.value))}
                      placeholder="Hours"
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <div className="sm:col-span-2">
                      <ImageDropzoneInput
                        compact
                        value={c.image}
                        onChange={(next) => setByPath(`courses.${idx}.image`, next)}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={c.summary}
                    onChange={(e) => setByPath(`courses.${idx}.summary`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "combos" && (
          <>
            {renderHeader(
              `Career Combos (${content.combos.length})`,
              "combos",
              () => ({
                slug: `combo-${Date.now()}`,
                title: "New Career Accelerator Combo",
                durationHours: 60,
                durationLabel: "60 Hours Dual-Skill",
                includedLabel: "2 Integrated Certifications",
                idealFor: "Graduates & Working Professionals",
                summary: "Dual-skill career track with live capstones.",
                outcomes: ["Portfolio-ready capstone"],
                courseSlugs: [],
                image: "/images/hero-2.jpg",
                displayOrder: content.combos.length + 1,
              }),
              "Add New Combo",
            )}
            <div className="space-y-4">
              {content.combos.map((combo, idx) => (
                <div key={`${combo.slug}-${idx}`} className="border border-[#E5E7EB] rounded-[15px] p-4 space-y-3 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Combo #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("combos", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={combo.title}
                      onChange={(e) => setByPath(`combos.${idx}.title`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={combo.durationLabel}
                      onChange={(e) => setByPath(`combos.${idx}.durationLabel`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={combo.includedLabel}
                      onChange={(e) => setByPath(`combos.${idx}.includedLabel`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <div className="sm:col-span-2">
                      <ImageDropzoneInput
                        compact
                        value={combo.image}
                        onChange={(next) => setByPath(`combos.${idx}.image`, next)}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={combo.summary}
                    onChange={(e) => setByPath(`combos.${idx}.summary`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "categories" && (
          <>
            {renderHeader(
              `Learning Domains (${content.categories.length})`,
              "categories",
              () => ({
                slug: `domain-${Date.now()}`,
                name: "New Learning Domain",
                shortName: "New Domain",
                description: "Domain description.",
                outcomeSummary: "Describe what learners achieve in this domain.",
                image: "/images/domain-analytics.jpg",
                displayOrder: content.categories.length + 1,
              }),
              "Add New Domain",
            )}
            <div className="space-y-4">
              {content.categories.map((cat, idx) => (
                <div key={`${cat.slug}-${idx}`} className="border border-[#E5E7EB] rounded-[15px] p-4 space-y-3 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Domain #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("categories", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => setByPath(`categories.${idx}.name`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <ImageDropzoneInput
                      compact
                      value={cat.image}
                      onChange={(next) => setByPath(`categories.${idx}.image`, next)}
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={cat.outcomeSummary}
                    onChange={(e) => setByPath(`categories.${idx}.outcomeSummary`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "heroBanners" && (
          <>
            {renderHeader(
              `Hero Slides (${content.heroBanners.length})`,
              "heroBanners",
              () => ({
                id: `slide-${Date.now()}`,
                theme: "jain-blue",
                badge: "NEW CAMPAIGN",
                headlineWhite: "New Slide Headline",
                headlineAccent: "Accent Headline",
                description: "Slide description text.",
                image: "/images/hero-1.jpg",
                imageAlt: "VLEARNIN hero slide",
                primaryCta: { label: "Explore Programmes", href: "/courses" },
                secondaryCta: { label: "Book Free Demo", action: "demo" },
              }),
              "Add Hero Slide",
            )}
            <div className="space-y-4">
              {content.heroBanners.map((b, idx) => (
                <div key={`${b.id}-${idx}`} className="border border-[#E5E7EB] rounded-[15px] p-4 space-y-3 bg-[#F8FAFC]">
                  <div className="flex items-center justify-between">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Slide #{idx + 1}</span>
                    {content.heroBanners.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("heroBanners", idx)}
                        className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={b.badge}
                      onChange={(e) => setByPath(`heroBanners.${idx}.badge`, e.target.value)}
                      placeholder="Badge"
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={b.headlineWhite}
                      onChange={(e) => setByPath(`heroBanners.${idx}.headlineWhite`, e.target.value)}
                      placeholder="Headline Part 1"
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={b.headlineAccent}
                      onChange={(e) => setByPath(`heroBanners.${idx}.headlineAccent`, e.target.value)}
                      placeholder="Headline Accent"
                      className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <div className="sm:col-span-2">
                      <ImageDropzoneInput
                        compact
                        value={b.image}
                        onChange={(next) => setByPath(`heroBanners.${idx}.image`, next)}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={b.description}
                    onChange={(e) => setByPath(`heroBanners.${idx}.description`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "quickAccess" && (
          <>
            {renderHeader(
              `Quick Access Strip (${content.quickAccess.items.length})`,
              "quickAccess.items",
              () => ({ label: "New Link", href: "/courses" }),
              "Add Quick Link",
            )}
            <div className="space-y-3">
              {content.quickAccess.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-[#F8FAFC] p-3 rounded-[15px] border border-[#E5E7EB]">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => setByPath(`quickAccess.items.${idx}.label`, e.target.value)}
                    className="sm:col-span-5 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => setByPath(`quickAccess.items.${idx}.href`, e.target.value)}
                    className="sm:col-span-5 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("quickAccess.items", idx)}
                    className="sm:col-span-2 text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center justify-end gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "navLinks" && (
          <>
            {renderHeader(
              `Header Navigation Links (${content.header.navLinks.length})`,
              "header.navLinks",
              () => ({ label: "New Nav Item", href: "/about" }),
              "Add Nav Link",
            )}
            <div className="space-y-3">
              {content.header.navLinks.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-[#F8FAFC] p-3 rounded-[15px] border border-[#E5E7EB]">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => setByPath(`header.navLinks.${idx}.label`, e.target.value)}
                    className="sm:col-span-5 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => setByPath(`header.navLinks.${idx}.href`, e.target.value)}
                    className="sm:col-span-5 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("header.navLinks", idx)}
                    className="sm:col-span-2 text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center justify-end gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "pillars" && (
          <>
            {renderHeader(
              `V-Way Pillars (${content.brandIntro.pillars.length})`,
              "brandIntro.pillars",
              () => ({
                step: `0${content.brandIntro.pillars.length + 1}`,
                title: "NEW PILLAR",
                desc: "Describe this pillar.",
              }),
              "Add Pillar",
            )}
            <div className="space-y-3">
              {content.brandIntro.pillars.map((p, idx) => (
                <div key={idx} className="bg-[#F8FAFC] p-4 rounded-[15px] border border-[#E5E7EB] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Pillar #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("brandIntro.pillars", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={p.step}
                      onChange={(e) => setByPath(`brandIntro.pillars.${idx}.step`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => setByPath(`brandIntro.pillars.${idx}.title`, e.target.value)}
                      className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                  </div>
                  <input
                    type="text"
                    value={p.desc}
                    onChange={(e) => setByPath(`brandIntro.pillars.${idx}.desc`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "highlights" && (
          <>
            {renderHeader(
              `Stat Counters (${content.brandIntro.highlights.length})`,
              "brandIntro.highlights",
              () => ({ value: 10, padZero: false, label: "New Stat", sub: "Stat description" }),
              "Add Counter",
            )}
            <div className="space-y-3">
              {content.brandIntro.highlights.map((h, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-[#F8FAFC] p-3 rounded-[15px] border border-[#E5E7EB]">
                  <input
                    type="number"
                    value={h.value}
                    onChange={(e) => setByPath(`brandIntro.highlights.${idx}.value`, Number(e.target.value))}
                    className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <input
                    type="text"
                    value={h.label}
                    onChange={(e) => setByPath(`brandIntro.highlights.${idx}.label`, e.target.value)}
                    className="sm:col-span-4 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <input
                    type="text"
                    value={h.sub}
                    onChange={(e) => setByPath(`brandIntro.highlights.${idx}.sub`, e.target.value)}
                    className="sm:col-span-4 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("brandIntro.highlights", idx)}
                    className="sm:col-span-2 text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center justify-end gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "advantages" && (
          <>
            {renderHeader(
              `V-Way Advantages (${content.advantagesSection.items.length})`,
              "advantagesSection.items",
              () => ({
                num: `0${content.advantagesSection.items.length + 1}`,
                title: "New Advantage",
                description: "Advantage details.",
              }),
              "Add Advantage",
            )}
            <ImageDropzoneInput
              label="V-Way Portrait Image"
              allowVideo={false}
              compact
              value={content.advantagesSection.image}
              onChange={(next) => setByPath("advantagesSection.image", next)}
            />
            <div className="space-y-3">
              {content.advantagesSection.items.map((adv, idx) => (
                <div key={idx} className="bg-[#F8FAFC] p-4 rounded-[15px] border border-[#E5E7EB] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("advantagesSection.items", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={adv.num}
                      onChange={(e) => setByPath(`advantagesSection.items.${idx}.num`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={adv.title}
                      onChange={(e) => setByPath(`advantagesSection.items.${idx}.title`, e.target.value)}
                      className="sm:col-span-3 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={adv.description}
                    onChange={(e) => setByPath(`advantagesSection.items.${idx}.description`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "placement" && (
          <>
            {renderHeader(
              `Placement Pathway Stages (${content.placementSection.stages.length})`,
              "placementSection.stages",
              () => ({
                step: `Step 0${content.placementSection.stages.length + 1}`,
                title: "New Stage",
                desc: "Describe this placement stage.",
              }),
              "Add Stage",
            )}
            <div className="space-y-3">
              {content.placementSection.stages.map((st, idx) => (
                <div key={idx} className="bg-[#F8FAFC] p-4 rounded-[15px] border border-[#E5E7EB] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-nav text-xs font-bold text-[#EA580C]">Stage #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("placementSection.stages", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={st.step}
                      onChange={(e) => setByPath(`placementSection.stages.${idx}.step`, e.target.value)}
                      className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => setByPath(`placementSection.stages.${idx}.title`, e.target.value)}
                      className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={st.desc}
                    onChange={(e) => setByPath(`placementSection.stages.${idx}.desc`, e.target.value)}
                    className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "bullets" && (
          <>
            {renderHeader(
              `Academic Partnership Bullets (${content.academicSection.bullets.length})`,
              "academicSection.bullets",
              () => "New academic partnership highlight",
              "Add Bullet",
            )}
            <div className="space-y-3">
              {content.academicSection.bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-[15px] border border-[#E5E7EB]">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => setByPath(`academicSection.bullets.${idx}`, e.target.value)}
                    className="flex-1 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("academicSection.bullets", idx)}
                    className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "gallery" && (
          <>
            {renderHeader(
              `Campus Gallery (${content.campusSection.gallery.length})`,
              "campusSection.gallery",
              () => ({
                src: "/images/hero-1.jpg",
                title: "New Campus Highlight",
                alt: "VLEARNIN campus environment",
              }),
              "Add Gallery Photo",
            )}
            <div className="space-y-3">
              {content.campusSection.gallery.map((g, idx) => (
                <div key={idx} className="bg-[#F8FAFC] p-4 rounded-[15px] border border-[#E5E7EB] space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={g.title}
                      onChange={(e) => setByPath(`campusSection.gallery.${idx}.title`, e.target.value)}
                      placeholder="Title"
                      className="flex-1 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem("campusSection.gallery", idx)}
                      className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  <ImageDropzoneInput
                    compact
                    value={g.src}
                    onChange={(next) => setByPath(`campusSection.gallery.${idx}.src`, next)}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selected === "customSections" && (
          <>
            {renderHeader(
              `Custom Homepage Sections (${content.customSections.length})`,
              "customSections",
              () => ({
                id: `custom-${Date.now()}`,
                eyebrow: "NEW ANNOUNCEMENT",
                heading: "New Custom Section",
                description: "Add details for this custom section.",
                ctaLabel: "Learn More",
                ctaHref: "/courses",
                image: "/images/about-campus.jpg",
                theme: "light",
              }),
              "Add Custom Section",
            )}
            {content.customSections.length === 0 ? (
              <p className="text-sm text-[#4B5563]">
                No custom sections yet. Click <strong>Add Custom Section</strong> above to add a brand-new section to the homepage.
              </p>
            ) : (
              <div className="space-y-4">
                {content.customSections.map((sec, idx) => (
                  <div key={sec.id || idx} className="bg-[#F8FAFC] p-4 rounded-[15px] border border-[#E5E7EB] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-nav text-xs font-bold text-[#EA580C]">Custom Section #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("customSections", idx)}
                        className="text-xs font-nav font-bold text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={sec.eyebrow}
                        onChange={(e) => setByPath(`customSections.${idx}.eyebrow`, e.target.value)}
                        placeholder="Eyebrow"
                        className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                      />
                      <select
                        value={sec.theme}
                        onChange={(e) => setByPath(`customSections.${idx}.theme`, e.target.value)}
                        className="border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                      >
                        <option value="light">Light Theme</option>
                        <option value="blue">Royal Blue Theme</option>
                      </select>
                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => setByPath(`customSections.${idx}.heading`, e.target.value)}
                        placeholder="Heading"
                        className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                      />
                      <input
                        type="text"
                        value={sec.ctaLabel}
                        onChange={(e) => setByPath(`customSections.${idx}.ctaLabel`, e.target.value)}
                        placeholder="Button Label"
                        className="sm:col-span-2 border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                      />
                      <div className="sm:col-span-2">
                        <ImageDropzoneInput
                          compact
                          value={sec.image}
                          onChange={(next) => setByPath(`customSections.${idx}.image`, next)}
                        />
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      value={sec.description}
                      onChange={(e) => setByPath(`customSections.${idx}.description`, e.target.value)}
                      className="w-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm rounded-[15px]"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
