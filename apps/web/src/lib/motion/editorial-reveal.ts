import { gsap, isEditorialMotionDisabled } from "./motion-provider";
import { EDITORIAL_EASE } from "./motion-easing";
import { MOTION_TOKENS } from "./motion-tokens";

export function animateEditorialText(
  target: HTMLElement | null,
  options?: { delay?: number; y?: number; duration?: number; trigger?: HTMLElement | null },
) {
  if (!target || isEditorialMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      target,
      { y: options?.y ?? MOTION_TOKENS.distance.textMax, opacity: 0.9 },
      {
        y: 0,
        opacity: 1,
        duration: options?.duration ?? MOTION_TOKENS.duration.text,
        delay: options?.delay ?? 0,
        ease: EDITORIAL_EASE.editorial,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: options?.trigger ?? target,
          start: MOTION_TOKENS.triggerStart,
          once: true,
        },
      },
    );
  });

  return () => ctx.revert();
}
