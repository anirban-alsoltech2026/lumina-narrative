import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const title = root.current?.querySelector<HTMLElement>("[data-hero-title]");
      if (!title) return;
      const split = new SplitType(title, { types: "lines,words" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(split.words, { yPercent: 130, opacity: 0, duration: 1.2, stagger: 0.035 })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 12, duration: 0.6 }, 0.1)
        .from("[data-hero-sub]", { opacity: 0, y: 20, duration: 0.9 }, 0.4)
        .from("[data-hero-cta] > *", { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 }, 0.55)
        .from("[data-hero-meta] > *", { opacity: 0, y: 10, duration: 0.6, stagger: 0.08 }, 0.7)
        .from("[data-hero-art]", { opacity: 0, scale: 0.94, duration: 1.4, ease: "power3.out" }, 0.2);

      gsap.to("[data-hero-art]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-orb]", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative overflow-hidden bg-paper pt-40 pb-24 md:pt-48 md:pb-32"
    >
      {/* background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-ink/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div
            data-hero-eyebrow
            className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-ink/60"
          >
            <span className="h-px w-10 bg-ink/40" />
            A quiet intelligence for human health
          </div>

          <h1
            data-hero-title
            className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.03em] text-ink"
          >
            Care, rewritten
            <br />
            in the language
            <br />
            of <em className="italic text-accent">attention</em>.
          </h1>

          <p
            data-hero-sub
            className="mt-10 max-w-xl text-lg leading-relaxed text-ink/70"
          >
            Aether is a clinical intelligence layer that listens to the small signals —
            the ones between vitals, between visits — and returns time to the people
            who practice medicine.
          </p>

          <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm uppercase tracking-[0.14em] text-paper transition-transform hover:-translate-y-0.5"
            >
              Begin the pilot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#story"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-4 text-sm uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink/5"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              Watch the film
            </a>
          </div>

          <div
            data-hero-meta
            className="mt-16 grid max-w-lg grid-cols-3 gap-8 border-t border-ink/10 pt-8"
          >
            <div>
              <div className="font-display text-3xl text-ink">14</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/60">
                Health systems
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-ink">2.1M</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/60">
                Encounters
              </div>
            </div>
            <div>
              <div className="font-display text-3xl text-ink">↓ 38%</div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/60">
                Chart hours
              </div>
            </div>
          </div>
        </div>

        {/* Right: organic SVG illustration */}
        <div className="relative lg:col-span-5">
          <div
            data-hero-orb
            className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-accent/25 blur-2xl"
          />
          <svg
            data-hero-art
            viewBox="0 0 500 620"
            className="relative mx-auto h-auto w-full max-w-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.52 0.06 165)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="oklch(0.19 0.015 160)" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.93 0.008 140)" />
                <stop offset="100%" stopColor="oklch(0.976 0.006 90)" />
              </linearGradient>
            </defs>

            {/* soft organic blob */}
            <path
              d="M250 40 C 370 40, 460 140, 460 260 C 460 400, 380 520, 250 560 C 130 590, 40 460, 40 320 C 40 180, 130 40, 250 40 Z"
              fill="url(#g2)"
            />

            {/* orbital rings */}
            <ellipse cx="250" cy="310" rx="180" ry="60" stroke="oklch(0.19 0.015 160 / 0.15)" strokeWidth="1" transform="rotate(-18 250 310)" />
            <ellipse cx="250" cy="310" rx="200" ry="75" stroke="oklch(0.19 0.015 160 / 0.12)" strokeWidth="1" transform="rotate(24 250 310)" />

            {/* central form */}
            <circle cx="250" cy="310" r="90" fill="url(#g1)" />
            <circle cx="250" cy="310" r="90" stroke="oklch(0.976 0.006 90 / 0.3)" strokeWidth="1" />

            {/* pulse line */}
            <path
              d="M80 430 L 170 430 L 195 400 L 220 460 L 245 380 L 270 470 L 295 430 L 420 430"
              stroke="oklch(0.19 0.015 160)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* small nodes */}
            <circle cx="120" cy="180" r="4" fill="oklch(0.52 0.06 165)" />
            <circle cx="400" cy="200" r="3" fill="oklch(0.19 0.015 160)" />
            <circle cx="380" cy="440" r="5" fill="oklch(0.52 0.06 165)" />
            <circle cx="140" cy="480" r="3" fill="oklch(0.19 0.015 160)" />
          </svg>
        </div>
      </div>

      {/* scroll cue */}
      <div className="mx-auto mt-16 flex max-w-[1440px] items-center justify-between px-8 text-xs uppercase tracking-[0.24em] text-ink/50">
        <span>Scroll to enter</span>
        <span className="tabular-nums">01 / 12</span>
      </div>
    </section>
  );
}
