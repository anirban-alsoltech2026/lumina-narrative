import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  ["00", "Home", "/"],
  ["01", "Our Edge", "/our-edge"],
  ["02", "For Practices", "/for-practices"],
  ["03", "For Insurers", "/for-insurers"],
  ["04", "About Us", "/about"],
  ["05", "Careers", "/careers"],
  ["06", "Press", "/press"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site-nav">
        <a className="logo" href="/" aria-label="Lumora Dental home">
          <img className="brand-icon" src="/logo.png" alt="" />
          <b>
            LUMORA
            <br />
            DENTAL
          </b>
        </a>
        <motion.button
          className="menu-button"
          whileHover={{ scale: 1.08, rotate: 4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </motion.button>
        <div className="nav-links">
          <a href="/for-practices">For Practices</a>
          <a href="/for-insurers">For Insurers</a>
          <button
            onClick={() => {
              setOpen(false);
              document.documentElement.classList.add("contact-open");
            }}
          >
            Contact Us
          </button>
        </div>
      </header>
      <aside className={`menu-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav>
          {links.map(([no, label, href], index) => (
            <motion.a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{
                duration: 0.5,
                delay: open ? 0.2 + index * 0.045 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 14 }}
            >
              <small>{no}</small>
              <span>{label}</span>
            </motion.a>
          ))}
        </nav>
      </aside>
      <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Contact Us">
        <motion.button
          className="contact-close"
          whileHover={{ scale: 1.08, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => document.documentElement.classList.remove("contact-open")}
          aria-label="Close contact form"
        >
          <X />
        </motion.button>
        <div className="contact-inner">
          <h2>Contact Us</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Name</span>
              <input name="name" />
            </label>
            <label>
              <span>Company</span>
              <input name="company" />
            </label>
            <label>
              <span>E-mail</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" />
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
