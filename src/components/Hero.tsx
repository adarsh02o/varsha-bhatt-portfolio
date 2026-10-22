"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import photo from "../../media/1791455019546.jpeg";
import { RESUME_URL } from "@/lib/data";
import { EASE, SplitWords } from "./motion";

const floats = [
  { label: "Manual Testing", cls: "f1", style: { top: 56, left: -46 }, speed: -120, delay: 1.0 },
  { label: "API Testing", cls: "f2", style: { top: 240, right: -34 }, speed: -40, delay: 1.15 },
  { label: "Agile/Scrum", cls: "f3", style: { bottom: 90, left: -38 }, speed: -180, delay: 1.3 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const copyY = useTransform(p, [0, 1], [0, 140]);
  const copyOpacity = useTransform(p, [0, 0.75], [1, 0]);
  const cardY = useTransform(p, [0, 1], [0, -90]);
  const cardRotate = useTransform(p, [0, 1], [0, -6]);
  const shadowX = useTransform(p, [0, 1], [0, 26]);
  const shadowY = useTransform(p, [0, 1], [0, 30]);
  const floatYs = [
    useTransform(p, [0, 1], [0, floats[0].speed]),
    useTransform(p, [0, 1], [0, floats[1].speed]),
    useTransform(p, [0, 1], [0, floats[2].speed]),
  ];

  return (
    <section id="top" ref={ref} className="hero">
      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            className="chip"
            style={{ marginBottom: 26, background: "var(--pass-bg)", color: "var(--pass-ink)" }}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <motion.span
              className="live-dot"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Available for QA roles
          </motion.div>
          <h1 className="hero-title">
            <SplitWords text="I find the bugs before" inView={false} delay={0.25} />{" "}
            <span style={{ color: "var(--accent)" }}>
              <SplitWords text="your users do." inView={false} delay={0.55} />
            </span>
          </h1>
          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            3+ years testing web, mobile (Android/iOS) and PWA apps across fintech, e-commerce, healthcare and EV/energy.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
          >
            <motion.a className="btn pri lg" href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              View Projects
            </motion.a>
            <motion.a className="btn lg" href={RESUME_URL} download whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 60, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        >
          <motion.div style={{ y: cardY, rotate: cardRotate, position: "relative" }}>
            <motion.div className="hero-shadow" style={{ x: shadowX, y: shadowY }} />
            <div className="card id-card">
              <div className="id-head">
                <span className="mono">TC-001 · QA ENGINEER</span>
                <motion.span
                  className="pass"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18, delay: 1.6 }}
                >
                  PASS
                </motion.span>
              </div>
              <div style={{ padding: 18, position: "relative" }}>
                <div className="photo" style={{ height: 300, borderRadius: 12, position: "relative", overflow: "hidden" }}>
                  <Image
                    src={photo}
                    alt="Varsha Bhatt"
                    fill
                    priority
                    placeholder="blur"
                    sizes="(max-width: 760px) 100vw, 420px"
                    style={{ objectFit: "cover", objectPosition: "center 18%" }}
                  />
                  <motion.span
                    className="scan"
                    aria-hidden="true"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                </div>
                <div style={{ marginTop: 16, font: "700 22px var(--font-display)" }}>Varsha Bhatt</div>
                <div style={{ fontSize: 14, color: "var(--muted-2)", marginTop: 2 }}>Indore, India · Codezilla Technology</div>
              </div>
            </div>
          </motion.div>
          {floats.map((f, i) => (
            <motion.div key={f.label} className={`floater ${f.cls}`} style={{ ...f.style, y: floatYs[i] }}>
              <motion.span
                className="chip float"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: f.delay, duration: 0.4 },
                  scale: { delay: f.delay, type: "spring", stiffness: 400, damping: 18 },
                  y: { delay: f.delay + 0.4, duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {f.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
