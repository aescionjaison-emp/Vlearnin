import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_EASE } from "./easing";
import { MOTION_PRESETS, isMotionDisabled } from "./presets";
import { MOTION_TOKENS } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

/**
 * Coordinated Hero Entrance Timeline (MCU-04)
 * Sequences eyebrow -> headline -> description -> CTAs with 50ms stagger.
 */
export function runHeroTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.entrance } });
    tl.addLabel("start")
      .fromTo(".hero-eyebrow", { y: 12 }, { y: 0, duration: 0.45, clearProps: "transform" }, "start")
      .fromTo(
        ".hero-headline",
        { y: 18 },
        { y: 0, duration: 0.55, clearProps: "transform" },
        "start+=0.05",
      )
      .fromTo(
        ".hero-desc",
        { y: 14 },
        { y: 0, duration: 0.5, clearProps: "transform" },
        "start+=0.10",
      )
      .fromTo(
        ".hero-ctas",
        { y: 12 },
        { y: 0, duration: 0.45, clearProps: "transform" },
        "start+=0.15",
      );
  }, scope);

  return () => ctx.revert();
}

/**
 * Coordinated Split Editorial Timeline (MCU-06 & MCU-12)
 * Pairs horizontal image curtain reveal with opposite-axis text & staggered pillars.
 */
export function runSplitEditorialTimeline(
  scope: HTMLElement | null,
  imageDirection: "left" | "right" = "left",
) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: MOTION_TOKENS.scrollTriggerStart,
        once: true,
      },
    });

    const imgClipFrom =
      imageDirection === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

    tl.addLabel("media")
      .fromTo(
        ".split-image",
        { clipPath: imgClipFrom, scale: 1.04 },
        {
          clipPath: "inset(0 0% 0 0%)",
          scale: 1,
          duration: MOTION_TOKENS.imageEntrance,
          ease: MOTION_EASE.entrance,
          clearProps: "transform,clipPath",
        },
        "media",
      )
      .fromTo(
        ".split-content",
        imageDirection === "left" ? MOTION_PRESETS.revealRight.from : MOTION_PRESETS.revealLeft.from,
        {
          ...(imageDirection === "left" ? MOTION_PRESETS.revealRight.to : MOTION_PRESETS.revealLeft.to),
          clearProps: "transform",
        },
        "media+=0.1",
      )
      .fromTo(
        ".split-stagger-item",
        { y: 14 },
        {
          y: 0,
          duration: 0.45,
          stagger: MOTION_TOKENS.staggerInterval,
          ease: MOTION_EASE.default,
          clearProps: "transform",
        },
        "media+=0.2",
      );
  }, scope);

  return () => ctx.revert();
}

/**
 * Scroll-Linked Scrubbed Placement Pathway Timeline (MCU-11)
 * Scrubs progress indicator across the 4 stages and reverses smoothly on upward scroll.
 */
export function runScrubbedPathwayTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        end: "bottom 65%",
        scrub: 0.6,
      },
    });

    tl.fromTo(
      ".pathway-progress-bar",
      { scaleX: 0 },
      { scaleX: 1, ease: MOTION_EASE.scrub },
    ).fromTo(
      ".pathway-stage-card",
      { y: 38, scale: 0.94, opacity: 0.85 },
      { y: 0, scale: 1, opacity: 1, stagger: 0.16, ease: MOTION_EASE.entrance, clearProps: "transform" },
      0,
    );
  }, scope);

  return () => ctx.revert();
}

/**
 * Alternating Domain Showcase Timeline
 * Pairs curtain image reveal, subtle scrubbed parallax, and alternating slide-in content.
 */
export function runAlternatingDomainTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".domain-panel", scope);
    panels.forEach((panel, idx) => {
      const fromLeft = idx % 2 === 0;
      const media = panel.querySelector(".domain-media");
      const mediaImg = panel.querySelector(".domain-media img");
      const body = panel.querySelector(".domain-body");
      const links = panel.querySelectorAll(".domain-course-link");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 86%",
          once: true,
        },
      });

      if (media) {
        tl.fromTo(
          media,
          {
            clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            scale: 1.06,
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1,
            duration: 0.85,
            ease: MOTION_EASE.entrance,
            clearProps: "transform,clipPath",
          },
          0,
        );
      }

      if (body) {
        tl.fromTo(
          body,
          { x: fromLeft ? 40 : -40, opacity: 0.88 },
          {
            x: 0,
            opacity: 1,
            duration: 0.78,
            ease: MOTION_EASE.entrance,
            clearProps: "transform",
          },
          0.1,
        );
      }

      if (links.length > 0) {
        tl.fromTo(
          links,
          { x: 18, opacity: 0.85 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: MOTION_EASE.entrance,
            clearProps: "transform",
          },
          0.25,
        );
      }

      if (mediaImg) {
        gsap.fromTo(
          mediaImg,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }
    });
  }, scope);

  return () => ctx.revert();
}

/**
 * Scroll-Linked Image Parallax + Curtain Reveal for Feature Portrait & Banner Sections
 */
export function runAdvantagesTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const portrait = scope.querySelector(".vway-portrait");
    const portraitImg = scope.querySelector(".vway-portrait img");
    const cards = scope.querySelectorAll(".vway-flip-item");

    if (portrait) {
      gsap.fromTo(
        portrait,
        { clipPath: "inset(14% 0 0 0)", scale: 1.05 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 0.85,
          ease: MOTION_EASE.entrance,
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: scope,
            start: "top 84%",
            once: true,
          },
        },
      );
    }

    if (portraitImg) {
      gsap.fromTo(
        portraitImg,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 40, scale: 0.92, rotateX: 8, opacity: 0.86 },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.09,
          ease: MOTION_EASE.entrance,
          clearProps: "transform",
          scrollTrigger: {
            trigger: scope,
            start: "top 82%",
            once: true,
          },
        },
      );
    }
  }, scope);

  return () => ctx.revert();
}

/**
 * Architectural Banner & Carousel Section Entrance
 */
export function runSectionCascadeTimeline(
  scope: HTMLElement | null,
  itemSelector: string,
) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const items = scope.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { y: 38, scale: 0.95, opacity: 0.88 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.72,
        stagger: 0.08,
        ease: MOTION_EASE.entrance,
        clearProps: "transform",
        scrollTrigger: {
          trigger: scope,
          start: "top 86%",
          once: true,
        },
      },
    );
  }, scope);

  return () => ctx.revert();
}

/**
 * Scrubbed Scroll Progress Bar & Parallax Helper
 */
export function runParallaxScrub(
  imgEl: HTMLElement | null,
  triggerEl: HTMLElement | null,
  rangePercent = 8,
) {
  if (!imgEl || !triggerEl || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      imgEl,
      { yPercent: -rangePercent },
      {
        yPercent: rangePercent,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  }, triggerEl);

  return () => ctx.revert();
}
