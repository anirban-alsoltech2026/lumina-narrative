import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function EditorialStatement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-outline]",
        { xPercent: 8 },
        {
          xPercent: -32,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );

      gsap.from("[data-copy] p", {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-copy]", start: "top 78%" },
      });

      gsap.from("[data-copy-meta] > *", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-copy-meta]", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="statement"
      ref={root}
      className="relative overflow-hidden bg-paper py-40 md:py-56"
    >
      <div
        data-outline
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[22vw] leading-[0.85] tracking-[-0.04em] type-outline opacity-40 select-none"
        aria-hidden="true"
      >
        attention · attention · attention
      </div>

      <div className="relative mx-auto max-w-[1440px] px-8">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <div className="mb-10 text-xs uppercase tracking-[0.28em] text-ink/60">
              Manifesto — 003
            </div>

            <div data-copy className="space-y-8 font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] tracking-[-0.015em] text-ink">
              <div className="overflow-hidden">
                <p>
                  We do not believe intelligence should replace the clinician.
                </p>
              </div>
              <div className="overflow-hidden">
                <p>
                  We believe it should return the <em className="italic text-accent">room</em> to them —
                  the pause, the eye contact, the notice of what wasn't said.
                </p>
              </div>
              <div className="overflow-hidden">
                <p>
                  Everything we build is measured against a single question:
                  did it make care feel more human?
                </p>
              </div>
            </div>

            <div
              data-copy-meta
              className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8 text-sm text-ink/70"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-ink/10" />
                <div>
                  <div className="text-ink">Dr. Ines Halden</div>
                  <div className="text-xs uppercase tracking-[0.14em] text-ink/50">
                    Founding physician
                  </div>
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-ink/50">
                03 / 12 — Editorial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
