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
      className="bg-white border-b border-[#E1E6EC] relative"
    >
      <div className="qa-divider-line origin-left h-[2px] w-full bg-gradient-to-r from-[#10264A] via-[#2463A6] to-[#C49A59]" />
      <div className="qa-mask-bar max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {content.quickAccess.items.map((item, idx) => {
            const Icon = QUICK_ICONS[idx % QUICK_ICONS.length];
            return (
              <Link
                key={`${item.href}-${idx}`}
                href={item.href}
                className="quick-item mc-card-hover group bg-[#FAF9F6] border border-[#E1E6EC] hover:border-[#2463A6] hover:bg-white py-4 px-3 flex flex-col items-center text-center gap-2 relative rounded-[10px]"
              >
                <EditableDeleteButton
                  path="quickAccess.items"
                  index={idx}
                  label="×"
                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[10px]"
                />
                <Icon className="qa-icon w-5 h-5 text-[#2463A6] group-hover:text-[#10264A] transition-colors" />
                <EditableText
                  path={`quickAccess.items.${idx}.label`}
                  value={item.label}
                  className="qa-label font-nav text-[13px] font-semibold text-[#10264A] leading-snug"
                />
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C49A59] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => openDemoModal({ sourcePage: "quick-access" })}
            className="group bg-[#10264A] hover:bg-[#17324D] text-white border border-[#10264A] transition-all duration-200 py-4 px-3 flex flex-col items-center text-center gap-2 cursor-pointer rounded-[10px] relative overflow-hidden"
          >
            <CalendarCheck className="qa-icon w-5 h-5 text-[#C49A59] group-hover:scale-110 transition-transform" />
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
