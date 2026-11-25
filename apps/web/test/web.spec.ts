import { describe, expect, it } from "vitest";
import {
  BRAND,
  DemoBookingSchema,
  InstitutionalEnquirySchema,
  OFFICIAL_CATEGORIES,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  VerifyCertificateSchema,
  buildWhatsAppUrl,
} from "@vlearnin/shared";

describe("VLEARNIN Shared Catalog & Validation", () => {
  it("contains all 3 domains, 7 official courses with 5 modules each, and 4 career combos", () => {
    expect(OFFICIAL_CATEGORIES).toHaveLength(3);
    expect(OFFICIAL_COURSES).toHaveLength(7);
    expect(OFFICIAL_COMBOS).toHaveLength(4);

    for (const course of OFFICIAL_COURSES) {
      expect(course.durationHours).toBe(30);
      expect(course.modules).toHaveLength(5);
    }
  });

  it("builds valid WhatsApp URLs with the official VLEARNIN number", () => {
    const url = buildWhatsAppUrl("Hello VLEARNIN");
    expect(url).toContain("https://wa.me/917022337580");
    expect(BRAND.email).toBe("info@vlearnin.com");
  });

  it("validates demo booking, institutional enquiry, and certificate verification schemas", () => {
    const validDemo = DemoBookingSchema.safeParse({
      fullName: "Priya Nair",
      phone: "+91 9876543210",
      qualification: "B.Com",
      interestedProgramme: OFFICIAL_COURSES[0].title,
      preferredBatch: "Weekend Only",
      consent: true,
    });
    expect(validDemo.success).toBe(true);

    const invalidInst = InstitutionalEnquirySchema.safeParse({
      fullName: "Dr. Rao",
      designation: "Principal",
      institutionName: "Bengaluru Degree College",
      officialEmail: "not-an-email",
      phone: "123",
      interestedProgrammes: [],
      estimatedBatchSize: "30–50",
      consent: false,
    });
    expect(invalidInst.success).toBe(false);

    expect(VerifyCertificateSchema.safeParse({ certificateId: "VLN-2026-0001" }).success).toBe(true);
    expect(VerifyCertificateSchema.safeParse({ certificateId: "bad id!" }).success).toBe(false);
  });
});
