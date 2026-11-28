# Motion Specifications — VLEARNIN Beyond the Classroom V4

## Supported Cinematic Modes (GSAP Core + ScrollTrigger)
1. **Mode A — AI Video (`cinematic.mp4`)**: Native `<video>` playback / scroll-synchronized progress for natural human motion.
2. **Mode B — Generated Frame Sequence (`frames/frame-XXXX.webp`)**: Progressive WebP frame buffer mapped to `Math.round(scrollProgress * (totalFrames - 1))`, reversible on upward scroll.
3. **Mode C — Photographic 2.5D**: Background plate + borderless RGBA student cutout (`object-contain`, bottom-anchored, no rectangular border) + optional shadow layer with restrained differential `y` and `scale` (`scrub: 0.55`).

## Rules
- Zero PowerPoint-style full-section slides, zero forced scroll snapping, zero Three.js/CSS 3D geometry.
- `prefers-reduced-motion: reduce` renders clean static borderless compositions immediately.
- All ScrollTrigger instances revert cleanly on unmount via `gsap.context()`.
