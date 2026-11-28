"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Briefcase,
  Building2,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableText,
} from "@/components/EditableText";

const QUICK_ICONS = [BookOpen, Layers, Briefcase, Building2, ShieldCheck] as const;

export function QuickAccessStrip() {
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();

  return (
    <section
      aria-label="Institutional Quick Access"
      className="bg-white border-b border-[#E1E6EC] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {content.quickAccess.items.map((item, idx) => {
            const Icon = QUICK_ICONS[idx % QUICK_ICONS.length];
            return (
              <Link
                key={`${item.href}-${idx}`}
                href={item.href}
                className="mc-card-hover group bg-[#FAF9F6] border border-[#E1E6EC] hover:border-[#2463A6] hover:bg-white py-4 px-3 flex flex-col items-center text-center gap-2 relative rounded-[10px]"
              >
                <EditableDeleteButton
                  path="quickAccess.items"
                  index={idx}
                  label="×"
                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[10px]"
                />
                <Icon className="w-5 h-5 text-[#2463A6] group-hover:text-[#10264A] transition-colors duration-200" />
                <span className="inline-flex items-center gap-1">
                  <EditableText
                    path={`quickAccess.items.${idx}.label`}
                    value={item.label}
                    className="font-nav text-[13px] font-semibold text-[#10264A] leading-snug"
                  />
                  <ArrowRight className="w-3 h-3 text-[#2463A6] opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] transition-all duration-200" />
                </span>
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C49A59] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out" />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => openDemoModal({ sourcePage: "quick-access" })}
            className="mc-icon-btn bg-[#10264A] hover:bg-[#17324D] text-white border border-[#10264A] py-4 px-3 flex flex-col items-center text-center gap-2 cursor-pointer rounded-[10px] relative"
          >
            <CalendarCheck className="w-5 h-5 text-[#C49A59]" />
            <EditableText
              path="quickAccess.demoLabel"
              value={content.quickAccess.demoLabel}
              className="font-nav text-[13px] font-semibold leading-snug"
            />
          </button>
        </div>
        <div className="mt-3 flex justify-end">
          <EditableAddButton
            path="quickAccess.items"
            label="Add Quick Link"
            createItem={() => ({ label: "New Link", href: "/courses" })}
          />
        </div>
      </div>
    </section>
  );
}
