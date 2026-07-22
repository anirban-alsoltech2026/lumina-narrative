import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, Menu, Plus, X } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Lumora Dental | Clarity for every smile" },
      {
        name: "description",
        content: "Clinical intelligence built to help every practice see more and care better.",
      },
    ],
  }),
});

const services = [
  [
    "01",
    "AI diagnostics",
    "Sharper reads, consistent findings and a clearer conversation with every patient.",
  ],
  ["02", "Clinical workflow", "Intelligence that works inside the tools your team already knows."],
  [
    "03",
    "Patient education",
    "Visual evidence that makes treatment easier to understand and trust.",
  ],
  ["04", "Claims review", "Fast, calibrated review with the clinical detail insurers need."],
];

const stories = [
  {
    quote: "Lumora helps us see the detail and gives patients the confidence to act on it.",
    name: "Dr. Maya Chen",
    role: "Clinical Director · Boston",
    stat: "31%",
    label: "more treatment acceptance",
  },
  {
    quote: "The technology disappears into the visit. What remains is a better conversation.",
    name: "Dr. Eli Turner",
    role: "Practice Owner · Austin",
    stat: "2.4×",
    label: "faster case review",
  },
];

function BrandMark() {
  return (
    <a href="#top" className="v-logo" aria-label="Lumora Dental home">
      <img className="brand-icon" src="/logo.png" alt="" />
      <strong>
        LUMORA
        <br />
        DENTAL
      </strong>
    </a>
  );
}

function Home() {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [story, setStory] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("v-menu-lock", menuOpen);
    return () => document.body.classList.remove("v-menu-lock");
  }, [menuOpen]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".v-hero-copy > *", {
        y: 42,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
      gsap.from(".v-tooth-wrap", {
        scale: 0.64,
        opacity: 0,
        rotate: 7,
        duration: 1.5,
        ease: "expo.out",
      });
      gsap.to(".v-tooth", {
        yPercent: -7,
        rotate: -2,
        ease: "none",
        scrollTrigger: { trigger: ".v-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          y: 55,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        }),
      );
      gsap.utils.toArray<HTMLElement>(".v-service-card").forEach((el, i) =>
        gsap.from(el, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.06,
          scrollTrigger: { trigger: ".v-services-grid", start: "top 82%" },
        }),
      );
    },
    { scope: root },
  );

  const activeStory = stories[story];
  return (
    <div ref={root} className="v-site" id="top">
      <header className="v-nav">
        <BrandMark />
        <nav aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#results">Results</a>
          <a href="#about">Our approach</a>
        </nav>
        <div className="v-nav-actions">
          <a href="#contact" className="v-pill v-pill-small">
            Book a demo <ArrowDownRight />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <Menu />
          </button>
        </div>
      </header>

      <div className={`v-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X />
        </button>
        {[
          ["Platform", "#platform"],
          ["Results", "#results"],
          ["Our approach", "#about"],
          ["Contact", "#contact"],
        ].map(([label, href], i) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            <small>0{i + 1}</small>
            {label}
          </a>
        ))}
      </div>

      <main>
        <section className="v-hero">
          <div className="v-hero-copy">
            <p className="v-eyebrow">Dental intelligence · made human</p>
            <h1>
              See more.
              <br />
              Care <em>better.</em>
            </h1>
            <p className="v-lede">
              AI-powered clinical intelligence that helps dental teams find disease earlier, build
              patient trust, and deliver better care.
            </p>
            <div className="v-hero-actions">
              <a className="v-pill v-pill-light" href="#platform">
                Explore the platform <ArrowDownRight />
              </a>
              <a href="#results" className="v-text-link">
                See the evidence <ArrowDownRight />
              </a>
            </div>
          </div>
          <div className="v-tooth-wrap" aria-hidden="true">
            <div className="v-orbit v-orbit-a" />
            <div className="v-orbit v-orbit-b" />
            <div className="v-scan">
              <span>AI analysis</span>
              <i />
            </div>
            <img className="v-tooth" src="/hero-glass-tooth.png" alt="" />
            <span className="v-tag v-tag-a">Caries · 94%</span>
            <span className="v-tag v-tag-b">Clinical view · 01</span>
          </div>
          <div className="v-hero-foot">
            <span>Trusted clinical AI</span>
            <span>Scroll to discover ↓</span>
            <span>01 — 06</span>
          </div>
        </section>

        <section className="v-proof" id="results">
          <div className="v-section-head">
            <span>01 · The evidence</span>
            <span>Intelligence you can measure</span>
          </div>
          <h2 data-reveal>
            Confidence in every
            <br />
            <em>clinical decision.</em>
          </h2>
          <div className="v-metrics">
            {[
              ["50K+", "clinicians supported"],
              ["99.2%", "system availability"],
              ["430M+", "images analyzed"],
              ["47", "clinical patents"],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="v-platform" id="platform">
          <div className="v-section-head">
            <span>02 · One connected platform</span>
            <span>From image to insight</span>
          </div>
          <div className="v-platform-intro" data-reveal>
            <h2>
              Built for the way
              <br />
              dentistry <em>works.</em>
            </h2>
            <p>
              Every part of the clinical journey, connected by intelligence that stays quietly in
              the background.
            </p>
          </div>
          <div className="v-services-grid">
            {services.map(([no, title, copy], i) => (
              <button
                key={title}
                className={`v-service-card ${selected === i ? "is-active" : ""}`}
                onClick={() => setSelected(i)}
              >
                <span>{no}</span>
                <div className="v-service-visual">
                  {i === 0 && <img src="/glass-radiograph.png" alt="" />}
                  {i === 1 && <img src="/glass-practice-ai.png" alt="" />}
                  {i === 2 && <img src="/glass-patient-education.png" alt="" />}
                  {i === 3 && <img src="/glass-claims-review.png" alt="" />}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Plus />
              </button>
            ))}
          </div>
        </section>

        <section className="v-workflow" id="about">
          <div className="v-section-head">
            <span>03 · Inside the workflow</span>
            <span>A clearer path forward</span>
          </div>
          <div className="v-workflow-grid">
            <div data-reveal>
              <p className="v-kicker">One image. A fuller picture.</p>
              <h2>
                Insight arrives
                <br />
                in the <em>moment.</em>
              </h2>
              <p className="v-body-copy">
                Lumora highlights areas of concern as images are captured, giving clinicians a
                consistent second set of eyes without slowing the appointment.
              </p>
              <ul>
                <li>
                  <Check /> Real-time findings
                </li>
                <li>
                  <Check /> Calibrated clinical models
                </li>
                <li>
                  <Check /> Patient-friendly visuals
                </li>
              </ul>
            </div>
            <div className="v-ui-card">
              <div className="v-ui-top">
                <BrandMark />
                <span>Patient 0042 · Today</span>
                <i />
              </div>
              <div className="v-xray">
                <img src="/glass-radiograph.png" alt="Dental x-ray analysis" />
                <span className="v-focus-box">94%</span>
                <div className="v-crosshair" />
              </div>
              <div className="v-ui-bottom">
                <div>
                  <small>Finding</small>
                  <b>Interproximal caries</b>
                </div>
                <div>
                  <small>Confidence</small>
                  <b>High · 94%</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="v-stories">
          <div className="v-section-head">
            <span>04 · In practice</span>
            <span>Real teams. Real change.</span>
          </div>
          <div className="v-story-grid">
            <div className="v-story-copy" key={story}>
              <p className="v-quote">“{activeStory.quote}”</p>
              <div>
                <strong>{activeStory.name}</strong>
                <span>{activeStory.role}</span>
              </div>
              <div className="v-story-nav">
                <button
                  onClick={() => setStory((story - 1 + stories.length) % stories.length)}
                  aria-label="Previous story"
                >
                  <ArrowLeft />
                </button>
                <span>
                  0{story + 1} / 0{stories.length}
                </span>
                <button
                  onClick={() => setStory((story + 1) % stories.length)}
                  aria-label="Next story"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="v-story-image">
              <img src="/glass-team.png" alt="Dental team collaborating" />
              <div>
                <strong>{activeStory.stat}</strong>
                <span>{activeStory.label}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="v-contact" id="contact">
          <div>
            <p className="v-eyebrow">A smarter standard of care</p>
            <h2>
              Ready to see what
              <br />
              your practice can <em>see?</em>
            </h2>
          </div>
          <a href="mailto:hello@lumoradental.com" className="v-contact-circle">
            Start a conversation <ArrowDownRight />
          </a>
          <img src="/hero-glass-tooth-wbg.png" alt="" aria-hidden="true" />
        </section>
      </main>
      <footer className="v-footer">
        <BrandMark />
        <p>
          Intelligence for dentistry.
          <br />
          Designed around people.
        </p>
        <div>
          <a href="#platform">Platform</a>
          <a href="#results">Evidence</a>
          <a href="#about">Company</a>
        </div>
        <div>
          <span>Boston · USA</span>
          <span>© 2026 Lumora Dental</span>
        </div>
      </footer>
    </div>
  );
}
