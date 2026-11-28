import React from "react";
import type { Metadata } from "next";
import { OFFICIAL_CATEGORIES } from "@vlearnin/shared";
import { AboutCinematicClient } from "@/components/about/AboutCinematicClient";

export const metadata: Metadata = {
  title: "About VLEARNIN Academy | Bengaluru",
  description:
    "Learn about VLEARNIN Academy in Rajajinagar, Bengaluru—our educational philosophy, The V-Way to Learn, Build & Lead, and our practical certification methodology.",
};

export default function AboutPage() {
  return <AboutCinematicClient categories={OFFICIAL_CATEGORIES} />;
}
