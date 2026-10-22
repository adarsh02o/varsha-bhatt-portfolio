"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";
import { EASE, itemPop, Reveal, SplitWords } from "./motion";

export default function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <Reveal className="eyebrow" y={12}>
          Skills
        </Reveal>
        <h2 className="h2">
          <SplitWords text="Test coverage" />
        </h2>
        <div className="grid12">
          {skills.map((g, i) => (
            <motion.div
              key={g.title}
              className="card"
              style={{ gridColumn: `span ${g.span}`, padding: 24 }}
              initial={{ opacity: 0, y: 50, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: EASE }}
              whileHover={{ y: -4, boxShadow: "0 18px 40px -20px rgba(37,72,216,.35)" }}
            >
              <div className="skill-title">
                {g.title}
                {g.tags.length > 5 && <span className="swipe-hint">swipe →</span>}
              </div>
              <motion.div
                className="skill-tags"
                tabIndex={0}
                aria-label={`${g.title} skills`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.25 + (i % 2) * 0.12 } } }}
              >
                {g.tags.map((t) => (
                  <motion.span key={t} className={`chip ${g.tone}`} variants={itemPop} whileHover={{ scale: 1.08 }}>
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
