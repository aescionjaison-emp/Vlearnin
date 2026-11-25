# Mount Carmel University — Verified Typography & Motion Component Mapping

Source: Live browser inspection of `https://mountcarmeluniversity.edu.in/` (`1440×900` & `390×844`) recorded in `typography-audit.json` and `motion-audit.json`.

## 1. Verified Typography Comparison Report

| Reference Element | Actual Reference Font | Reference Size (Desktop / Mobile) | Reference Weight | Reference Line Height | Reference Letter Spacing | New VLEARNIN Value |
|---|---|---|---|---|---|---|
| Hero Heading (`h1`) | `Cormorant Garamond` | `56px` / `36.8px` | `700` | `56px` / `36.8px` (`1.0`) | `normal` | `Cormorant Garamond`, `clamp(36.8px, 4vw, 56px)`, `700`, `1.04` |
| Hero Eyebrow (`h2`) | `Source Sans 3` | `16px` / `14.4px` | `600` | `16px` (`1.0`) | `normal` (`uppercase`) | `Source Sans 3`, `clamp(14.4px, 1.1vw, 16px)`, `600`, `uppercase` |
| Lead Paragraph (`p`) | `Source Sans 3` | `19.2px` / `16px` | `400` | `28.8px` (`1.5`) | `normal` | `Source Sans 3`, `clamp(16px, 1.35vw, 19.2px)`, `400`, `1.5` |
| Section Heading (`h3`) | `Source Sans 3` | `36.8px` / `24px` | `400` | `36.8px` (`1.0`) | `normal` | `Cormorant Garamond` / `Source Sans 3`, `clamp(24px, 2.6vw, 36.8px)` |
| Card Heading (`h4`) | `Source Sans 3` | `24px` | `600` | `31.2px` (`1.3`) | `normal` | `Source Sans 3`, `24px`, `600`, `1.3` |
| Body Copy (`body`) | `Source Sans 3` | `16px` / `16px` | `400` | `24px` (`1.5`) | `normal` | `Source Sans 3`, `16px`, `400`, `1.5` |
| Main Navigation (`nav a`) | `Source Sans 3` | `16px` | `400` | `24px` (`1.5`) | `normal` | `Source Sans 3`, `15px–16px`, `500`, `1.5` |
| Buttons (`.elementor-button`) | `Source Sans 3` | `16px` | `600` | `16px` (`1.0`) | `normal` | `Source Sans 3`, `16px`, `600`, `1.0` |
| Counters | `Source Sans 3` | `56px` | `700` | `56px` (`1.0`) | `normal` | `Source Sans 3`, `56px`, `700`, `1.0` |
| Footer Headings | `Cormorant Garamond` | `27.2px` | `700` | `27.2px` (`1.0`) | `normal` | `Cormorant Garamond`, `27.2px`, `700`, `1.0` |
| Footer Links | `Source Sans 3` | `16px` | `500` | `22.4px` (`1.4`) | `normal` | `Source Sans 3`, `16px`, `500`, `1.4` |

## 2. Animation Reference Matrix

| Area | Observed MCU Effect | Measured Timing | VLEARNIN Component | Implemented Effect |
|---|---|---|---|---|
| Scrolling | Native `scroll-behavior: smooth` (`hasLenis: false`) | Native | `SmoothScrollProvider` | Native `scroll-behavior: smooth` + `ScrollTrigger.refresh()` |
| Hero Background | `backgroundSlideshow: "fade"` | `500ms` | `HeroCarousel` | `500ms` crossfade transition |
| Hero Text & CTAs | Sequential `fadeInUp` | `0ms`, `50ms`, `100ms`, `150ms` | `HeroCarousel` | `50ms` stagger `fadeInUp` (progressive, visible by default) |
| Buttons | `transition: 0.3s ease` + `icon-rotate-btn` | `300ms ease` | `.btn-primary-amber`, `.btn-navy`, `.btn-gold` | `300ms ease` background/border + arrow rotation/nudge |
| Statistics Counters | `.elementor-counter-number` | `1000ms` | `AnimatedCounter` | `1000ms` count-up in `Source Sans 3` `56px` `700` |
| Sections & Cards | `fadeInUp` on scroll | `500–650ms` | `useStaggerReveal`, `Reveal` | Progressive `fadeInUp` (`translateY(14px)`) with `50ms` stagger |
| Footer | Static accessible layout, `500` weight links | `300ms` hover | `GlobalFooter` | `Cormorant Garamond` `27.2px` headings + `300ms` link hover |
