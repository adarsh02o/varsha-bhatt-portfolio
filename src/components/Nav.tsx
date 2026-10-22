"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav, RESUME_URL } from "@/lib/data";
import { EASE } from "./motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(!open && y > prev && y > 240);
  });

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const top = document.getElementById("top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -80 }}
        animate={{
          y: hidden ? -80 : 0,
          boxShadow: scrolled ? "0 8px 30px -12px rgba(14,23,38,.25)" : "0 0 0 rgba(14,23,38,0)",
        }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="wrap nav-inner">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            Varsha<span> Bhatt</span>
          </a>
          <nav aria-label="Primary" className="nav-links">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="nav-link" aria-current={active === n.id ? "true" : undefined}>
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-underline" className="underline" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </a>
            ))}
            <a className="btn sm" href={RESUME_URL} download>
              Download Resume
            </a>
          </nav>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mobile-menu"
            initial={{ opacity: 0, y: -16, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -16, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                {n.label}
              </motion.a>
            ))}
            <a className="btn pri" href={RESUME_URL} download onClick={() => setOpen(false)}>
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
