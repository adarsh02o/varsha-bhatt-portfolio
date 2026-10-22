"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { u } from "@/lib/u";
import { useRef } from "react";
import { experienceBullets } from "@/lib/data";
import { EASE, Reveal, SplitWords } from "./motion";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="experience" className="sec">
      <div className="wrap">
        <Reveal className="eyebrow" y={12}>
          Experience
        </Reveal>
        <h2 className="h2">
          <SplitWords text="Where I've worked & studied" />
        </h2>
        <div ref={ref} className="grid12" style={{ gap: u(24) }}>
          <Reveal className="card exp-card" style={{ gridColumn: "span 8" }} x={-50} y={0}>
            <motion.span className="exp-bar" style={{ background: "var(--accent)", scaleY: draw }} aria-hidden="true" />
            <div className="exp-head">
              <h3 style={{ margin: 0, fontSize: u(24) }}>QA Engineer</h3>
              <span className="chip">Feb 2023 – Present</span>
            </div>
            <div style={{ fontSize: u(15), color: "var(--muted-2)", margin: `${u(6)} 0 ${u(18)}` }}>
              Codezilla Technology &amp; Consultancy Pvt. Ltd · Indore
            </div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
            >
              {experienceBullets.map((b) => (
                <motion.li
                  key={b}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
          <Reveal className="card exp-card" style={{ gridColumn: "span 4" }} x={50} y={0} delay={0.15}>
            <motion.span className="exp-bar" style={{ background: "var(--ink)", scaleY: draw }} aria-hidden="true" />
            <span className="tag" style={{ background: "#eef0f5", color: "var(--ink-2)" }}>
              EDUCATION
            </span>
            <h3 style={{ margin: `${u(14)} 0 ${u(6)}`, fontSize: u(22) }}>B.E. Computer Science</h3>
            <div style={{ fontSize: u(15), color: "var(--muted-2)", lineHeight: 1.5 }}>Radharaman Engineering College, Bhopal</div>
            <div className="chip n" style={{ marginTop: u(16) }}>
              2014 – 2018
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
