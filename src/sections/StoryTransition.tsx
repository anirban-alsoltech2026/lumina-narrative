import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PATH_A =
  "M20,300 C120,180 260,180 360,300 C460,420 600,420 700,300 C800,180 940,180 1040,300";
const PATH_B =
  "M20,300 C160,420 260,120 420,300 C580,480 720,120 880,300 C960,400 1000,340 1040,300";

export function StoryTransition() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const path = root.current?.querySelector<SVGPathElement>("[data-morph]");
      if (!path) return;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 0.8,
        animation: gsap
          .timeline()
          .to(path, { attr: { d: PATH_B }, ease: "sine.inOut" })
          .to("[data-story-a]", { opacity: 0, yPercent: -20, ease: "power2.in" }, 0)
          .fromTo(
            "[data-story-b]",
            { opacity: 0, yPercent: 20 },
            { opacity: 1, yPercent: 0, ease: "power2.out" },
            0.35,
          ),
      });
    },
    { scope: root },
  );

  return (
    <section
      id="story"
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-ink text-paper"
    >
      <svg
        viewBox="0 0 1060 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
        aria-hidden="true"
      >
        <path
          data-morph
          d={PATH_A}
          stroke="oklch(0.52 0.06 165)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={PATH_A}
          stroke="oklch(0.976 0.006 90 / 0.1)"
          strokeWidth="1"
          fill="none"
          transform="translate(0,40)"
        />
      </svg>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-8">
        <div className="grid w-full grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="mb-6 text-xs uppercase tracking-[0.28em] text-paper/50">
              Chapter I — Presence
            </div>

            <h2
              data-story-a
              className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Medicine forgot
              <br />
              how to <em className="italic text-accent">listen</em>.
            </h2>

            <h2
              data-story-b
              className="absolute font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
              style={{ opacity: 0 }}
            >
              We built a way
              <br />
              back to <em className="italic text-accent">attention</em>.
            </h2>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-paper/50">
        <span>Story · scene 02</span>
        <span className="tabular-nums">02 / 12</span>
      </div>
    </section>
  );
}
