"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

/**
 * Animation 16 — Smooth Page-to-Page Transitions.
 * Keeps content immediately visible and interactive while giving incoming routes
 * a crisp, subtle editorial entrance without blocking back/forward navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin routes stay completely static
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.92, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
