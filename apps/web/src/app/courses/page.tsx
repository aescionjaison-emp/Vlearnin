import React, { Suspense } from "react";
import type { Metadata } from "next";
import { fetchCombos, fetchCourses } from "@/lib/api";
import { CoursesCatalogClient } from "@/components/courses/CoursesCatalogClient";

export const metadata: Metadata = {
  title: "Certification Courses & Career Combos in Bengaluru",
  description:
    "Explore VLEARNIN's 7 industry-aligned 30-hour certification courses in AI Tools, Power BI, Financial Modelling, Investment Banking, Digital Marketing, Social Media, and Video Editing.",
};

export default async function CoursesPage() {
  const [courses, combos] = await Promise.all([fetchCourses(), fetchCombos()]);

  return (
    <Suspense fallback={<div className="py-20 text-center text-[#667085]">Loading programmes...</div>}>
      <CoursesCatalogClient courses={courses} combos={combos} />
    </Suspense>
  );
}
