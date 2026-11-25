import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { AdminAuthGuard, Roles } from "../auth/auth.guard";
import { PrismaService } from "../prisma/prisma.service";
import { PdfService } from "../common/pdf.service";

interface AuthedRequest extends Request {
  adminUser: { id: string; email: string; name: string; role: string };
}

@Controller("admin")
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pdfService: PdfService,
  ) {}

  @Get("dashboard")
  async getDashboard() {
    const [
      totalStudentEnquiries,
      newStudentEnquiries,
      demoBookingsCount,
      brochureRequestsCount,
      institutionalEnquiriesCount,
      employerRequestsCount,
      publishedCoursesCount,
      activeCertificatesCount,
      revokedCertificatesCount,
      recentEnquiries,
    ] = await Promise.all([
      this.prisma.studentEnquiry.count({ where: { deletedAt: null } }),
      this.prisma.studentEnquiry.count({ where: { status: "NEW", deletedAt: null } }),
      this.prisma.demoBooking.count({ where: { deletedAt: null } }),
      this.prisma.brochureRequest.count(),
      this.prisma.institutionalEnquiry.count({ where: { deletedAt: null } }),
      this.prisma.employerRequest.count({ where: { deletedAt: null } }),
      this.prisma.course.count({ where: { status: "PUBLISHED", deletedAt: null } }),
      this.prisma.certificate.count({ where: { status: "ACTIVE" } }),
      this.prisma.certificate.count({ where: { status: "REVOKED" } }),
      this.prisma.studentEnquiry.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    return {
      metrics: {
        totalStudentEnquiries,
        newStudentEnquiries,
        demoBookingsCount,
        brochureRequestsCount,
        institutionalEnquiriesCount,
        employerRequestsCount,
        publishedCoursesCount,
        activeCertificatesCount,
        revokedCertificatesCount,
      },
      recentEnquiries,
    };
  }

  // ---- COURSES ----
  @Get("courses")
  async listCourses() {
    const courses = await this.prisma.course.findMany({
      where: { deletedAt: null },
      include: {
        category: true,
        modules: { orderBy: { moduleNumber: "asc" } },
        tools: { orderBy: { displayOrder: "asc" } },
        outcomes: { orderBy: { displayOrder: "asc" } },
      },
      orderBy: { displayOrder: "asc" },
    });
    return { courses };
  }

  @Post("courses")
  @Roles("SUPER_ADMIN", "ADMIN", "ACADEMIC_COORDINATOR")
  async createCourse(@Body() body: any, @Req() req: AuthedRequest) {
    if (!body?.title || !body?.slug || !body?.categoryId) {
      throw new BadRequestException("title, slug, and categoryId are required");
    }
    const course = await this.prisma.course.create({
      data: {
        slug: body.slug,
        title: body.title,
        categoryId: body.categoryId,
        durationHours: Number(body.durationHours || 30),
        durationLabel: body.durationLabel || "30 Hours (5 Modules × 6 Hours)",
        idealFor: body.idealFor || "",
        summary: body.summary || "",
        overview: body.overview || "",
        capstoneTitle: body.capstoneTitle || "Capstone Project",
        capstoneDescription: body.capstoneDescription || "",
        careerPathways: body.careerPathways || [],
        learningModes: body.learningModes || ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
        imageUrl: body.imageUrl || null,
        feeDisplay: body.feeDisplay || null,
        status: body.status || "DRAFT",
      },
    });
    await this.audit(req.adminUser.id, "CREATE_COURSE", "Course", course.id, req.ip);
    return { course };
  }

  @Patch("courses/:id")
  @Roles("SUPER_ADMIN", "ADMIN", "ACADEMIC_COORDINATOR", "EDITOR")
  async updateCourse(@Param("id") id: string, @Body() body: any, @Req() req: AuthedRequest) {
    const course = await this.prisma.course.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.summary !== undefined ? { summary: body.summary } : {}),
        ...(body.overview !== undefined ? { overview: body.overview } : {}),
        ...(body.idealFor !== undefined ? { idealFor: body.idealFor } : {}),
        ...(body.feeDisplay !== undefined ? { feeDisplay: body.feeDisplay } : {}),
        ...(body.batchDetails !== undefined ? { batchDetails: body.batchDetails } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
      },
    });
    await this.audit(req.adminUser.id, "UPDATE_COURSE", "Course", course.id, req.ip);
    return { course };
  }

  @Delete("courses/:id")
  @Roles("SUPER_ADMIN", "ADMIN")
  async archiveCourse(@Param("id") id: string, @Req() req: AuthedRequest) {
    const course = await this.prisma.course.update({
      where: { id },
      data: { status: "ARCHIVED", deletedAt: new Date() },
    });
    await this.audit(req.adminUser.id, "ARCHIVE_COURSE", "Course", course.id, req.ip);
    return { ok: true };
  }

  // ---- CATEGORIES & COMBOS ----
  @Get("categories")
  async listCategories() {
    const categories = await this.prisma.courseCategory.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: "asc" },
    });
    return { categories };
  }

  @Get("career-combos")
  async listCombos() {
    const combos = await this.prisma.careerCombo.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: "asc" },
    });
    return { combos };
  }

  // ---- ENQUIRIES ----
  @Get("enquiries")
  async listEnquiries(
    @Query("type") type = "student",
    @Query("status") status?: string,
    @Query("q") q?: string,
  ) {
    if (type === "demo") {
      const items = await this.prisma.demoBooking.findMany({
        where: {
          deletedAt: null,
          ...(status ? { status: status as any } : {}),
          ...(q ? { fullName: { contains: q, mode: "insensitive" } } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return { type, items };
    }
    if (type === "institutional") {
      const items = await this.prisma.institutionalEnquiry.findMany({
        where: {
          deletedAt: null,
          ...(status ? { status: status as any } : {}),
          ...(q ? { institutionName: { contains: q, mode: "insensitive" } } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return { type, items };
    }
    if (type === "employer") {
      const items = await this.prisma.employerRequest.findMany({
        where: {
          deletedAt: null,
          ...(status ? { status: status as any } : {}),
          ...(q ? { companyName: { contains: q, mode: "insensitive" } } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return { type, items };
    }
    if (type === "brochure") {
      const items = await this.prisma.brochureRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return { type, items };
    }

    const items = await this.prisma.studentEnquiry.findMany({
      where: {
        deletedAt: null,
        ...(status ? { status: status as any } : {}),
        ...(q
          ? {
              OR: [
                { fullName: { contains: q, mode: "insensitive" } },
                { phone: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { notes: { orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return { type: "student", items };
  }

  @Patch("enquiries/:id")
  async updateEnquiry(
    @Param("id") id: string,
    @Body() body: { type?: string; status?: any; note?: string },
    @Req() req: AuthedRequest,
  ) {
    const type = body.type || "student";
    if (type === "demo") {
      const updated = await this.prisma.demoBooking.update({
        where: { id },
        data: { ...(body.status ? { status: body.status } : {}) },
      });
      return { item: updated };
    }
    if (type === "institutional") {
      const updated = await this.prisma.institutionalEnquiry.update({
        where: { id },
        data: { ...(body.status ? { status: body.status } : {}) },
      });
      return { item: updated };
    }
    if (type === "employer") {
      const updated = await this.prisma.employerRequest.update({
        where: { id },
        data: { ...(body.status ? { status: body.status } : {}) },
      });
      return { item: updated };
    }

    const updated = await this.prisma.studentEnquiry.update({
      where: { id },
      data: {
        ...(body.status ? { status: body.status } : {}),
        ...(body.note
          ? {
              notes: {
                create: {
                  authorId: req.adminUser.id,
                  note: body.note,
                },
              },
            }
          : {}),
      },
      include: { notes: { orderBy: { createdAt: "desc" } } },
    });
    await this.audit(req.adminUser.id, "UPDATE_ENQUIRY", "StudentEnquiry", id, req.ip);
    return { item: updated };
  }

  @Get("enquiries/export/csv")
  async exportEnquiriesCsv(@Res() res: Response, @Req() req: AuthedRequest) {
    const items = await this.prisma.studentEnquiry.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 1000,
    });
    const header = "Reference,Full Name,Phone,Email,Qualification,Programme,Status,Created At\n";
    const rows = items
      .map((i) =>
        [
          i.referenceCode,
          `"${i.fullName.replace(/"/g, '""')}"`,
          i.phone,
          i.email || "",
          i.qualification,
          `"${(i.interestedProgramme || "").replace(/"/g, '""')}"`,
          i.status,
          i.createdAt.toISOString(),
        ].join(","),
      )
      .join("\n");

    await this.audit(req.adminUser.id, "EXPORT_ENQUIRIES_CSV", "StudentEnquiry", undefined, req.ip);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="vlearnin-student-enquiries.csv"');
    res.send(header + rows);
  }

  // ---- STUDENTS & ENROLLMENTS ----
  @Get("students")
  async listStudents() {
    const students = await this.prisma.student.findMany({
      where: { deletedAt: null },
      include: { enrollments: { include: { course: true } }, certificates: true },
      orderBy: { createdAt: "desc" },
    });
    return { students };
  }

  @Post("students")
  async createStudent(@Body() body: any, @Req() req: AuthedRequest) {
    if (!body?.fullName) {
      throw new BadRequestException("fullName is required");
    }
    const studentCode = `VLN-STU-${new Date().getFullYear()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    const student = await this.prisma.student.create({
      data: {
        studentCode,
        fullName: body.fullName,
        displayName: body.displayName || body.fullName,
        email: body.email || null,
        phone: body.phone || null,
        qualification: body.qualification || null,
        collegeName: body.collegeName || null,
      },
    });
    await this.audit(req.adminUser.id, "CREATE_STUDENT", "Student", student.id, req.ip);
    return { student };
  }

  // ---- CERTIFICATES ----
  @Get("certificates")
  async listCertificates() {
    const certificates = await this.prisma.certificate.findMany({
      include: { student: true, course: true },
      orderBy: { createdAt: "desc" },
    });
    return { certificates };
  }

  @Post("certificates")
  @Roles("SUPER_ADMIN", "ADMIN", "ACADEMIC_COORDINATOR")
  async issueCertificate(@Body() body: any, @Req() req: AuthedRequest) {
    if (!body?.studentId || !body?.courseId) {
      throw new BadRequestException("studentId and courseId are required");
    }

    const [student, course] = await Promise.all([
      this.prisma.student.findUnique({ where: { id: body.studentId } }),
      this.prisma.course.findUnique({ where: { id: body.courseId } }),
    ]);

    if (!student || !course) {
      throw new NotFoundException("Student or course not found");
    }

    const certificateId =
      body.certificateId ||
      `VLN-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const verificationToken =
      body.verificationToken || crypto.randomBytes(16).toString("hex");

    const certificate = await this.prisma.certificate.create({
      data: {
        certificateId: certificateId.toUpperCase(),
        verificationToken,
        studentId: student.id,
        courseId: course.id,
        recipientName: body.recipientName || student.displayName || student.fullName,
        programmeTitle: course.title,
        programmeDuration: course.durationLabel,
        capstoneStatus: body.capstoneStatus || "Completed & Evaluated",
        grade: body.grade || null,
        issueDate: body.issueDate ? new Date(body.issueDate) : new Date(),
        issuedById: req.adminUser.id,
        auditLogs: {
          create: {
            action: "ISSUED",
            actorId: req.adminUser.id,
            ipAddress: req.ip,
            details: `Issued ${certificateId} for ${course.title}`,
          },
        },
      },
    });

    await this.audit(req.adminUser.id, "ISSUE_CERTIFICATE", "Certificate", certificate.id, req.ip);
    return { certificate };
  }

  @Post("certificates/:id/revoke")
  @Roles("SUPER_ADMIN", "ADMIN")
  async revokeCertificate(
    @Param("id") id: string,
    @Body() body: { reason?: string },
    @Req() req: AuthedRequest,
  ) {
    const certificate = await this.prisma.certificate.update({
      where: { id },
      data: {
        status: "REVOKED",
        revokedAt: new Date(),
        revocationReason: body.reason || "Revoked by administrator",
        revokedById: req.adminUser.id,
        auditLogs: {
          create: {
            action: "REVOKED",
            actorId: req.adminUser.id,
            ipAddress: req.ip,
            details: body.reason || "Revoked by administrator",
          },
        },
      },
    });

    await this.audit(req.adminUser.id, "REVOKE_CERTIFICATE", "Certificate", id, req.ip);
    return { certificate };
  }

  @Get("certificates/:id/pdf")
  async downloadCertificatePdf(@Param("id") id: string, @Res() res: Response, @Req() req: AuthedRequest) {
    const cert = await this.prisma.certificate.findUnique({ where: { id } });
    if (!cert) {
      throw new NotFoundException("Certificate not found");
    }

    const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/verify-certificate/${cert.verificationToken}`;

    const buffer = await this.pdfService.generateCertificatePdf({
      certificateId: cert.certificateId,
      recipientName: cert.recipientName,
      programmeTitle: cert.programmeTitle,
      programmeDuration: cert.programmeDuration,
      capstoneStatus: cert.capstoneStatus,
      grade: cert.grade,
      issueDate: cert.issueDate,
      verificationUrl,
    });

    await this.prisma.certificateAuditLog.create({
      data: {
        certificateId: cert.id,
        action: "PDF_DOWNLOADED",
        actorId: req.adminUser.id,
        ipAddress: req.ip,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="VLEARNIN-Certificate-${cert.certificateId}.pdf"`);
    res.send(buffer);
  }

  // ---- CONTENT, BANNERS, SETTINGS, AUDIT LOGS ----
  @Get("content")
  async listContent() {
    const items = await this.prisma.siteContent.findMany({ orderBy: { key: "asc" } });
    return { items };
  }

  @Post("content")
  async upsertContent(@Body() body: { key: string; section: string; title?: string; content: any; isVisible?: boolean }, @Req() req: AuthedRequest) {
    const item = await this.prisma.siteContent.upsert({
      where: { key: body.key },
      create: {
        key: body.key,
        section: body.section,
        title: body.title || null,
        content: body.content,
        isVisible: body.isVisible ?? true,
      },
      update: {
        section: body.section,
        title: body.title || null,
        content: body.content,
        isVisible: body.isVisible ?? true,
      },
    });
    await this.audit(req.adminUser.id, "UPSERT_CONTENT", "SiteContent", item.id, req.ip);
    return { item };
  }

  @Get("hero-banners")
  async listHeroBanners() {
    const banners = await this.prisma.heroBanner.findMany({ orderBy: { slideOrder: "asc" } });
    return { banners };
  }

  @Get("settings")
  async getSettings() {
    const settings = await this.prisma.siteSettings.findUnique({ where: { key: "default" } });
    return { settings };
  }

  @Patch("settings")
  @Roles("SUPER_ADMIN", "ADMIN")
  async updateSettings(@Body() body: any, @Req() req: AuthedRequest) {
    const settings = await this.prisma.siteSettings.update({
      where: { key: "default" },
      data: {
        ...(body.institutionName !== undefined ? { institutionName: body.institutionName } : {}),
        ...(body.tagline !== undefined ? { tagline: body.tagline } : {}),
        ...(body.address !== undefined ? { address: body.address } : {}),
        ...(body.phone !== undefined ? { phone: body.phone } : {}),
        ...(body.whatsappNumber !== undefined ? { whatsappNumber: body.whatsappNumber } : {}),
        ...(body.email !== undefined ? { email: body.email } : {}),
        ...(body.weekdayTimings !== undefined ? { weekdayTimings: body.weekdayTimings } : {}),
        ...(body.sundayTimings !== undefined ? { sundayTimings: body.sundayTimings } : {}),
        ...(body.showEmployerTurnaroundClaim !== undefined
          ? { showEmployerTurnaroundClaim: Boolean(body.showEmployerTurnaroundClaim) }
          : {}),
        ...(body.showZeroFeeClaim !== undefined ? { showZeroFeeClaim: Boolean(body.showZeroFeeClaim) } : {}),
      },
    });
    await this.audit(req.adminUser.id, "UPDATE_SETTINGS", "SiteSettings", settings.id, req.ip);
    return { settings };
  }

  @Get("audit-logs")
  async listAuditLogs() {
    const logs = await this.prisma.auditLog.findMany({
      include: { actor: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return { logs };
  }

  private async audit(
    actorId: string,
    action: string,
    entityType: string,
    entityId?: string,
    ipAddress?: string,
  ) {
    await this.prisma.auditLog.create({
      data: { actorId, action, entityType, entityId, ipAddress },
    });
  }
}
