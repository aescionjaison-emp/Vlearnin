"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_TOKENS } from "@/lib/motion/motion-tokens";
import { EDITORIAL_EASE } from "@/lib/motion/motion-easing";

export function ProgrammeFilterMotion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">{children}</AnimatePresence>
    </div>
  );
}

export function ProgrammeCardItem({
  children,
  layoutKey,
  className = "",
  style,
}: {
  children: React.ReactNode;
  layoutKey: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.article
      key={layoutKey}
      layout
      initial={{ opacity: 0.85 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION_TOKENS.duration.filter, ease: EDITORIAL_EASE.cubic }}
      style={style}
      className={className}
    >
      {children}
    </motion.article>
  );
}
