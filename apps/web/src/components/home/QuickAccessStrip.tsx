"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  Layers,
  Briefcase,
  Building2,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";

const QUICK_ITEMS = [
  { label: "Explore Programmes", href: "/courses", icon: BookOpen },
  { label: "Career Combos", href: "/career-combos", icon: Layers },
  { label: "Placement Assistance", href: "/placement-assistance", icon: Briefcase },
  { label: "Academic Partnerships", href: "/academic-partnerships", icon: Building2 },
  { label: "Verify Certificate", href: "/verify-certificate", icon: ShieldCheck },
] as const;

const TICKER_ITEMS = [
  "7 Industry-Aligned Certifications",
  "30 Hours Per Standalone Programme",
  "Live Capstone Portfolio Projects",
  "4 Dual-Skill Career Accelerator Combos",
  "QR-Verified Credentials",
  "Rajajinagar, Bengaluru Campus & Live Online",
  "Dedicated Placement Assistance",
];

export function QuickAccessStrip() {
  const { openDemoModal } = useLeadModal();

  return (
    <div className="relative z-20">
      {/* JAIN-Inspired Institutional Ticker Bar */}
      <div className="bg-[#071B3D] text-white border-b border-[#D4A54A]/40 overflow-hidden py-2.5">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-3 font-nav text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90"
            >
              <span className="w-1.5 h-1.5 bg-[#D4A54A]" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Six-Item Quick Access Navigation */}
      <section
        aria-label="Institutional Quick Access"
        className="bg-white border-b border-[#DFE5EE] shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DFE5EE]">
            {QUICK_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="group relative py-5 px-4 flex flex-col items-center text-center gap-2.5 hover:bg-[#F4F7FC] transition-colors h-full"
                  >
                    <div className="transition-transform duration-300 group-hover:-translate-y-1 flex flex-col items-center gap-2">
                      <Icon className="w-5 h-5 text-[#1746A2] group-hover:text-[#D4A54A] transition-colors" />
                      <span className="font-nav text-xs font-bold text-[#071B3D] tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#D4A54A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <button
                type="button"
                onClick={() => openDemoModal({ sourcePage: "quick-access" })}
                className="w-full h-full group relative py-5 px-4 flex flex-col items-center text-center gap-2.5 bg-[#F4F7FC] hover:bg-[#071B3D] transition-colors cursor-pointer"
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-1 flex flex-col items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#D4A54A]" />
                  <span className="font-nav text-xs font-bold text-[#071B3D] group-hover:text-white tracking-wide transition-colors">
                    Book Free Demo
                  </span>
                </div>
                <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#D4A54A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
