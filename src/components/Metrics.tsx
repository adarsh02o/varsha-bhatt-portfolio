"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { stats } from "@/lib/data";
import { CountUp, itemUp, Stagger } from "./motion";

function Badge({ passed }: { passed: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={passed ? "pass" : "run"}
        className={passed ? "pass" : "pass pending"}
        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        {passed ? "PASS" : "RUNNING"}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const [passed, setPassed] = useState<boolean[]>(() => stats.map(() => false));
  const count = passed.filter(Boolean).length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="metrics" aria-label="Test run summary">
      <div className="wrap">
        <div className="metrics-head">
          <motion.div
            className="mono"
            style={{ fontWeight: 700, letterSpacing: ".14em", color: "var(--night-accent)" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            TEST RUN SUMMARY
          </motion.div>
          <span className={count === stats.length ? "pass" : "pass pending"} aria-live="polite">
            {count} / {stats.length} PASSED
          </span>
        </div>
        <div className="run-bar" aria-hidden="true">
          <motion.div style={{ scaleX: bar }} />
        </div>
        <Stagger className="stats" gap={0.12} amount={0.3}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat"
              variants={itemUp}
              whileHover={{ y: -6, borderColor: "#3d5a8a" }}
            >
              <div className="stat-value">
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  duration={1.4 + i * 0.25}
                  onDone={() => setPassed((p) => p.map((v, j) => (j === i ? true : v)))}
                />
              </div>
              <div className="stat-label">{s.label}</div>
              <Badge passed={passed[i]} />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
