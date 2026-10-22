"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { EASE, Reveal, SplitWords } from "./motion";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Each column drifts at its own rate for a staggered parallax grid.
  const y = useTransform(scrollYProgress, [0, 1], [30 + (i % 3) * 25, -(30 + (i % 3) * 25)]);
  const detailsId = `details-${p.name.replace(/\W/g, "")}`;

  return (
    <motion.div style={{ gridColumn: `span ${p.span}`, y }}>
      <motion.article
        ref={ref}
        className="card proj"
        style={{ height: "100%", transformPerspective: 1000 }}
        initial={{ opacity: 0, y: 80, rotateX: 18, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: EASE }}
        whileHover={{ y: -8 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className={`tag ${p.tone}`}>{p.domain}</span>
          <motion.span
            className="rel"
            initial={{ opacity: 0, scale: 1.8, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.5 + (i % 3) * 0.1 }}
          >
            RELEASED
          </motion.span>
        </div>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span className="chip n">{p.team}</span>
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <ul>
          {p.tested.map((t, j) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + j * 0.08, duration: 0.5 }}
            >
              {t}
            </motion.li>
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              className="proj-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {p.details.map((d) => (
                <p key={d} style={{ marginTop: 8 }}>
                  {d}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="proj-foot">
          <button type="button" className="linkish" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen((o) => !o)}>
            {open ? "Hide case study" : "View case study"}
            <motion.span animate={{ rotate: open ? 90 : 0 }} style={{ display: "inline-block", marginLeft: 6 }}>
              →
            </motion.span>
          </button>
          <a href={p.url} target="_blank" rel="noreferrer">
            Visit website ↗
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="sec projects">
      <div className="wrap">
        <Reveal className="eyebrow" y={12}>
          Projects
        </Reveal>
        <h2 className="h2">
          <SplitWords text="Case studies" />
        </h2>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
