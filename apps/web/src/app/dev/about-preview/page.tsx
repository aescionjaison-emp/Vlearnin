import React from "react";
import type { Metadata } from "next";
import { getSignatureSceneManifests } from "@/lib/about-scenes";
import { AboutPreviewClient } from "@/components/about/AboutPreviewClient";

export const metadata: Metadata = {
  title: "About Us Cinematic Preview (Dev Only)",
  robots: { index: false, follow: false },
};

export default function AboutDevPreviewPage() {
  const scenes = getSignatureSceneManifests();
  return <AboutPreviewClient scenes={scenes} />;
}
