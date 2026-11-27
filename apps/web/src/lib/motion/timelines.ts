import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_EASE } from "./easing";
import { MOTION_PRESETS, isMotionDisabled } from "./presets";
import { MOTION_TOKENS } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   HERO ENTRANCE  —  word-level clip-mask stagger + momentum slides
   ───────────────────────────────────────────────────────────────────────────── */
export function runHeroTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    /* Headline: upward clip-mask wipe from behind */
    tl.fromTo(
      ".hero-headline",
      { clipPath: "inset(0 0 100% 0)", y: 40 },
      { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.1, clearProps: "clipPath,transform" },
      0,
    )
      /* Description: fast momentum slide-up with slight skew */
      .fromTo(
        ".hero-desc",
        { y: 48, skewY: 1.2, opacity: 0.88 },
        { y: 0, skewY: 0, opacity: 1, duration: 0.95, clearProps: "transform" },
        0.25,
      )
      /* Features list: staggered left-wipe */
      .fromTo(
        ".hero-features-item",
        { x: -36, opacity: 0.88 },
        { x: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: "back.out(1.3)", clearProps: "transform" },
        0.42,
      )
      /* CTAs: scale-pop entrance */
      .fromTo(
        ".hero-ctas",
        { y: 24, scale: 0.94, opacity: 0.88 },
        { y: 0, scale: 1, opacity: 1, duration: 0.75, clearProps: "transform" },
        0.6,
      );
  }, scope);

  return () => ctx.revert();
}

/* ─────────────────────────────────────────────────────────────────────────────
   SPLIT EDITORIAL  —  curtain wipe + 3-D perspective slide with expo.out
   ───────────────────────────────────────────────────────────────────────────── */
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

    /* Image: diagonal curtain wipe */
    const imgClipFrom =
      imageDirection === "left"
        ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
        : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

    tl.fromTo(
      ".split-image",
      { clipPath: imgClipFrom, scale: 1.08 },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scale: 1,
        duration: 1.0,
        ease: "expo.out",
        clearProps: "transform,clipPath",
      },
      0,
    )
      /* Content: momentum horizontal slide */
      .fromTo(
        ".split-content",
        { x: imageDirection === "left" ? 70 : -70, skewX: imageDirection === "left" ? -3 : 3, opacity: 0.9 },
        {
          x: 0,
          skewX: 0,
          opacity: 1,
          duration: 0.95,
          ease: "expo.out",
          clearProps: "transform",
        },
        0.12,
      )
      /* Stagger items: clip-wipe from bottom */
      .fromTo(
        ".split-stagger-item",
        { clipPath: "inset(0 0 100% 0)", y: 18 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "expo.out",
          clearProps: "clipPath,transform",
        },
        0.28,
      );
  }, scope);

  return () => ctx.revert();
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCRUBBED PATHWAY  —  horizontal stage slide + velocity scrub progress bar
   ───────────────────────────────────────────────────────────────────────────── */
export function runScrubbedPathwayTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    /* Progress bar driven by scroll velocity */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        end: "bottom 55%",
        scrub: 0.5,
      },
    });

    tl.fromTo(".pathway-progress-bar", { scaleX: 0 }, { scaleX: 1, ease: "none" });

    /* Stage cards: staggered horizontal slide in (once) */
    gsap.fromTo(
      ".pathway-stage-card",
      { x: 60, skewX: -2, opacity: 0.88 },
      {
        x: 0,
        skewX: 0,
        opacity: 1,
        duration: 0.88,
        stagger: 0.12,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: scope,
          start: "top 82%",
          once: true,
        },
      },
    );
  }, scope);

  return () => ctx.revert();
}

/* ─────────────────────────────────────────────────────────────────────────────
   ALTERNATING DOMAIN PANELS  —  polygon wipe + skewed body + link stagger
   ───────────────────────────────────────────────────────────────────────────── */
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
          start: "top 85%",
          once: true,
        },
      });

      /* Media: polygon curtain wipe + subtle scale */
      if (media) {
        tl.fromTo(
          media,
          {
            clipPath: fromLeft
              ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
              : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            scale: 1.1,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
            clearProps: "transform,clipPath",
          },
          0,
        );
      }

      /* Body: momentum skew + horizontal slide */
      if (body) {
        tl.fromTo(
          body,
          { x: fromLeft ? 80 : -80, skewX: fromLeft ? -4 : 4, opacity: 0.9 },
          {
            x: 0,
            skewX: 0,
            opacity: 1,
            duration: 0.95,
            ease: "expo.out",
            clearProps: "transform",
          },
          0.1,
        );
      }

      /* Links: staggered upward clip-mask reveal */
      if (links.length > 0) {
        tl.fromTo(
          links,
          { clipPath: "inset(0 0 100% 0)", y: 12 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "expo.out",
            clearProps: "clipPath,transform",
          },
          0.28,
        );
      }

      /* Parallax on the inner image */
      if (mediaImg) {
        gsap.fromTo(
          mediaImg,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }
    });
  }, scope);

  return () => ctx.revert();
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADVANTAGES / V-WAY  —  portrait clip-wipe + card skew stagger
   ───────────────────────────────────────────────────────────────────────────── */
export function runAdvantagesTimeline(scope: HTMLElement | null) {
  if (!scope || isMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    const portrait = scope.querySelector(".vway-portrait");
    const portraitImg = scope.querySelector(".vway-portrait img");
    const cards = scope.querySelectorAll(".vway-flip-item");

    /* Portrait: upward clip-mask wipe + scale */
    if (portrait) {
      gsap.fromTo(
        portrait,
        { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.05,
          ease: "expo.out",
          clearProps: "transform,clipPath",
          scrollTrigger: {
            trigger: scope,
            start: "top 84%",
            once: true,
          },
        },
      );
    }

    /* Portrait parallax */
    if (portraitImg) {
      gsap.fromTo(
        portraitImg,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
    }

    /* Cards: skewed upward stagger — from center outward */
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 72, skewY: 2.5, opacity: 0.9 },
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 0.85,
          stagger: { amount: 0.45, from: "start" },
          ease: "expo.out",
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

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION CASCADE  —  staggered clip-wipe from bottom for cards / grid items
   ───────────────────────────────────────────────────────────────────────────── */
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
      { clipPath: "inset(0 0 100% 0)", y: 32, skewY: 1.5 },
      {
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        skewY: 0,
        duration: 0.82,
        stagger: { amount: 0.5, from: "start" },
        ease: "expo.out",
        clearProps: "clipPath,transform",
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

/* ─────────────────────────────────────────────────────────────────────────────
   PARALLAX SCRUB  —  increased ±12% range for visible depth effect
   ───────────────────────────────────────────────────────────────────────────── */
export function runParallaxScrub(
  imgEl: HTMLElement | null,
  triggerEl: HTMLElement | null,
  rangePercent = 12,
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
          scrub: 0.6,
        },
      },
    );
  }, triggerEl);

  return () => ctx.revert();
}
