import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import {
  BRAND,
  OFFICIAL_CATEGORIES,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
} from "@vlearnin/shared";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding VLEARNIN v2 PostgreSQL database...");

  // 1. Seed Categories (3 Core Domains)
  const categoryMap = new Map<string, string>();
  for (const cat of OFFICIAL_CATEGORIES) {
    const record = await prisma.courseCategory.upsert({
      where: { slug: cat.slug },
      create: {
        slug: cat.slug,
        name: cat.name,
        shortName: cat.shortName,
        description: cat.description,
        outcomeSummary: cat.outcomeSummary,
        imageUrl: cat.image,
        displayOrder: cat.displayOrder,
        status: "PUBLISHED",
      },
      update: {
        name: cat.name,
        shortName: cat.shortName,
        description: cat.description,
        outcomeSummary: cat.outcomeSummary,
        imageUrl: cat.image,
        displayOrder: cat.displayOrder,
      },
    });
    categoryMap.set(cat.slug, record.id);
  }

  // 2. Seed 7 Official Courses + 5 Modules each + Tools + Outcomes
  const courseMap = new Map<string, string>();
  for (let i = 0; i < OFFICIAL_COURSES.length; i++) {
    const c = OFFICIAL_COURSES[i];
    const categoryId = categoryMap.get(c.categorySlug)!;

    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        title: c.title,
        categoryId,
        durationHours: c.durationHours,
        durationLabel: c.durationLabel,
        idealFor: c.idealFor,
        summary: c.summary,
        overview: c.overview,
        capstoneTitle: c.capstoneTitle,
        capstoneDescription: c.capstoneDescription,
        careerPathways: c.careerPathways,
        learningModes: c.learningModes,
        imageUrl: c.image,
        displayOrder: i + 1,
        status: "PUBLISHED",
        isFeatured: true,
      },
      update: {
        title: c.title,
        categoryId,
        durationHours: c.durationHours,
        durationLabel: c.durationLabel,
        idealFor: c.idealFor,
        summary: c.summary,
        overview: c.overview,
        capstoneTitle: c.capstoneTitle,
        capstoneDescription: c.capstoneDescription,
        careerPathways: c.careerPathways,
        learningModes: c.learningModes,
        imageUrl: c.image,
        displayOrder: i + 1,
      },
    });
    courseMap.set(c.slug, course.id);

    // Replace modules, tools, outcomes idempotently
    await prisma.courseModule.deleteMany({ where: { courseId: course.id } });
    await prisma.courseTool.deleteMany({ where: { courseId: course.id } });
    await prisma.courseOutcome.deleteMany({ where: { courseId: course.id } });

    await prisma.courseModule.createMany({
      data: c.modules.map((m) => ({
        courseId: course.id,
        moduleNumber: m.moduleNumber,
        title: m.title,
        durationHours: m.durationHours,
        summary: m.summary,
        topics: m.topics,
      })),
    });

    await prisma.courseTool.createMany({
      data: c.tools.map((t, idx) => ({
        courseId: course.id,
        name: t,
        displayOrder: idx + 1,
      })),
    });

    await prisma.courseOutcome.createMany({
      data: c.outcomes.map((o, idx) => ({
        courseId: course.id,
        description: o,
        displayOrder: idx + 1,
      })),
    });
  }

  // 3. Seed 4 Career Accelerator Combos
  for (const combo of OFFICIAL_COMBOS) {
    const comboRecord = await prisma.careerCombo.upsert({
      where: { slug: combo.slug },
      create: {
        slug: combo.slug,
        title: combo.title,
        durationHours: combo.durationHours,
        durationLabel: combo.durationLabel,
        includedLabel: combo.includedLabel,
        idealFor: combo.idealFor,
        summary: combo.summary,
        outcomes: combo.outcomes,
        imageUrl: combo.image,
        displayOrder: combo.displayOrder,
        status: "PUBLISHED",
      },
      update: {
        title: combo.title,
        durationHours: combo.durationHours,
        durationLabel: combo.durationLabel,
        includedLabel: combo.includedLabel,
        idealFor: combo.idealFor,
        summary: combo.summary,
        outcomes: combo.outcomes,
        imageUrl: combo.image,
        displayOrder: combo.displayOrder,
      },
    });

    await prisma.comboCourse.deleteMany({ where: { comboId: comboRecord.id } });
    for (let idx = 0; idx < combo.courseSlugs.length; idx++) {
      const courseId = courseMap.get(combo.courseSlugs[idx]);
      if (courseId) {
        await prisma.comboCourse.create({
          data: {
            comboId: comboRecord.id,
            courseId,
            displayOrder: idx + 1,
          },
        });
      }
    }
  }

  // 4. Seed Default Site Settings
  await prisma.siteSettings.upsert({
    where: { key: "default" },
    create: {
      key: "default",
      institutionName: BRAND.legalName,
      tagline: BRAND.tagline,
      address: BRAND.address,
      phone: BRAND.phoneDisplay,
      whatsappNumber: BRAND.whatsappNumber,
      email: BRAND.email,
      weekdayTimings: BRAND.timings.weekdays,
      sundayTimings: BRAND.timings.sunday,
      showEmployerTurnaroundClaim: false,
      showZeroFeeClaim: true,
    },
    update: {},
  });

  // 5. Seed Initial Admin User (only if ADMIN_SEED_EMAIL & ADMIN_SEED_PASSWORD provided)
  const adminEmail = process.env.ADMIN_SEED_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await argon2.hash(adminPassword, { type: argon2.argon2id });
    await prisma.adminUser.upsert({
      where: { email: adminEmail.toLowerCase() },
      create: {
        email: adminEmail.toLowerCase(),
        name: "VLEARNIN Super Administrator",
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
      update: {},
    });
    console.log(`Seeded admin account: ${adminEmail}`);
  } else {
    console.log("Skipped AdminUser seed (set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD to seed).");
  }

  console.log("VLEARNIN v2 seed completed.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
