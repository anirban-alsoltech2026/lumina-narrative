import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import { Nav } from "@/components/Nav";
import { useLenis } from "@/hooks/useLenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [
    { title: "Videa | AI-powered dentistry" },
    { name: "description", content: "Transforming dentistry through intelligent dental X-ray analysis." },
  ]}),
});

const slides = [
  { title: <>Transforming<br />Dentistry<br />Through AI</>, copy: "By applying AI to X-ray analysis, we unlock insights, experiences, and efficiencies that drive breakthroughs in clinical outcomes and economics for dentists and insurers.", label: "Our Edge", href: "/our-edge", art: "tooth" },
  { title: <>AI Powered<br />Dentistry</>, copy: "Advanced clinical and business intelligence built to improve patient outcomes and strengthen dental practices.", label: "For Practices", href: "/for-practices", art: "practice" },
  { title: <>Intelligent<br />Claim Review</>, copy: "Faster, more consistent dental claim review powered by precise clinical intelligence.", label: "For Insurers", href: "/for-insurers", art: "insurer" },
  { title: <>Meet The<br />Videa Team</>, copy: "A team committed to unlocking dentistry's full potential for better experiences and outcomes.", label: "About Us", href: "/about", art: "team" },
  { title: <>Work<br />With Us</>, copy: "Join us on our journey to transform the dental industry.", label: "Careers", href: "/careers", art: "careers" },
  { title: <>Stay<br />Up To Date</>, copy: "Explore the latest announcements, stories, and updates from Videa Health.", label: "Press", href: "/press", art: "press" },
];

function Home() {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const direction = useRef(1);
  const slide = slides[active];

  const move = (next: number) => {
    direction.current = next > active || (active === slides.length - 1 && next === 0) ? 1 : -1;
    setActive((next + slides.length) % slides.length);
  };
  useGSAP(() => {
    gsap.from("[data-hero-line]", { yPercent: 110, duration: 1.15, stagger: .08, ease: "power4.out" });
    gsap.from(".hero-copy, .hero-link", { opacity: 0, y: 24, duration: .8, stagger: .1, delay: .45 });
    gsap.from(".hero-shape", { scale: .4, opacity: 0, duration: 1.2, stagger: .12, ease: "expo.out" });
  }, { scope: root });

  useEffect(() => { ScrollTrigger.refresh(); }, []);
  useEffect(() => {
    const amount = direction.current * 48;
    gsap.fromTo(".hero-slide-content", { opacity: 0, y: amount }, { opacity: 1, y: 0, duration: .7, ease: "power3.out" });
    gsap.fromTo(".hero-visual-inner", { opacity: 0, y: amount * .65 }, { opacity: 1, y: 0, duration: .85, ease: "power3.out" });
  }, [active]);
  useEffect(() => {
    let locked = false;
    const unlock = () => { locked = false; };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12 || locked) return;
      event.preventDefault();
      locked = true;
      move(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(unlock, 850);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") move(active + 1);
      if (event.key === "ArrowUp") move(active - 1);
    };
    const hero = root.current?.querySelector(".hero");
    hero?.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      hero?.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return <div ref={root} className="site-shell">
    <Nav />
    <main>
      <section id="home" className="hero">
        <div className="hero-visual" aria-hidden="true">
          <div key={active} className={`hero-visual-inner art-${slide.art}`}>
            <div className="hero-shape shape-cyan" />
            <div className="hero-shape shape-blue" />
            {slide.art === "tooth" ? <img className="hero-tooth" src="/hero-tooth.png" alt="" /> : <div className="slide-symbol">{active === 1 ? "PRACTICE / AI" : active === 2 ? "CLAIM / AI" : active === 3 ? "VIDEA / TEAM" : active === 4 ? "JOIN / US" : "NEWS / 06"}</div>}
            <span className="diagnostic-ring ring-one">0{active + 1}</span>
            <span className="diagnostic-ring ring-two">AI</span>
          </div>
        </div>
        <div className="hero-inner">
          <div key={active} className="hero-slide-content">
            <h1>{slide.title}</h1>
            <p className="hero-copy">{slide.copy}</p>
            <a className="hero-link" href={slide.href}>{slide.label} <ArrowDown size={18} /></a>
          </div>
        </div>
        <div className="hero-dots" aria-label="Carousel pagination">{slides.map((item, index) => <button key={item.label} className={index === active ? "active" : ""} onClick={() => move(index)} aria-label={`Show ${item.label}`} />)}</div>
        <div className="carousel-controls">
          <button onClick={() => move(active - 1)} aria-label="Previous slide"><ChevronUp /></button>
          <button onClick={() => move(active + 1)} aria-label="Next slide"><ChevronDown /></button>
        </div>
      </section>
    </main>
  </div>;
}
