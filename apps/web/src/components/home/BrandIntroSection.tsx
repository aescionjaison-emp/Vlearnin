"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: "LEARN",
    desc: "Master industry tools and essential concepts.",
  },
  {
    title: "BUILD",
    desc: "Apply knowledge through practical projects and real business scenarios.",
  },
  {
    title: "LEAD",
    desc: "Develop the confidence and professional skills to advance your career.",
  },
];

const HIGHLIGHTS = [
  { target: 7, label: "Certification Programmes" },
  { target: 3, label: "Core Learning Domains" },
  { target: 30, label: "Hours Per Standalone Programme" },
  { target: 4, label: "Career Accelerator Combos" },
];

export function BrandIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".intro-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.fromTo(
        ".intro-image-clip",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".stat-counter").forEach((el) => {
        const endVal = Number(el.dataset.target || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: endVal,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="intro-reveal font-nav text-xs font-bold uppercase tracking-[0.2em] text-[#1746A2]">
              WELCOME TO VLEARNIN
            </p>
            <h2 className="intro-reveal text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#071B3D] leading-[1.15]">
              Learn With Purpose. Build With Confidence. Lead With Skill.
            </h2>
            <p className="intro-reveal text-base text-[#667085] leading-relaxed">
              VLEARNIN bridges the gap between academic knowledge and real-world professional
              capabilities through practical certification programmes, personalized mentorship and
              career-oriented learning.
            </p>

            {/* Three-step philosophy */}
            <div className="intro-reveal space-y-4 pt-2">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-4 p-4 bg-[#F4F7FC] border-l-4 border-[#D4A54A] hover:bg-[#EDF2FA] transition-colors"
                >
                  <span className="font-nav text-xs font-extrabold tracking-[0.16em] text-[#071B3D] bg-white px-2.5 py-1 border border-[#DFE5EE] shrink-0">
                    {p.title}
                  </span>
                  <p className="text-sm text-[#101828] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Layered Campus Photography + Clip-Path Reveal + V Motif */}
          <div className="lg:col-span-6 relative">
            <div className="intro-image-clip relative aspect-[4/3] w-full overflow-hidden border border-[#DFE5EE] shadow-lg">
              <Image
                src="/images/about-campus.jpg"
                alt="Practical small-batch classroom mentorship at VLEARNIN"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="absolute -bottom-6 -right-6 w-32 h-32 text-[#D4A54A]/25 pointer-events-none"
                fill="none"
              >
                <path
                  d="M15 20L60 100L105 20"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <div className="intro-reveal hidden sm:block absolute -bottom-5 -left-5 bg-[#071B3D] text-white px-6 py-4 border-t-2 border-[#D4A54A] shadow-xl">
              <p className="font-nav text-[11px] uppercase tracking-[0.16em] text-[#D4A54A] font-semibold">
                Bengaluru Campus
              </p>
              <p className="text-sm font-medium mt-0.5">6th Block, Rajajinagar</p>
            </div>
          </div>
        </div>

        {/* Four Factual Highlights with Animated Count-Up */}
        <div className="intro-reveal mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-[#DFE5EE]">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="p-6 bg-[#F4F7FC] border border-[#DFE5EE] hover:border-[#D4A54A] transition-colors text-center"
            >
              <p
                data-target={h.target}
                className="stat-counter font-editorial text-3xl sm:text-4xl font-bold text-[#071B3D]"
              >
                {h.target}
              </p>
              <p className="font-nav text-xs sm:text-sm font-semibold text-[#667085] mt-2">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
