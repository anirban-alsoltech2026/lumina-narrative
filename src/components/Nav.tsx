import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [["00", "Home", "/"], ["01", "Our Edge", "/our-edge"], ["02", "For Practices", "/for-practices"], ["03", "For Insurers", "/for-insurers"], ["04", "About Us", "/about"], ["05", "Careers", "/careers"], ["06", "Press", "/press"]];

export function Nav() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-nav">
      <a className="logo" href="/" aria-label="Videa Health home"><span>◇</span><b>VIDEA<br />HEALTH</b></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      <div className="nav-links"><a href="/for-practices">For Practices</a><a href="/for-insurers">For Insurers</a><a href="#contact">Contact Us</a></div>
    </header>
    <aside className={`menu-drawer ${open ? "is-open" : ""}`}>
      <nav>{links.map(([no, label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}><small>{no}</small>{label}</a>)}</nav>
    </aside>
  </>;
}
