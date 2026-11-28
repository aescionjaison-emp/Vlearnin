import { gsap, isEditorialMotionDisabled } from "./motion-provider";
import { EDITORIAL_EASE } from "./motion-easing";
import { MOTION_TOKENS } from "./motion-tokens";

export type RevealDirection = "left" | "right" | "bottom" | "top";

const CLIP_FROM: Record<RevealDirection, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
  top: "inset(0 0 100% 0)",
};

export function animatePhotographicReveal(
  frame: HTMLElement | null,
  options?: {
    direction?: RevealDirection;
    duration?: number;
    delay?: number;
    trigger?: HTMLElement | null;
  },
) {
  if (!frame || isEditorialMotionDisabled()) return () => {};
  const dir = options?.direction ?? "bottom";

  const ctx = gsap.context(() => {
    const img = frame.querySelector("img, video");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options?.trigger ?? frame,
        start: MOTION_TOKENS.triggerStart,
        once: true,
      },
    });

    tl.fromTo(
      frame,
      { clipPath: CLIP_FROM[dir] },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: options?.duration ?? MOTION_TOKENS.duration.image,
        delay: options?.delay ?? 0,
        ease: EDITORIAL_EASE.editorial,
        clearProps: "clipPath",
      },
      0,
    );

    if (img) {
      tl.fromTo(
        img,
        { scale: MOTION_TOKENS.scale.imageStart },
        {
          scale: 1,
          duration: (options?.duration ?? MOTION_TOKENS.duration.image) + 0.12,
          delay: options?.delay ?? 0,
          ease: EDITORIAL_EASE.out,
          clearProps: "transform",
        },
        0,
      );
    }
  });

  return () => ctx.revert();
}
