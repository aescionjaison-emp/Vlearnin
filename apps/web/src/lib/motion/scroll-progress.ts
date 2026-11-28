import { gsap, isEditorialMotionDisabled } from "./motion-provider";
import { EDITORIAL_EASE } from "./motion-easing";

export function animateConnectingLine(
  lineEl: HTMLElement | null,
  triggerEl: HTMLElement | null,
  options?: { scrub?: boolean | number; start?: string; end?: string },
) {
  if (!lineEl || !triggerEl || isEditorialMotionDisabled()) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      lineEl,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: options?.scrub ? undefined : 0.75,
        ease: options?.scrub ? EDITORIAL_EASE.linear : EDITORIAL_EASE.editorial,
        scrollTrigger: {
          trigger: triggerEl,
          start: options?.start ?? "top 80%",
          end: options?.end ?? "bottom 65%",
          scrub: options?.scrub ?? false,
          once: !options?.scrub,
        },
      },
    );
  });

  return () => ctx.revert();
}
