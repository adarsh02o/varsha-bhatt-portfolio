"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { u } from "@/lib/u";
import { useEffect, useRef, useState } from "react";
import photo from "../../media/varsha-profile.jpg";
import { RESUME_URL } from "@/lib/data";
import { EASE, SplitWords } from "./motion";

const floats = [
  { label: "Manual Testing", cls: "f1", style: { top: u(84), left: u(-72) }, speed: -120, delay: 1.0 },
  { label: "API Testing", cls: "f2", style: { top: u(250), right: u(-52) }, speed: -40, delay: 1.15 },
  { label: "Agile/Scrum", cls: "f3", style: { bottom: u(170), left: u(-64) }, speed: -180, delay: 1.3 },
];

const corners = [
  { cls: "tl", x: -14, y: -14 },
  { cls: "tr", x: 14, y: -14 },
  { cls: "bl", x: -14, y: 14 },
  { cls: "br", x: 14, y: 14 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Copy and card are stacked on phones, so opposing drifts would make them collide.
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const copyY = useTransform(p, [0, 1], [0, stacked ? 0 : 140]);
  const copyOpacity = useTransform(p, [0, 0.75], [1, 0]);
  const cardY = useTransform(p, [0, 1], [0, stacked ? 0 : -90]);
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
            style={{ marginBottom: u(26), background: "var(--pass-bg)", color: "var(--pass-ink)" }}
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
          <div className="badge-stage">
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
              <div className="id-body">
                <div className="id-photo">
                  <Image
                    src={photo}
                    alt="Varsha Bhatt"
                    fill
                    priority
                    placeholder="blur"
                    sizes="(max-width: 760px) 90vw, 480px"
                    style={{ objectFit: "cover", objectPosition: "center 12%" }}
                  />
                  {corners.map((c, i) => (
                    <motion.span
                      key={c.cls}
                      className={`corner ${c.cls}`}
                      aria-hidden="true"
                      initial={{ opacity: 0, x: c.x, y: c.y }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.7, delay: 1.1 + i * 0.06, ease: EASE }}
                    />
                  ))}
                  <motion.span
                    className="id-tag"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
                  >
                    <span className="live-dot" />
                    3+ YRS · WEB · MOBILE · API
                  </motion.span>
                </div>
                <div className="id-meta">
                  <div>
                    <div className="id-name">Varsha Bhatt</div>
                    <div className="id-role">QA Engineer · Indore, India</div>
                  </div>
                  <span className="mono id-no">#QA-2023</span>
                </div>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
