"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EMAIL, LINKEDIN, PHONE, RESUME_URL } from "@/lib/data";
import { EASE, Reveal, SplitWords } from "./motion";

const icon = (d: ReactNode) => (
  <div className="ic" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  </div>
);

const rows = [
  {
    label: "EMAIL",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: icon(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    label: "PHONE",
    value: PHONE,
    href: `tel:${PHONE}`,
    icon: icon(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />),
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/varsha-bhatt",
    href: LINKEDIN,
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 015 0v3" />
      </>
    ),
  },
  {
    label: "LOCATION",
    value: "Indore, India",
    icon: icon(
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <motion.section id="contact" ref={ref} className="contact" style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
      <div className="wrap contact-grid">
        <div style={{ gridColumn: "span 6", paddingRight: 24 }}>
          <Reveal className="eyebrow" style={{ color: "var(--night-accent)" }} y={12}>
            Contact
          </Reveal>
          <h2 className="contact-title">
            <SplitWords text="Let's ship quality software together." stagger={0.07} />
          </h2>
          <Reveal as="p" delay={0.3} blur y={20}>
            <span style={{ display: "block", fontSize: 17, lineHeight: 1.6, color: "var(--night-text)", margin: "0 0 30px", maxWidth: 460 }}>
              Open to QA roles in manual, API and mobile testing. Pick the quickest way to reach me.
            </span>
          </Reveal>
          <Reveal delay={0.45} y={20}>
            <div className="contact-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <motion.a className="btn pri lg" href={RESUME_URL} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                View Resume
              </motion.a>
              <motion.a className="btn ghost lg" href={LINKEDIN} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                LinkedIn ↗
              </motion.a>
            </div>
          </Reveal>
        </div>
        <motion.div
          className="contact-list"
          initial={{ opacity: 0, x: 60, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              className="row"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
            >
              <motion.div whileHover={{ rotate: -8, scale: 1.08 }}>{r.icon}</motion.div>
              <div style={{ minWidth: 0 }}>
                <div className="mono" style={{ color: "var(--night-accent)" }}>
                  {r.label}
                </div>
                {r.href ? (
                  <a className="contact-value" href={r.href} {...(r.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {r.value}
                  </a>
                ) : (
                  <span className="contact-value">{r.value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© 2026 Varsha Bhatt · Finding bugs before your users do.</span>
        <motion.a href="#top" whileHover={{ y: -3 }}>
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  );
}
