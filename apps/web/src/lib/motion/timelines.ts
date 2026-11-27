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
      imageDirection === "left"
        ? "inset(8% 100% 8% 0% round 15px)"
        : "inset(8% 0% 8% 100% round 15px)";

    tl.addLabel("media")
      .fromTo(
        ".split-image",
        { clipPath: imgClipFrom, scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0% round 15px)",
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
          clearProps: "transform,clipPath",
        },
        "media",
      )
      .fromTo(
        ".split-content",
        {
          transformPerspective: 1000,
          x: imageDirection === "left" ? 44 : -44,
          rotateY: imageDirection === "left" ? -4 : 4,
          opacity: 0.85,
        },
        {
          x: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.82,
          ease: "power4.out",
          clearProps: "transform",
        },
        "media+=0.08",
      )
      .fromTo(
        ".split-stagger-item",
        { transformPerspective: 900, y: 26, rotateX: 10, scale: 0.95, opacity: 0.85 },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.25)",
          clearProps: "transform",
        },
        "media+=0.18",
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
      { transformPerspective: 1000, y: 50, scale: 0.91, rotateX: 12, opacity: 0.82 },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        stagger: 0.16,
        ease: "power3.out",
        clearProps: "transform",
      },
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
            clipPath: fromLeft
              ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
              : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            scale: 1.09,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
            duration: 0.92,
            ease: "power4.out",
            clearProps: "transform,clipPath",
          },
          0,
        );
      }

      if (body) {
        tl.fromTo(
          body,
          { transformPerspective: 1000, x: fromLeft ? 48 : -48, rotateY: fromLeft ? -5 : 5, opacity: 0.85 },
          {
            x: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.82,
            ease: "power4.out",
            clearProps: "transform",
          },
          0.08,
        );
      }

      if (links.length > 0) {
        tl.fromTo(
          links,
          { x: 22, opacity: 0.82 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.075,
            ease: "back.out(1.2)",
            clearProps: "transform",
          },
          0.22,
        );
      }

      if (mediaImg) {
        gsap.fromTo(
          mediaImg,
          { yPercent: -8, scale: 1.06 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.75,
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
        { transformPerspective: 1000, y: 48, scale: 0.91, rotateX: 14, rotateY: -4, opacity: 0.84 },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.78,
          stagger: 0.09,
          ease: "back.out(1.2)",
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
      { transformPerspective: 1000, y: 46, scale: 0.92, rotateX: 10, opacity: 0.85 },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        duration: 0.76,
        stagger: 0.085,
        ease: "back.out(1.15)",
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
