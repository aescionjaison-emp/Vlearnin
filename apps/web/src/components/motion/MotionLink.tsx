"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MotionLink({
  href,
  children,
  className = "",
  showArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <Link href={href} className={`motion-link ${className}`}>
      <span>{children}</span>
      {showArrow && <ArrowRight className="arrow w-4 h-4 shrink-0" />}
    </Link>
  );
}
