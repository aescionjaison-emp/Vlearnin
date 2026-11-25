"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Briefcase,
  Building2,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

const QUICK_ITEMS = [
  { label: "Programmes", href: "/courses", icon: BookOpen },
  { label: "Career Combos", href: "/career-combos", icon: Layers },
  { label: "Placement Assistance", href: "/placement-assistance", icon: Briefcase },
  { label: "Academic Partnerships", href: "/academic-partnerships", icon: Building2 },
  { label: "Verify Certificate", href: "/verify-certificate", icon: ShieldCheck },
] as const;

export function QuickAccessStrip() {
  const { openDemoModal } = useLeadModal();
  const gridRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(gridRef, ".quick-item", "cardReveal", 0.06);

  return (
    <section
      aria-label="Institutional Quick Access"
      className="bg-white border-b border-[#E5E7EB]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="quick-item mc-card-hover group bg-white border border-[#E5E7EB] hover:border-[#1D4ED8] py-4 px-3 flex flex-col items-center text-center gap-2 relative rounded-[15px]"
              >
                <Icon className="w-5 h-5 text-[#1D4ED8] group-hover:text-[#EA580C] transition-colors" />
                <span className="font-nav text-[13px] font-semibold text-[#1E3A8A] leading-snug">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA580C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => openDemoModal({ sourcePage: "quick-access" })}
            className="group bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white border border-[#1E3A8A] transition-all duration-200 py-4 px-3 flex flex-col items-center text-center gap-2 cursor-pointer rounded-[15px]"
          >
            <CalendarCheck className="w-5 h-5 text-[#93C5FD]" />
            <span className="font-nav text-[13px] font-semibold leading-snug">
              Book Free Demo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
