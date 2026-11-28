"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

/**
 * Lightweight Editorial Page Transitions (220ms).
 * Never blocks navigation, preserves back/forward and scroll restoration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.94, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
