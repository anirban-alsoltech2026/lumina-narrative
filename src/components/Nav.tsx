import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Practice", href: "#story" },
  { label: "Method", href: "#statement" },
  { label: "Signals", href: "#counters" },
  { label: "Journal", href: "#journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-5">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl tracking-tight text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Aether<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm uppercase tracking-[0.14em] text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#cta"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper"
        >
          Request access
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </header>
  );
}
