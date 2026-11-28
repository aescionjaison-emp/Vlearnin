"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnimatedLink({
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
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 mc-underline-link text-[#2463A6] hover:text-[#10264A] transition-colors duration-250 ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-250 ease-out group-hover:translate-x-1" />
      )}
    </Link>
  );
}
