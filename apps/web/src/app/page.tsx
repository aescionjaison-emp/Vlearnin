import React from "react";
import { fetchCategories, fetchCombos, fetchCourses } from "@/lib/api";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { QuickAccessStrip } from "@/components/home/QuickAccessStrip";
import { BrandIntroSection } from "@/components/home/BrandIntroSection";
import { HomeCatalogSections } from "@/components/home/HomeCatalogSections";

export default async function HomePage() {
  const [categories, courses, combos] = await Promise.all([
    fetchCategories(),
    fetchCourses(),
    fetchCombos(),
  ]);

  return (
    <>
      <HeroCarousel />
      <QuickAccessStrip />
      <BrandIntroSection />
      <HomeCatalogSections
        categories={categories}
        courses={courses}
        combos={combos}
      />
    </>
  );
}
