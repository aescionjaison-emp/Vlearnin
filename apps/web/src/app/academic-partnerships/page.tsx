import React from "react";
import type { Metadata } from "next";
import { AcademicPartnershipsClient } from "@/components/academic/AcademicPartnershipsClient";

export const metadata: Metadata = {
  title: "Academic & College Partnerships | Value-Added Courses in Karnataka",
  description:
    "VLEARNIN partners with degree colleges across Bengaluru and Karnataka to deliver 30-hour value-added certification programmes in AI, Power BI, Financial Modelling, and Digital Marketing.",
};

export default function AcademicPartnershipsPage() {
  return <AcademicPartnershipsClient />;
}
