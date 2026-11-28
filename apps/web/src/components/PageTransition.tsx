"use client";

import React from "react";

/**
 * Static-First Page Wrapper.
 * Preserves immediate visibility, native scroll restoration, and browser back/forward.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
