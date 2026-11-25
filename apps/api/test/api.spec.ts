import { describe, expect, it, vi } from "vitest";
import { PublicController } from "../src/public/public.controller";
import { PdfService } from "../src/common/pdf.service";
import { OFFICIAL_CATEGORIES, OFFICIAL_COMBOS, OFFICIAL_COURSES } from "@vlearnin/shared";

describe("VLEARNIN API — Public Controller & PDF Generation", () => {
  const mockEmail = {
    isConfigured: () => false,
    sendMail: vi.fn().mockResolvedValue({ sent: false, provider: "none" }),
  };

  it("returns all 3 core categories and all 7 official courses", async () => {
    const controller = new PublicController(
      { isConnected: false } as any,
      mockEmail as any,
      new PdfService(),
    );

    const catRes = await controller.getCategories();
    expect(catRes.categories).toHaveLength(OFFICIAL_CATEGORIES.length);

    const courseRes = await controller.getCourses();
    expect(courseRes.courses).toHaveLength(7);

    const filtered = await controller.getCourses("corporate-finance-capital-markets");
    expect(filtered.courses).toHaveLength(2);

    const combosRes = await controller.getCombos();
    expect(combosRes.combos).toHaveLength(OFFICIAL_COMBOS.length);
  });

  it("never returns a verified certificate when ID is invalid", async () => {
    const connectedMockPrisma = {
      isConnected: true,
      certificate: {
        findUnique: vi.fn().mockResolvedValue(null),
        findFirst: vi.fn().mockResolvedValue(null),
      },
      certificateAuditLog: { create: vi.fn() },
    };

    const controller = new PublicController(
      connectedMockPrisma as any,
      mockEmail as any,
      new PdfService(),
    );

    const res = await controller.verifyCertificate(
      { certificateId: "VLN-2026-FAKE" },
      { ip: "127.0.0.1" } as any,
    );
    expect(res.found).toBe(false);
    expect(res.status).toBe("INVALID");
  });

  it("returns REVOKED status for revoked certificates and VALID without private PII for active ones", async () => {
    const connectedMockPrisma = {
      isConnected: true,
      certificate: {
        findUnique: vi
          .fn()
          .mockResolvedValueOnce({
            id: "cert-1",
            certificateId: "VLN-2026-REV1",
            status: "REVOKED",
            issuingAuthority: "VLEARNIN Academy, Bengaluru",
          })
          .mockResolvedValueOnce({
            id: "cert-2",
            certificateId: "VLN-2026-ACT1",
            verificationToken: "tok_1234567890abcdef",
            recipientName: "Aarav Sharma",
            programmeTitle: OFFICIAL_COURSES[0].title,
            programmeDuration: "30 Hours (5 Modules × 6 Hours)",
            capstoneStatus: "Completed & Evaluated",
            grade: "Distinction",
            issueDate: new Date("2026-05-01"),
            issuingAuthority: "VLEARNIN Academy, Bengaluru",
            status: "ACTIVE",
          }),
      },
      certificateAuditLog: { create: vi.fn().mockResolvedValue({}) },
    };

    const controller = new PublicController(
      connectedMockPrisma as any,
      mockEmail as any,
      new PdfService(),
    );

    const revoked = await controller.verifyCertificate(
      { certificateId: "VLN-2026-REV1" },
      { ip: "127.0.0.1" } as any,
    );
    expect(revoked.status).toBe("REVOKED");

    const valid = await controller.verifyCertificate(
      { certificateId: "VLN-2026-ACT1" },
      { ip: "127.0.0.1" } as any,
    );
    expect(valid.status).toBe("VALID");
    expect(valid.certificate).not.toHaveProperty("phone");
    expect(valid.certificate).not.toHaveProperty("email");
  });

  it("generates valid PDF buffers for brochures, syllabi, and certificates", async () => {
    const pdfService = new PdfService();
    const completePdf = await pdfService.generateCompleteBrochure();
    expect(completePdf.subarray(0, 4).toString()).toBe("%PDF");

    const syllabusPdf = await pdfService.generateCourseSyllabus(OFFICIAL_COURSES[1].slug);
    expect(syllabusPdf).not.toBeNull();
    expect(syllabusPdf!.subarray(0, 4).toString()).toBe("%PDF");

    const certPdf = await pdfService.generateCertificatePdf({
      certificateId: "VLN-2026-0001",
      recipientName: "Ananya Rao",
      programmeTitle: OFFICIAL_COURSES[1].title,
      programmeDuration: "30 Hours (5 Modules × 6 Hours)",
      capstoneStatus: "Completed & Evaluated",
      issueDate: new Date("2026-06-15"),
      verificationUrl: "http://localhost:3000/verify-certificate/testtoken1234",
    });
    expect(certPdf.subarray(0, 4).toString()).toBe("%PDF");
  });
});
