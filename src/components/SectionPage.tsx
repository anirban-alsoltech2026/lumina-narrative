import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { useLenis } from "@/hooks/useLenis";

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

const pageData: Record<PageKind, {
  marquee: string;
  statement: string;
  featureTitle: string;
  featureCopy: string;
  stats: [string, string][];
  cards: [string, string][];
}> = {
  edge: {
    marquee: "HOW IT WORKS",
    statement: "VideaHealth's AI factory, committed to speed to value, leverages algorithms, analytics, and health data to radically accelerate and improve decision-making across dentistry.",
    featureTitle: "AI Factory",
    featureCopy: "A platform built to discover meaningful clinical signals, turn them into precise intelligence, and deploy that intelligence directly into the moments where care decisions happen.",
    stats: [["30%", "More accurate than an average dental clinician"], ["15+", "Clinical indicators detected"], ["100+", "Provider power users"]],
    cards: [["Clinical AI", "Continuously trained models reveal conditions with speed and consistency."], ["Business Intelligence", "Operational signals help teams understand performance and opportunity."], ["Connected Workflows", "Insights appear inside the systems practices and insurers already use."]],
  },
  practices: {
    marquee: "FOR PRACTICES",
    statement: "Give every provider another set of eyes and every patient a clearer understanding of their oral health.",
    featureTitle: "Better conversations. Better care.",
    featureCopy: "VideaAI helps clinicians detect conditions earlier, communicate findings visually, and build trust at the chair with consistent, evidence-backed intelligence.",
    stats: [["2x", "Higher case acceptance"], ["90%", "Patients better understand treatment"], ["10 sec", "To analyze a radiograph"]],
    cards: [["Accurate Diagnosis", "Surface potential findings while the clinician remains fully in control."], ["Patient Education", "Make invisible conditions easier for patients to see and understand."], ["Practice Growth", "Turn stronger clinical confidence into healthier business performance."]],
  },
  insurers: {
    marquee: "FOR INSURERS",
    statement: "Transform claim review with clinical intelligence that is fast, consistent, explainable, and built for dental workflows.",
    featureTitle: "Intelligent review at scale",
    featureCopy: "Automated radiographic analysis helps teams prioritize complex claims, reduce manual effort, and make more consistent decisions without sacrificing clinical rigor.",
    stats: [["50%", "Faster review cycles"], ["24/7", "Consistent automated analysis"], ["1 view", "Unified clinical evidence"]],
    cards: [["Consistency", "Apply the same clinical criteria across every review."], ["Efficiency", "Focus expert attention on the claims that need it most."], ["Transparency", "Support decisions with visible, traceable clinical evidence."]],
  },
  about: {
    marquee: "OUR STORY",
    statement: "We measure impact by how many lives we positively touch. We are building toward a future where every dental patient receives an accurate diagnosis.",
    featureTitle: "The power of AI, built by people",
    featureCopy: "Our team brings together clinicians, scientists, engineers, operators, and builders who believe technology should make care more human.",
    stats: [["2018", "Videa Health founded"], ["100+", "Team members"], ["1 goal", "Better dentistry for everyone"]],
    cards: [["Speed", "We move with purpose because better care should not wait."], ["Grow", "We learn quickly and help one another reach higher."], ["Build Community", "The best outcomes come from trust, inclusion, and shared ambition."]],
  },
  careers: {
    marquee: "CAREERS",
    statement: "Join a team using responsible AI to improve the experience of dentistry for clinicians, patients, and organizations everywhere.",
    featureTitle: "Build what matters",
    featureCopy: "Work alongside curious people solving meaningful problems at the intersection of healthcare, artificial intelligence, and human experience.",
    stats: [["Remote", "Flexible ways of working"], ["Mission", "Impact you can see"], ["Together", "A team that builds openly"]],
    cards: [["Make an Impact", "Your work reaches real clinicians and patients."], ["Keep Learning", "Tackle difficult problems with generous, talented teammates."], ["Be Yourself", "Bring your perspective and help shape how we grow."]],
  },
  press: {
    marquee: "IN THE NEWS",
    statement: "Follow the milestones, research, partnerships, and people advancing a new standard of intelligence in dentistry.",
    featureTitle: "The latest from Videa",
    featureCopy: "News from the frontier of dental AI, from product launches and clinical validation to industry partnerships and company growth.",
    stats: [["2026", "Continuing the momentum"], ["50+", "Industry stories"], ["Global", "Growing clinical reach"]],
    cards: [["VideaAI expands clinical capabilities", "A broader set of radiographic findings gives providers more intelligence chairside."], ["New insurance partnerships", "Leading organizations adopt AI-assisted review at scale."], ["Research and validation", "New evidence continues to demonstrate the value of dental AI."]],
  },
};

const people = ["Florian Hillen", "Shahid Jabbari, PhD", "Christian Ladig, PhD", "Rabe Jaraybhand, DMD"];

export function SectionPage({ kind, number, kicker, title, copy, previous, next }: SectionPageProps) {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const data = pageData[kind];

  useGSAP(() => {
    gsap.from(".page-reveal", { opacity: 0, y: 55, duration: 1, stagger: .08, ease: "power3.out" });
    gsap.from(".page-art", { opacity: 0, scale: .72, rotation: -8, duration: 1.25, ease: "expo.out" });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
      gsap.from(section.querySelectorAll("[data-item]"), { opacity: 0, y: 55, duration: .9, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 76%" } });
    });
    gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
      gsap.to(track, { xPercent: -28, ease: "none", scrollTrigger: { trigger: track.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    gsap.utils.toArray<HTMLElement>(".editorial-image").forEach((image) => {
      gsap.fromTo(image, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }, { scope: root });

  return <div ref={root} className="site-shell">
    <Nav />
    <main>
      <section className="long-hero">
        <div className="long-hero-copy">
          <span className="page-no page-reveal">{number}</span>
          <p className="panel-kicker page-reveal">{kicker}</p>
          <h1 className="page-reveal">{title}</h1>
          <p className="page-reveal">{copy}</p>
          <a className="small-outline page-reveal" href="#story">Explore <ArrowRight /></a>
        </div>
        <div className={`page-art art-${kind}`} aria-hidden="true">
          <div className="fold fold-a" /><div className="fold fold-b" />
          {kind === "edge" ? <img src="/hero-tooth.png" alt="" /> : <strong>{kind === "practices" ? "AI / PRACTICE" : kind === "insurers" ? "CLAIM / REVIEW" : kind === "about" ? "VIDEA / PEOPLE" : kind === "careers" ? "BUILD / WITH US" : "LATEST / NEWS"}</strong>}
        </div>
      </section>

      <section id="story" className="statement-band" data-reveal>
        <p data-item>{data.statement}</p>
      </section>

      <section className="marquee-band" aria-hidden="true"><div className="marquee-track">{data.marquee} — {data.marquee} — {data.marquee} —</div></section>

      <section className="feature-band" data-reveal>
        <div className="feature-copy"><span data-item>01 / Intelligence</span><h2 data-item>{data.featureTitle}</h2><p data-item>{data.featureCopy}</p></div>
        <div className="editorial-frame" data-item><div className={`editorial-image visual-${kind}`}><span>{kind.toUpperCase()}</span></div></div>
      </section>

      <section className="cards-band" data-reveal>
        {data.cards.map(([heading, body], index) => <article key={heading} data-item><span>0{index + 1}</span><h3>{heading}</h3><p>{body}</p></article>)}
      </section>

      <section className="stats-band" data-reveal>
        <div className="marquee-inline">IN NUMBERS — IN NUMBERS —</div>
        <div className="stats-grid">{data.stats.map(([value, label]) => <div key={value} data-item><strong>{value}</strong><p>{label}</p></div>)}</div>
      </section>

      {kind === "about" && <section className="people-band" data-reveal><div className="section-rule"><span>Team Members</span></div><div className="people-grid">{people.map((person, index) => <article key={person} data-item><div className={`portrait portrait-${index + 1}`} /><h3>{person}</h3><p>Leadership Team</p></article>)}</div></section>}

      {kind === "press" && <section className="people-band news-band" data-reveal><div className="section-rule"><span>Latest Stories</span></div><div className="people-grid">{data.cards.map(([headline], index) => <article key={headline} data-item><div className={`portrait news-${index + 1}`} /><p>July {18 - index}, 2026</p><h3>{headline}</h3></article>)}</div></section>}

      <section className="route-end">
        <a href={previous}><ArrowLeft /> Previous</a><p>Continue exploring Videa Health</p><a href={next}>Next <ArrowRight /></a>
      </section>
    </main>
    <footer id="contact" className="page-footer"><div className="footer-top"><h2>Let's talk.</h2><a href="mailto:contact@videa.ai">contact@videa.ai <ArrowUpRight /></a></div></footer>
  </div>;
}
