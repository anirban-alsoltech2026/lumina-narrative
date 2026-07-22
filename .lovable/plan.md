# Premium Editorial Site — Implementation Plan

## Stack adjustment (important)
This project is **TanStack Start + React 19 + Vite 7 + Tailwind v4 + TypeScript**, not a plain Vite `App.jsx/main.jsx` setup. I'll keep everything you asked for and only swap the shell:

- Routing/entry: TanStack Start file-based routes (`src/routes/index.tsx`) instead of `App.jsx`/`main.jsx`.
- Language: **TypeScript** (matches template; stricter, safer for GSAP refs).
- Styling: **Tailwind v4** via `src/styles.css` `@theme` tokens (no `tailwind.config.js`).
- Animation: `gsap`, `@gsap/react` (`useGSAP`), `gsap/ScrollTrigger`, `split-type`, `lenis` (modern package name for Lenis).
- Icons: `lucide-react`. SVGs imported as URL or inline React components.
- Folders added: `src/components`, `src/sections`, `src/animations`, `src/hooks`, `src/assets`, `src/data`, `src/layouts`. `src/styles.css` already exists.

Confirm TS is fine, or say "use JS" and I'll switch to `.jsx`.

## Architecture sketch

```text
src/
  routes/
    __root.tsx            # shell, head metadata, Lenis provider mount
    index.tsx             # single-page composition of sections
  layouts/
    SiteLayout.tsx        # <Nav/> + <main>{children}</main> + <Footer/>
  sections/
    HeroSection.tsx       # S1
    StoryTransition.tsx   # S2
    EditorialStatement.tsx# S3
    Counters.tsx          # S4  (roadmap)
    Showcase.tsx          # S5
    Timeline.tsx          # S6
    Principles.tsx        # S7
    BrandMarquee.tsx      # S8
    Testimonials.tsx      # S9
    CtaBanner.tsx         # S10
    Footer.tsx            # S11-12
  components/             # Section, Heading, Paragraph, Button,
                          # Illustration, Card, Nav, OutlineText
  animations/             # reveal.ts, parallax.ts, morph.ts, counters.ts
  hooks/                  # useLenis.ts, useScrollReveal.ts,
                          # useMagnetic.ts, useSplitText.ts
  data/                   # nav.ts, principles.ts, testimonials.ts
  assets/                 # svg/, img/
```

Data flow: sections are pure presentational, pulling static content from `src/data/*`. Animation hooks own GSAP `context()` scoped to a ref so cleanup on unmount is automatic. Lenis is a single global instance mounted in `__root.tsx` and wired to `ScrollTrigger.update`.

## Design tokens (Tailwind v4, `src/styles.css`)
Add under `@theme`: `--color-ink`, `--color-paper`, `--color-mist`, `--color-accent`, plus `--font-display`, `--font-body`. Load fonts via `<link>` in `__root.tsx` head (never `@import` a URL in v4). Outlined typography via a `.type-outline` `@utility` using `-webkit-text-stroke` + `color: transparent`.

## MVP feature list (S1–S3)

| Section | Components | Interactions |
|---|---|---|
| S1 Hero | `Nav`, `Heading`, `Paragraph`, `Button`, `Illustration` | SplitType headline reveal, staggered subtext + CTA fade, hero SVG parallax on scroll, nav bg turns paper on `scrollY>16` |
| S2 Story transition | `Section`, `OutlineText` | Pinned block, headline crossfade/scale, background morphing SVG path (`MorphSVGPlugin`-free — animate `d` between two paths with GSAP) |
| S3 Editorial statement | `Section`, `OutlineText`, `Paragraph` | Giant outlined word translates horizontally with scroll, foreground paragraph clip-path reveal |

Reusable primitives shipped in MVP: `Section`, `Heading`, `Paragraph`, `Button` (variants: `primary`, `ghost`, `magnetic`), `Illustration`, `Card`, `OutlineText`.

## Example snippets

### Lenis + ScrollTrigger wiring (`src/hooks/useLenis.ts`)
```ts
import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);
}
```

### Hero with SplitType reveal (`src/sections/HeroSection.tsx`)
```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitType from "split-type";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = new SplitType("[data-hero-title]", { types: "lines,words" });
    gsap.from(split.words, {
      yPercent: 120, opacity: 0, duration: 1.1,
      ease: "expo.out", stagger: 0.04,
    });
    gsap.from("[data-hero-sub], [data-hero-cta]", {
      y: 24, opacity: 0, duration: 0.8, ease: "power3.out",
      stagger: 0.1, delay: 0.4,
    });
    gsap.to("[data-hero-art]", {
      yPercent: -12, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  return <section ref={root}> … </section>;
}
```

### Scroll-triggered editorial statement (`src/sections/EditorialStatement.tsx`)
```tsx
useGSAP(() => {
  gsap.to("[data-outline]", {
    xPercent: -30, ease: "none",
    scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
  });
  gsap.from("[data-copy]", {
    clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power4.out",
    scrollTrigger: { trigger: "[data-copy]", start: "top 75%" },
  });
}, { scope: root });
```

### Counters (`src/animations/counters.ts`, used in S4)
```ts
export const animateCounter = (el: HTMLElement, to: number) =>
  gsap.fromTo(el, { innerText: 0 }, {
    innerText: to, duration: 2, ease: "power1.out", snap: { innerText: 1 },
    scrollTrigger: { trigger: el, start: "top 80%" },
  });
```

## Build & run

```bash
bun add gsap @gsap/react split-type lenis lucide-react
bun run dev        # local preview (already running in sandbox)
bun run build      # production build
```

Assets: import SVGs from `src/assets/svg/*.svg` as URLs (`import art from "@/assets/svg/hero.svg"`). Fonts loaded via `<link>` in `__root.tsx` head.

## Phased roadmap & success criteria

- **Phase 1 — MVP (S1–S3)** ✅ done when: hero split-text reveal + nav scroll state, Lenis smooth scroll active, S2 pinned morph plays, S3 outline scrubs and copy clip-reveals. Lighthouse perf ≥ 90 desktop, no CLS from font swap.
- **Phase 2 — Interaction/a11y polish**: `useGSAP` contexts everywhere, `prefers-reduced-motion` bypass, keyboard focus rings on all CTAs, alt text on all illustrations. 60 FPS on mid-tier laptop verified via DevTools.
- **Phase 3 — S4 Counters, S5 Showcase (parallax), S6 Timeline (animated connectors)**: each with its own hook in `src/animations/`.
- **Phase 4 — S7 Principles (stagger cards), S8 Brand marquee, S9 Testimonials**: adds `useMagnetic`, custom cursor, animated underlines.
- **Phase 5 — S10 CTA, S11–12 Footer + rich links**: image masking, clip-path reveals, mobile fallback that disables pinning below `md`.
- **Phase 6 — Perf hardening**: route-level code split (single page, so component-level `React.lazy` for heavy sections), prerendered SVGs, `will-change: transform` only on animating layers, `ScrollTrigger.refresh()` on resize.

## Open questions
1. TS (recommended, matches template) or force JS?
2. Confirm palette hexes + font families so I can seed `@theme` tokens now.
3. Any brand name / hero copy, or use placeholder editorial copy for MVP?
