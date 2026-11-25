import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Throttle } from "@nestjs/throttler";
import * as crypto from "crypto";
import {
  BRAND,
  BrochureRequestInput,
  BrochureRequestSchema,
  DemoBookingInput,
  DemoBookingSchema,
  EmployerRequestInput,
  EmployerRequestSchema,
  InstitutionalEnquiryInput,
  InstitutionalEnquirySchema,
  OFFICIAL_CATEGORIES,
  OFFICIAL_COMBOS,
  OFFICIAL_COURSES,
  StudentEnquiryInput,
  StudentEnquirySchema,
  VerifyCertificateInput,
  VerifyCertificateSchema,
} from "@vlearnin/shared";
import { PrismaService } from "../prisma/prisma.service";
import { EmailService } from "../common/email.service";
import { PdfService } from "../common/pdf.service";
import { ZodValidationPipe } from "../common/zod-validation.pipe";

@Controller()
export class PublicController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly pdfService: PdfService,
  ) {}

  private makeRef(prefix: string): string {
    const year = new Date().getFullYear();
    const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `${prefix}-${year}-${rand}`;
  }

  @Get("health")
  health() {
    return {
      status: "ok",
      databaseConnected: this.prisma.isConnected,
      timestamp: new Date().toISOString(),
    };
  }

  @Get("categories")
  async getCategories() {
    if (this.prisma.isConnected) {
      const categories = await this.prisma.courseCategory.findMany({
        where: { status: "PUBLISHED", deletedAt: null },
        orderBy: { displayOrder: "asc" },
      });
      if (categories.length > 0) return { categories };
    }
    return { categories: OFFICIAL_CATEGORIES };
  }

  @Get("courses")
  async getCourses(
    @Query("category") category?: string,
    @Query("q") q?: string,
  ) {
    if (this.prisma.isConnected) {
      const courses = await this.prisma.course.findMany({
        where: {
          status: "PUBLISHED",
          deletedAt: null,
          ...(category && category !== "all"
            ? { category: { slug: category } }
            : {}),
          ...(q
            ? {
                OR: [
                  { title: { contains: q, mode: "insensitive" } },
                  { summary: { contains: q, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        include: {
          category: true,
          modules: { orderBy: { moduleNumber: "asc" } },
          tools: { orderBy: { displayOrder: "asc" } },
          outcomes: { orderBy: { displayOrder: "asc" } },
        },
        orderBy: { displayOrder: "asc" },
      });
      if (courses.length > 0) return { courses };
    }

    let list = OFFICIAL_COURSES;
    if (category && category !== "all") {
      list = list.filter((c) => c.categorySlug === category);
    }
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(needle) ||
          c.summary.toLowerCase().includes(needle) ||
          c.tools.some((t) => t.toLowerCase().includes(needle)),
      );
    }
    return { courses: list };
  }

  @Get("courses/:slug")
  async getCourseBySlug(@Param("slug") slug: string) {
    if (this.prisma.isConnected) {
      const course = await this.prisma.course.findFirst({
        where: { slug, status: "PUBLISHED", deletedAt: null },
        include: {
          category: true,
          modules: { orderBy: { moduleNumber: "asc" } },
          tools: { orderBy: { displayOrder: "asc" } },
          outcomes: { orderBy: { displayOrder: "asc" } },
        },
      });
      if (course) return { course };
    }

    const fallback = OFFICIAL_COURSES.find((c) => c.slug === slug);
    if (!fallback) {
      throw new NotFoundException("Programme not found");
    }
    return { course: fallback };
  }

  @Get("career-combos")
  async getCombos() {
    if (this.prisma.isConnected) {
      const combos = await this.prisma.careerCombo.findMany({
        where: { status: "PUBLISHED", deletedAt: null },
        include: {
          courses: {
            include: { course: true },
            orderBy: { displayOrder: "asc" },
          },
        },
        orderBy: { displayOrder: "asc" },
      });
      if (combos.length > 0) return { combos };
    }
    return { combos: OFFICIAL_COMBOS };
  }

  @Get("career-combos/:slug")
  async getComboBySlug(@Param("slug") slug: string) {
    if (this.prisma.isConnected) {
      const combo = await this.prisma.careerCombo.findFirst({
        where: { slug, status: "PUBLISHED", deletedAt: null },
        include: {
          courses: {
            include: { course: true },
            orderBy: { displayOrder: "asc" },
          },
        },
      });
      if (combo) return { combo };
    }

    const fallback = OFFICIAL_COMBOS.find((c) => c.slug === slug);
    if (!fallback) {
      throw new NotFoundException("Career combo not found");
    }
    return { combo: fallback };
  }

  @Get("content/:key")
  async getSiteContent(@Param("key") key: string) {
    if (!this.prisma.isConnected) {
      return { content: null };
    }
    const content = await this.prisma.siteContent.findFirst({
      where: { key, isVisible: true },
    });
    return { content };
  }

  @Get("site-settings")
  async getSiteSettings() {
    if (this.prisma.isConnected) {
      const settings = await this.prisma.siteSettings.findUnique({
        where: { key: "default" },
      });
      if (settings) return { settings };
    }
    return {
      settings: {
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
    };
  }

  @Get("hero-banners")
  async getHeroBanners() {
    if (this.prisma.isConnected) {
      const banners = await this.prisma.heroBanner.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { slideOrder: "asc" },
      });
      if (banners.length > 0) return { banners };
    }
    return { banners: [] };
  }

  @Post("enquiries/student")
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  async submitStudentEnquiry(
    @Body(new ZodValidationPipe(StudentEnquirySchema)) body: StudentEnquiryInput,
    @Req() req: Request,
  ) {
    if (body.website) {
      return { ok: true, referenceCode: "SPAM-FILTERED" };
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Database is unavailable. Please call or WhatsApp +91 70223 37580.");
    }

    const referenceCode = this.makeRef("VLN-ENQ");
    const created = await this.prisma.studentEnquiry.create({
      data: {
        referenceCode,
        fullName: body.fullName,
        phone: body.phone,
        email: body.email || null,
        qualification: body.qualification,
        interestedProgramme: body.interestedProgramme || null,
        preferredBatch: body.preferredBatch || null,
        message: body.message || null,
        sourcePage: body.sourcePage || null,
        consentRecords: {
          create: {
            purpose: "student_enquiry_contact",
            consented: true,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          },
        },
      },
    });

    await this.notifyAdmin(
      `New Student Enquiry (${referenceCode})`,
      `<p><strong>Name:</strong> ${body.fullName}</p><p><strong>Phone:</strong> ${body.phone}</p><p><strong>Programme:</strong> ${body.interestedProgramme || "General"}</p>`,
    );

    return {
      ok: true,
      id: created.id,
      referenceCode: created.referenceCode,
      message: "Your enquiry has been recorded. Our admissions counselor will contact you shortly.",
    };
  }

  @Post("enquiries/demo")
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  async submitDemoBooking(
    @Body(new ZodValidationPipe(DemoBookingSchema)) body: DemoBookingInput,
    @Req() req: Request,
  ) {
    if (body.website) {
      return { ok: true, referenceCode: "SPAM-FILTERED" };
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Database is unavailable. Please WhatsApp +91 70223 37580.");
    }

    const referenceCode = this.makeRef("VLN-DEMO");
    const created = await this.prisma.demoBooking.create({
      data: {
        referenceCode,
        fullName: body.fullName,
        phone: body.phone,
        email: body.email || null,
        qualification: body.qualification,
        interestedProgramme: body.interestedProgramme,
        preferredBatch: body.preferredBatch,
        sourcePage: body.sourcePage || null,
        consentRecords: {
          create: {
            purpose: "demo_class_booking",
            consented: true,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          },
        },
      },
    });

    await this.notifyAdmin(
      `New Demo Class Booking (${referenceCode})`,
      `<p><strong>Name:</strong> ${body.fullName}</p><p><strong>Phone:</strong> ${body.phone}</p><p><strong>Programme:</strong> ${body.interestedProgramme}</p><p><strong>Batch:</strong> ${body.preferredBatch}</p>`,
    );

    return {
      ok: true,
      id: created.id,
      referenceCode: created.referenceCode,
      message: "Your demo class request has been confirmed.",
    };
  }

  @Post("enquiries/brochure")
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  async submitBrochureRequest(
    @Body(new ZodValidationPipe(BrochureRequestSchema)) body: BrochureRequestInput,
    @Req() req: Request,
  ) {
    if (body.website) {
      return { ok: true, referenceCode: "SPAM-FILTERED", downloadUrl: "/api/brochures/complete" };
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Database is unavailable.");
    }

    const referenceCode = this.makeRef("VLN-BRO");
    const created = await this.prisma.brochureRequest.create({
      data: {
        referenceCode,
        fullName: body.fullName,
        phone: body.phone,
        qualification: body.qualification,
        interestedProgramme: body.interestedProgramme || null,
        brochureType: body.brochureType,
        brochureSlug: body.brochureSlug || null,
        consentRecords: {
          create: {
            purpose: "brochure_download_followup",
            consented: true,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          },
        },
      },
    });

    const downloadUrl =
      body.brochureType === "course" && body.brochureSlug
        ? `/api/brochures/course/${encodeURIComponent(body.brochureSlug)}`
        : body.brochureType === "combo"
          ? `/api/brochures/combo${body.brochureSlug ? `?slug=${encodeURIComponent(body.brochureSlug)}` : ""}`
          : body.brochureType === "academic"
            ? "/api/brochures/academic"
            : "/api/brochures/complete";

    return {
      ok: true,
      id: created.id,
      referenceCode: created.referenceCode,
      downloadUrl,
    };
  }

  @Post("enquiries/institutional")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async submitInstitutionalEnquiry(
    @Body(new ZodValidationPipe(InstitutionalEnquirySchema)) body: InstitutionalEnquiryInput,
    @Req() req: Request,
  ) {
    if (body.website) {
      return { ok: true, referenceCode: "SPAM-FILTERED" };
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Database is unavailable.");
    }

    // Prevent accidental duplicate submission within 2 minutes
    const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000);
    const recent = await this.prisma.institutionalEnquiry.findFirst({
      where: {
        officialEmail: body.officialEmail.toLowerCase(),
        institutionName: body.institutionName,
        createdAt: { gte: twoMinAgo },
      },
    });
    if (recent) {
      return {
        ok: true,
        id: recent.id,
        referenceCode: recent.referenceCode,
        message: "Your institutional proposal request was already received.",
      };
    }

    const referenceCode = this.makeRef("VLN-INST");
    const created = await this.prisma.institutionalEnquiry.create({
      data: {
        referenceCode,
        fullName: body.fullName,
        designation: body.designation,
        institutionName: body.institutionName,
        cityArea: body.cityArea || null,
        officialEmail: body.officialEmail.toLowerCase(),
        phone: body.phone,
        interestedProgrammes: body.interestedProgrammes,
        estimatedBatchSize: body.estimatedBatchSize,
        message: body.message || null,
        consentRecords: {
          create: {
            purpose: "institutional_partnership_proposal",
            consented: true,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          },
        },
      },
    });

    await this.emailService.sendMail({
      to: body.officialEmail,
      subject: `VLEARNIN Academic Partnerships — Proposal Request Received (${referenceCode})`,
      html: `<p>Dear ${body.fullName},</p><p>Thank you for reaching out to VLEARNIN Academy on behalf of <strong>${body.institutionName}</strong>. Our Academic Partnerships team has received your request (${referenceCode}) and will connect with you shortly.</p><p>Warm regards,<br/>VLEARNIN Academy, Bengaluru</p>`,
    });

    await this.notifyAdmin(
      `New Institutional Partnership Request (${referenceCode})`,
      `<p><strong>Institution:</strong> ${body.institutionName}</p><p><strong>Contact:</strong> ${body.fullName} (${body.designation})</p><p><strong>Batch Size:</strong> ${body.estimatedBatchSize}</p>`,
    );

    return {
      ok: true,
      id: created.id,
      referenceCode: created.referenceCode,
      message: "Institutional proposal request submitted successfully.",
    };
  }

  @Post("enquiries/employer")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async submitEmployerRequest(
    @Body(new ZodValidationPipe(EmployerRequestSchema)) body: EmployerRequestInput,
    @Req() req: Request,
  ) {
    if (body.website) {
      return { ok: true, referenceCode: "SPAM-FILTERED" };
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Database is unavailable.");
    }

    const referenceCode = this.makeRef("VLN-EMP");
    const created = await this.prisma.employerRequest.create({
      data: {
        referenceCode,
        contactPersonName: body.contactPersonName,
        companyName: body.companyName,
        officialEmail: body.officialEmail.toLowerCase(),
        phone: body.phone,
        roleCategories: body.roleCategories,
        opportunityType: body.opportunityType,
        jobLocation: body.jobLocation,
        jobDescription: body.jobDescription || null,
        consentRecords: {
          create: {
            purpose: "employer_candidate_request",
            consented: true,
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
          },
        },
      },
    });

    await this.notifyAdmin(
      `New Employer Hiring Request (${referenceCode})`,
      `<p><strong>Company:</strong> ${body.companyName}</p><p><strong>Roles:</strong> ${body.roleCategories.join(", ")}</p><p><strong>Type:</strong> ${body.opportunityType}</p>`,
    );

    return {
      ok: true,
      id: created.id,
      referenceCode: created.referenceCode,
      message: "Your hiring requirement has been received. Our placement team will share consented candidate profiles.",
    };
  }

  @Get("brochures/complete")
  async downloadCompleteBrochure(@Res() res: Response) {
    const buffer = await this.pdfService.generateCompleteBrochure();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="VLEARNIN-Complete-Course-Brochure.pdf"');
    res.send(buffer);
  }

  @Get("brochures/academic")
  async downloadAcademicBrochure(@Res() res: Response) {
    const buffer = await this.pdfService.generateAcademicBrochure();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="VLEARNIN-Academic-Partnerships-Brochure.pdf"');
    res.send(buffer);
  }

  @Get("brochures/combo")
  async downloadComboBrochure(@Query("slug") slug: string | undefined, @Res() res: Response) {
    const buffer = await this.pdfService.generateComboBrochure(slug);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="VLEARNIN-Career-Combos${slug ? `-${slug}` : ""}.pdf"`,
    );
    res.send(buffer);
  }

  @Get("brochures/course/:slug")
  async downloadCourseSyllabus(@Param("slug") slug: string, @Res() res: Response) {
    const buffer = await this.pdfService.generateCourseSyllabus(slug);
    if (!buffer) {
      throw new NotFoundException("Course syllabus not found");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="VLEARNIN-Syllabus-${slug}.pdf"`);
    res.send(buffer);
  }

  @Post("certificates/verify")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  async verifyCertificate(
    @Body(new ZodValidationPipe(VerifyCertificateSchema)) body: VerifyCertificateInput,
    @Req() req: Request,
  ) {
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Certificate verification service is temporarily unavailable.");
    }

    const cert = await this.prisma.certificate.findUnique({
      where: { certificateId: body.certificateId.trim().toUpperCase() },
    });

    if (!cert) {
      return {
        found: false,
        status: "INVALID",
        message: "Certificate not found. Please check the Certificate ID or contact VLEARNIN.",
      };
    }

    await this.prisma.certificateAuditLog.create({
      data: {
        certificateId: cert.id,
        action: "VERIFIED_BY_ID",
        ipAddress: req.ip,
        details: `Verified via Certificate ID lookup (${cert.status})`,
      },
    });

    if (cert.status === "REVOKED") {
      return {
        found: true,
        status: "REVOKED",
        message: "This credential is no longer valid. Contact the issuing authority for assistance.",
        certificate: {
          certificateId: cert.certificateId,
          issuingAuthority: cert.issuingAuthority,
        },
      };
    }

    return {
      found: true,
      status: "VALID",
      message: "Verified Authentic Credential",
      certificate: {
        certificateId: cert.certificateId,
        recipientName: cert.recipientName,
        programmeTitle: cert.programmeTitle,
        programmeDuration: cert.programmeDuration,
        capstoneStatus: cert.capstoneStatus,
        grade: cert.grade,
        issueDate: cert.issueDate,
        issuingAuthority: cert.issuingAuthority,
        verificationToken: cert.verificationToken,
      },
    };
  }

  @Get("certificates/public/:token")
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async verifyCertificateByToken(@Param("token") token: string, @Req() req: Request) {
    if (!token || token.length < 8) {
      throw new BadRequestException("Invalid verification token");
    }
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException("Certificate verification service is temporarily unavailable.");
    }

    const cert = await this.prisma.certificate.findFirst({
      where: {
        OR: [
          { verificationToken: token },
          { certificateId: token.toUpperCase() },
        ],
      },
    });

    if (!cert) {
      return {
        found: false,
        status: "INVALID",
        message: "Certificate not found. Please check the Certificate ID or contact VLEARNIN.",
      };
    }

    await this.prisma.certificateAuditLog.create({
      data: {
        certificateId: cert.id,
        action: "VERIFIED_BY_QR",
        ipAddress: req.ip,
        details: `Verified via public QR/URL (${cert.status})`,
      },
    });

    if (cert.status === "REVOKED") {
      return {
        found: true,
        status: "REVOKED",
        message: "This credential is no longer valid. Contact the issuing authority for assistance.",
        certificate: {
          certificateId: cert.certificateId,
          issuingAuthority: cert.issuingAuthority,
        },
      };
    }

    return {
      found: true,
      status: "VALID",
      message: "Verified Authentic Credential",
      certificate: {
        certificateId: cert.certificateId,
        recipientName: cert.recipientName,
        programmeTitle: cert.programmeTitle,
        programmeDuration: cert.programmeDuration,
        capstoneStatus: cert.capstoneStatus,
        grade: cert.grade,
        issueDate: cert.issueDate,
        issuingAuthority: cert.issuingAuthority,
      },
    };
  }

  private async notifyAdmin(subject: string, html: string) {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail && this.emailService.isConfigured()) {
      await this.emailService.sendMail({ to: adminEmail, subject, html });
    }
  }
}
