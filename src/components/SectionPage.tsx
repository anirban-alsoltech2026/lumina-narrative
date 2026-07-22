import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { useLenis } from "@/hooks/useLenis";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type PageKind = "edge" | "practices" | "insurers" | "about" | "careers" | "press";
export type SectionPageProps = {
  kind: PageKind;
  number: string;
  kicker: string;
  title: React.ReactNode;
  copy: string;
  theme: "panel-white" | "panel-cyan" | "panel-black" | "panel-blue";
  previous: string;
  next: string;
};

const pageData: Record<
  PageKind,
  {
    marquee: string;
    statement: string;
    featureTitle: string;
    featureCopy: string;
    stats: [string, string][];
    cards: [string, string][];
  }
> = {
  edge: {
    marquee: "HOW IT WORKS",
    statement:
      "Lumora Dental's AI platform leverages algorithms, analytics, and clinical data to radically accelerate and improve decision-making across dentistry.",
    featureTitle: "AI Factory",
    featureCopy:
      "A platform built to discover meaningful clinical signals, turn them into precise intelligence, and deploy that intelligence directly into the moments where care decisions happen.",
    stats: [
      ["30%", "More accurate than an average dental clinician"],
      ["15+", "Clinical indicators detected"],
      ["100+", "Provider power users"],
    ],
    cards: [
      ["Clinical AI", "Continuously trained models reveal conditions with speed and consistency."],
      [
        "Business Intelligence",
        "Operational signals help teams understand performance and opportunity.",
      ],
      [
        "Connected Workflows",
        "Insights appear inside the systems practices and insurers already use.",
      ],
    ],
  },
  practices: {
    marquee: "FOR PRACTICES",
    statement:
      "Give every provider another set of eyes and every patient a clearer understanding of their oral health.",
    featureTitle: "Better conversations. Better care.",
    featureCopy:
      "Lumora AI helps clinicians detect conditions earlier, communicate findings visually, and build trust at the chair with consistent, evidence-backed intelligence.",
    stats: [
      ["2x", "Higher case acceptance"],
      ["90%", "Patients better understand treatment"],
      ["10 sec", "To analyze a radiograph"],
    ],
    cards: [
      [
        "Accurate Diagnosis",
        "Surface potential findings while the clinician remains fully in control.",
      ],
      ["Patient Education", "Make invisible conditions easier for patients to see and understand."],
      ["Practice Growth", "Turn stronger clinical confidence into healthier business performance."],
    ],
  },
  insurers: {
    marquee: "FOR INSURERS",
    statement:
      "Transform claim review with clinical intelligence that is fast, consistent, explainable, and built for dental workflows.",
    featureTitle: "Intelligent review at scale",
    featureCopy:
      "Automated radiographic analysis helps teams prioritize complex claims, reduce manual effort, and make more consistent decisions without sacrificing clinical rigor.",
    stats: [
      ["50%", "Faster review cycles"],
      ["24/7", "Consistent automated analysis"],
      ["1 view", "Unified clinical evidence"],
    ],
    cards: [
      ["Consistency", "Apply the same clinical criteria across every review."],
      ["Efficiency", "Focus expert attention on the claims that need it most."],
      ["Transparency", "Support decisions with visible, traceable clinical evidence."],
    ],
  },
  about: {
    marquee: "OUR STORY",
    statement:
      "We measure impact by how many lives we positively touch. We are building toward a future where every dental patient receives an accurate diagnosis.",
    featureTitle: "The power of AI, built by people",
    featureCopy:
      "Our team brings together clinicians, scientists, engineers, operators, and builders who believe technology should make care more human.",
    stats: [
      ["2018", "Lumora Dental founded"],
      ["100+", "Team members"],
      ["1 goal", "Better dentistry for everyone"],
    ],
    cards: [
      ["Speed", "We move with purpose because better care should not wait."],
      ["Grow", "We learn quickly and help one another reach higher."],
      ["Build Community", "The best outcomes come from trust, inclusion, and shared ambition."],
    ],
  },
  careers: {
    marquee: "CAREERS",
    statement:
      "Join a team using responsible AI to improve the experience of dentistry for clinicians, patients, and organizations everywhere.",
    featureTitle: "Build what matters",
    featureCopy:
      "Work alongside curious people solving meaningful problems at the intersection of healthcare, artificial intelligence, and human experience.",
    stats: [
      ["Remote", "Flexible ways of working"],
      ["Mission", "Impact you can see"],
      ["Together", "A team that builds openly"],
    ],
    cards: [
      ["Make an Impact", "Your work reaches real clinicians and patients."],
      ["Keep Learning", "Tackle difficult problems with generous, talented teammates."],
      ["Be Yourself", "Bring your perspective and help shape how we grow."],
    ],
  },
  press: {
    marquee: "IN THE NEWS",
    statement:
      "Follow the milestones, research, partnerships, and people advancing a new standard of intelligence in dentistry.",
    featureTitle: "The latest from Lumora",
    featureCopy:
      "News from the frontier of dental AI, from product launches and clinical validation to industry partnerships and company growth.",
    stats: [
      ["2026", "Continuing the momentum"],
      ["50+", "Industry stories"],
      ["Global", "Growing clinical reach"],
    ],
    cards: [
      [
        "Lumora AI expands clinical capabilities",
        "A broader set of radiographic findings gives providers more intelligence chairside.",
      ],
      ["New insurance partnerships", "Leading organizations adopt AI-assisted review at scale."],
      ["Research and validation", "New evidence continues to demonstrate the value of dental AI."],
    ],
  },
};

const people = [
  "Florian Hillen",
  "Shahid Jabbari, PhD",
  "Christian Ladig, PhD",
  "Rabe Jaraybhand, DMD",
];
const pageAssets: Record<PageKind, string> = {
  edge: "/hero-glass-tooth.png",
  practices: "/glass-practice-ai.png",
  insurers: "/glass-claims-ai.png",
  about: "/glass-radiograph.png",
  careers: "/glass-team.png",
  press: "/glass-news-tablet.png",
};

export function SectionPage({
  kind,
  number,
  kicker,
  title,
  copy,
  previous,
  next,
}: SectionPageProps) {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const data = pageData[kind];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-item], .page-reveal, .page-art", { clearProps: "all" });
        return;
      }

      const hero = gsap.timeline({ defaults: { ease: "power4.out" } });
      hero
        .from(".page-no, .panel-kicker", { opacity: 0, y: 16, duration: 0.65, stagger: 0.08 })
        .from(
          ".long-hero h1",
          { yPercent: 16, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.05 },
          0.08,
        )
        .from(
          ".long-hero-copy > p:last-of-type, .small-outline",
          { opacity: 0, y: 26, duration: 0.8, stagger: 0.1 },
          0.42,
        )
        .from(
          ".page-art",
          {
            clipPath: "inset(14% 14% 14% 14% round 42%)",
            opacity: 0,
            scale: 0.82,
            rotation: -7,
            duration: 1.35,
            ease: "expo.out",
          },
          0.12,
        )
        .from(
          ".page-art .fold",
          { scale: 0.45, opacity: 0, stagger: 0.12, duration: 1.1, ease: "back.out(1.35)" },
          0.3,
        )
        .from(
          ".page-art img, .page-art strong",
          { opacity: 0, yPercent: 9, scale: 0.92, duration: 1, ease: "power3.out" },
          0.5,
        );

      gsap.to(".page-art", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: { trigger: ".long-hero", start: "top top", end: "bottom top", scrub: 0.8 },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>("[data-item]");
        gsap.from(items, {
          opacity: 0,
          y: 64,
          rotateX: 5,
          duration: 1.05,
          stagger: 0.11,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });

        const rule = section.querySelector<HTMLElement>(".section-rule");
        if (rule)
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });
      });
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
        gsap.to(track, {
          xPercent: -28,
          ease: "none",
          scrollTrigger: {
            trigger: track.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      gsap.utils.toArray<HTMLElement>(".editorial-image").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".stats-grid strong, .value-grid strong").forEach((stat) => {
        gsap.from(stat, {
          opacity: 0,
          scale: 0.72,
          transformOrigin: "left bottom",
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: stat, start: "top 88%", once: true },
        });
      });

      gsap.from(".page-footer .footer-top > *", {
        opacity: 0,
        y: 70,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".page-footer", start: "top 78%", once: true },
      });
    },
    { scope: root, dependencies: [kind], revertOnUpdate: true },
  );

  const isProduct = kind === "practices" || kind === "insurers";

  return (
    <motion.div
      ref={root}
      className={`site-shell page-${kind}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Nav />
      <main>
        <section className="long-hero">
          <div className="long-hero-copy">
            <span className="page-no page-reveal">{number}</span>
            <p className="panel-kicker page-reveal">{kicker}</p>
            <h1 className="page-reveal">{title}</h1>
            <p className="page-reveal">{copy}</p>
            <a className="small-outline page-reveal" href="#story">
              Explore <ArrowRight />
            </a>
          </div>
          <motion.div
            className={`page-art art-${kind}`}
            aria-hidden="true"
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 130, damping: 20 }}
          >
            <div className="fold fold-a" />
            <div className="fold fold-b" />
            <img src={pageAssets[kind]} alt="" />
          </motion.div>
        </section>

        <section id="story" className="statement-band" data-reveal>
          <p data-item>{data.statement}</p>
        </section>

        <section className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            {data.marquee} — {data.marquee} — {data.marquee} —
          </div>
        </section>

        <section className="feature-band" data-reveal>
          <div className="feature-copy">
            <span data-item>01 / Intelligence</span>
            <h2 data-item>{data.featureTitle}</h2>
            <p data-item>{data.featureCopy}</p>
          </div>
          <div className="editorial-frame" data-item>
            <div className={`editorial-image visual-${kind}`}>
              <span>{kind.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {(kind === "practices" || kind === "insurers") && (
          <>
            <section className="help-band" data-reveal>
              <div className="help-heading" data-item>
                <span>02 / How we help</span>
                <h2>How we help</h2>
              </div>
              <div className="help-grid">
                {data.cards.map(([heading, body], index) => (
                  <article key={heading} data-item>
                    <div className={`help-image help-${index + 1}`}>
                      <b>{index + 1}</b>
                    </div>
                    <h3>{heading}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="solutions-band" data-reveal>
              <div className="solutions-title" data-item>
                <span>03 / Our Solutions</span>
                <h2>Our solutions</h2>
              </div>
              <div className="solution-row" data-item>
                <div>
                  <h3>{kind === "practices" ? "Lumora Insights" : "Automatic Claim Review"}</h3>
                  <p>
                    {kind === "practices"
                      ? "Know where your practice stands and uncover opportunities with powerful clinical and business intelligence."
                      : "AI-assisted radiographic review helps claims teams determine clinical necessity with speed and consistency."}
                  </p>
                </div>
                <div className="software-window">
                  <i />
                  <i />
                  <i />
                  <span />
                  <span />
                  <span />
                  <strong>{kind === "practices" ? "INSIGHTS" : "CLAIM REVIEW"}</strong>
                </div>
              </div>
              <div className="solution-row reverse" data-item>
                <div>
                  <h3>{kind === "practices" ? "Implementation" : "FWA Protection"}</h3>
                  <p>
                    A focused implementation program connects Lumora intelligence to existing teams,
                    systems, and workflows.
                  </p>
                </div>
                <div className="software-window laptop">
                  <i />
                  <i />
                  <i />
                  <span />
                  <span />
                  <strong>LUMORA AI</strong>
                </div>
              </div>
            </section>
            <section className="testimonial-band" data-reveal>
              <div className="marquee-track" aria-hidden="true">
                TESTIMONIALS — TESTIMONIALS —
              </div>
              <blockquote data-item>
                “Lumora Dental gives our teams clear clinical intelligence while helping us move
                faster, communicate better, and deliver a more consistent experience.”
              </blockquote>
              <p data-item>Lumora Dental customer</p>
            </section>
          </>
        )}

        {!isProduct && kind !== "press" && (
          <section className="cards-band" data-reveal>
            {data.cards.map(([heading, body], index) => (
              <article key={heading} data-item>
                <span>0{index + 1}</span>
                <h3>{heading}</h3>
                <p>{body}</p>
              </article>
            ))}
          </section>
        )}

        {(kind === "edge" || kind === "about") && (
          <section className="stats-band" data-reveal>
            <div className="marquee-inline">IN NUMBERS — IN NUMBERS —</div>
            <div className="stats-grid">
              {data.stats.map(([value, label]) => (
                <div key={value} data-item>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {isProduct && (
          <section className="value-band" data-reveal>
            <div className="marquee-track" aria-hidden="true">
              VALUE DELIVERED — VALUE DELIVERED —
            </div>
            <div className="value-grid">
              {data.stats.map(([value, label]) => (
                <article key={value} data-item>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </article>
              ))}
            </div>
            <a className="about-handoff" href="/about" data-item>
              <span>Next section</span>
              <b>About Us</b>
              <ArrowRight />
            </a>
          </section>
        )}

        {kind === "about" && (
          <section className="people-band" data-reveal>
            <div className="section-rule">
              <span>Team Members</span>
            </div>
            <div className="people-grid">
              {people.map((person, index) => (
                <article key={person} data-item>
                  <div className={`portrait portrait-${index + 1}`} />
                  <h3>{person}</h3>
                  <p>Leadership Team</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {kind === "press" && (
          <section className="people-band news-band" data-reveal>
            <div className="section-rule">
              <span>Latest Stories</span>
            </div>
            <div className="people-grid">
              {data.cards.map(([headline], index) => (
                <article key={headline} data-item>
                  <div className={`portrait news-${index + 1}`} />
                  <p>July {18 - index}, 2026</p>
                  <h3>{headline}</h3>
                </article>
              ))}
            </div>
          </section>
        )}

        {kind === "careers" && (
          <section className="jobs-band" data-reveal>
            <div className="section-rule" data-item>
              <span>Open Positions</span>
            </div>
            {[
              "Senior Machine Learning Engineer",
              "Clinical Product Manager",
              "Customer Success Lead",
            ].map((role, index) => (
              <a href="mailto:careers@lumoradental.com" key={role} data-item>
                <span>0{index + 1}</span>
                <b>{role}</b>
                <em>View role</em>
                <ArrowUpRight />
              </a>
            ))}
          </section>
        )}

        <section className="route-end">
          <a href={previous}>
            <ArrowLeft /> Previous
          </a>
          <p>Continue exploring Lumora Dental</p>
          <a href={next}>
            Next <ArrowRight />
          </a>
        </section>
      </main>
      <footer id="contact" className="page-footer">
        <div className="footer-top">
          <h2>Let's talk.</h2>
          <a href="mailto:hello@lumoradental.com">
            hello@lumoradental.com <ArrowUpRight />
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
