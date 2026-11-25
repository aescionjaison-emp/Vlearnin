import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND, OFFICIAL_COURSES } from "@vlearnin/shared";
import { fetchCourseBySlug, fetchCourses } from "@/lib/api";
import { CourseDetailClient } from "@/components/courses/CourseDetailClient";

export async function generateStaticParams() {
  return OFFICIAL_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} | Bengaluru`,
    description: `${course.summary} Ideal for: ${course.idealFor}`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, allCourses] = await Promise.all([
    fetchCourseBySlug(slug),
    fetchCourses(),
  ]);

  if (!course) {
    notFound();
  }

  const related = allCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.overview,
    provider: {
      "@type": "EducationalOrganization",
      name: BRAND.legalName,
      sameAs: BRAND.website,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <CourseDetailClient course={course} relatedCourses={related} />
    </>
  );
}
