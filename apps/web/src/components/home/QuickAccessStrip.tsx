"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Layers,
  Briefcase,
  Building2,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";
import { useSiteContent } from "@/components/SiteContentProvider";
import {
  EditableAddButton,
  EditableDeleteButton,
  EditableText,
} from "@/components/EditableText";
import { isMotionDisabled } from "@/lib/motion/presets";

gsap.registerPlugin(ScrollTrigger);

const QUICK_ICONS = [BookOpen, Layers, Briefcase, Building2, ShieldCheck] as const;

export function QuickAccessStrip() {
  const { openDemoModal } = useLeadModal();
  const { content } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope || isMotionDisabled()) return;

    const ctx = gsap.context(() => {
      // Animation 02 — Coordinated Horizontal Mask + Icon Pop + Animated Dividing Line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 92%",
          once: true,
        },
      });

      tl.fromTo(
        ".qa-mask-bar",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.75, ease: "expo.out", clearProps: "clipPath" },
        0,
      )
        .fromTo(
          ".qa-divider-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.out", clearProps: "transform" },
          0.08,
        )
        .fromTo(
          ".qa-icon",
          { scale: 0.55, y: 10, opacity: 0.4 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "back.out(1.6)",
            clearProps: "transform,opacity",
          },
          0.14,
        )
        .fromTo(
          ".qa-label",
          { x: -10, opacity: 0.6 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "expo.out",
            clearProps: "transform,opacity",
          },
          0.18,
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Institutional Quick Access"
      className="bg-white border-b border-[#E5E7EB] relative"
    >
      <div className="qa-divider-line origin-left h-[2px] w-full bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-transparent" />
      <div className="qa-mask-bar max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {content.quickAccess.items.map((item, idx) => {
            const Icon = QUICK_ICONS[idx % QUICK_ICONS.length];
            return (
              <Link
                key={`${item.href}-${idx}`}
                href={item.href}
                className="quick-item mc-card-hover group bg-white border border-[#E5E7EB] hover:border-[#1D4ED8] py-4 px-3 flex flex-col items-center text-center gap-2 relative rounded-[15px]"
              >
                <EditableDeleteButton
                  path="quickAccess.items"
                  index={idx}
                  label="×"
                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[10px]"
                />
                <Icon className="qa-icon w-5 h-5 text-[#1D4ED8] group-hover:text-[#EA580C] transition-colors" />
                <EditableText
                  path={`quickAccess.items.${idx}.label`}
                  value={item.label}
                  className="qa-label font-nav text-[13px] font-semibold text-[#1D4ED8] leading-snug"
                />
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#EA580C] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => openDemoModal({ sourcePage: "quick-access" })}
            className="group bg-[#1D4ED8] hover:bg-[#1E40AF] text-white border border-[#1D4ED8] transition-all duration-200 py-4 px-3 flex flex-col items-center text-center gap-2 cursor-pointer rounded-[15px] relative overflow-hidden"
          >
            <CalendarCheck className="qa-icon w-5 h-5 text-[#93C5FD] group-hover:scale-110 transition-transform" />
            <EditableText
              path="quickAccess.demoLabel"
              value={content.quickAccess.demoLabel}
              className="qa-label font-nav text-[13px] font-semibold leading-snug"
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
