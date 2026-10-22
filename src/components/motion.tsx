"use client";

import { ReactLenis } from "lenis/react";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      {!reduce && <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -64 } }} />}
      {children}
    </MotionConfig>
  );
}

/** Thin bar pinned to the top that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

const revealVariants: Variants = {
  hidden: (d: { y: number; x: number; blur: boolean }) => ({
    opacity: 0,
    y: d.y,
    x: d.x,
    filter: d.blur ? "blur(8px)" : "blur(0px)",
  }),
  show: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  as?: "div" | "span" | "li" | "article" | "p";
};

/** Fades/slides its children in once they scroll into view. */
export function Reveal({ children, className, style, delay = 0, y = 40, x = 0, blur = false, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      custom={{ y, x, blur }}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Container whose direct `StaggerItem` children animate in one after another. */
export function Stagger({
  children,
  className,
  style,
  gap = 0.08,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gap?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export const itemUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const itemPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 22 } },
};

/** Splits text into words that rise out of a mask, staggered. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
    : { animate: "show" };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <motion.span
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

/** Number that counts up from 0 when it first enters the viewport. */
export function CountUp({ to, suffix = "", duration = 1.8, onDone }: { to: number; suffix?: string; duration?: number; onDone?: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => Math.round(v).toLocaleString("en-US") + suffix);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: EASE, onComplete: () => doneRef.current?.() });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <span ref={ref} aria-label={to.toLocaleString("en-US") + suffix}>
      <motion.span aria-hidden="true">{text}</motion.span>
    </span>
  );
}

/** Moves its children vertically at a different speed than the scroll (parallax). */
export function Parallax({
  children,
  speed = 60,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
