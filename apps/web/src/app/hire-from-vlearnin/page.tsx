import React from "react";
import type { Metadata } from "next";
import { HireFromVlearninClient } from "@/components/hire/HireFromVlearninClient";

export const metadata: Metadata = {
  title: "Hire From VLEARNIN | Pre-Trained Talent in Bengaluru",
  description:
    "Hire project-ready graduates trained in Power BI, Financial Modelling, AI Business Workflows, and Digital Marketing from VLEARNIN Academy, Bengaluru.",
};

export default function HireFromVlearninPage() {
  return <HireFromVlearninClient />;
}
