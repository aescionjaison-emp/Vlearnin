import { Injectable } from "@nestjs/common";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { BRAND, OFFICIAL_COMBOS, OFFICIAL_COURSES } from "@vlearnin/shared";

const NAVY = "#071B3D";
const ROYAL = "#1746A2";
const GOLD = "#D4A54A";
const DARK = "#101828";
const MUTED = "#667085";
const LIGHT_BG = "#F4F7FC";

@Injectable()
export class PdfService {
  private buildDocBuffer(build: (doc: PDFKit.PDFDocument) => void): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 48, info: { Author: BRAND.legalName } });
      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
      build(doc);
      doc.end();
    });
  }

  private drawHeader(doc: PDFKit.PDFDocument, subtitle: string) {
    doc.rect(0, 0, doc.page.width, 96).fill(NAVY);
    doc.rect(0, 96, doc.page.width, 4).fill(GOLD);

    doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(22).text("VLEARNIN", 48, 28);
    doc
      .fillColor(GOLD)
      .font("Helvetica")
      .fontSize(9.5)
      .text(BRAND.tagline.toUpperCase(), 48, 54, { characterSpacing: 1.2 });

    doc
      .fillColor("#E2E8F0")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(subtitle, 300, 38, { align: "right", width: doc.page.width - 348 });

    doc.y = 120;
  }

  private drawFooter(doc: PDFKit.PDFDocument) {
    const bottomY = doc.page.height - 62;
    doc.moveTo(48, bottomY - 8).lineTo(doc.page.width - 48, bottomY - 8).strokeColor("#DFE5EE").stroke();
    doc
      .fillColor(MUTED)
      .font("Helvetica")
      .fontSize(8.5)
      .text(
        `${BRAND.legalName} | ${BRAND.address} | Phone & WhatsApp: ${BRAND.phoneDisplay} | ${BRAND.email}`,
        48,
        bottomY,
        { align: "center", width: doc.page.width - 96 },
      );
  }

  async generateCompleteBrochure(): Promise<Buffer> {
    return this.buildDocBuffer((doc) => {
      this.drawHeader(doc, "COMPLETE PROGRAMME BROCHURE");

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(18).text("Industry-Aligned Certification Programmes");
      doc.moveDown(0.3);
      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(10.5)
        .text(
          "7 Standalone Certification Programmes (30 Hours Each) & 4 Career Accelerator Combos across AI & Business Intelligence, Corporate Finance & Capital Markets, and Digital Marketing & Creative Media.",
        );

      doc.moveDown(1);
      for (const course of OFFICIAL_COURSES) {
        if (doc.y > 680) {
          this.drawFooter(doc);
          doc.addPage();
          this.drawHeader(doc, "COMPLETE PROGRAMME BROCHURE");
        }
        doc.fillColor(ROYAL).font("Helvetica-Bold").fontSize(12).text(course.title);
        doc
          .fillColor(MUTED)
          .font("Helvetica")
          .fontSize(9.5)
          .text(`${course.categoryName} • ${course.durationLabel} • Ideal For: ${course.idealFor}`);
        doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(course.summary);
        doc.moveDown(0.7);
      }

      doc.addPage();
      this.drawHeader(doc, "CAREER ACCELERATOR COMBOS");
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(16).text("Dual-Skill Career Accelerator Combos");
      doc.moveDown(0.8);

      for (const combo of OFFICIAL_COMBOS) {
        doc.fillColor(ROYAL).font("Helvetica-Bold").fontSize(12).text(`${combo.title} (${combo.durationLabel})`);
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(9.5).text(`Included: ${combo.includedLabel}`);
        doc.fillColor(MUTED).font("Helvetica").fontSize(9.5).text(`Ideal For: ${combo.idealFor}`);
        doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(combo.summary);
        doc.moveDown(0.8);
      }

      doc.moveDown(0.5);
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("Campus & Batch Timings");
      doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(BRAND.address);
      doc.text(BRAND.timings.weekdays);
      doc.text(BRAND.timings.sunday);
      doc.moveDown(0.6);
      doc.fillColor(MUTED).font("Helvetica").fontSize(8.5).text(BRAND.placementDisclaimer);

      this.drawFooter(doc);
    });
  }

  async generateCourseSyllabus(slug: string): Promise<Buffer | null> {
    const course = OFFICIAL_COURSES.find((c) => c.slug === slug);
    if (!course) return null;

    return this.buildDocBuffer((doc) => {
      this.drawHeader(doc, "OFFICIAL COURSE SYLLABUS");

      doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(10).text(course.categoryName.toUpperCase());
      doc.moveDown(0.2);
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(19).text(course.title);
      doc.moveDown(0.4);
      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(10)
        .text(`Duration: ${course.durationLabel}   |   Modes: ${course.learningModes.join(", ")}`);
      doc.text(`Ideal For: ${course.idealFor}`);
      doc.moveDown(0.8);

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("Programme Overview");
      doc.fillColor(DARK).font("Helvetica").fontSize(10).text(course.overview);
      doc.moveDown(0.7);

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("Tools Covered");
      doc.fillColor(DARK).font("Helvetica").fontSize(10).text(course.tools.join("  •  "));
      doc.moveDown(0.8);

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("5-Module Curriculum");
      doc.moveDown(0.3);
      for (const mod of course.modules) {
        if (doc.y > 690) {
          this.drawFooter(doc);
          doc.addPage();
          this.drawHeader(doc, "OFFICIAL COURSE SYLLABUS");
        }
        doc
          .fillColor(ROYAL)
          .font("Helvetica-Bold")
          .fontSize(10.5)
          .text(`Module ${mod.moduleNumber} (${mod.durationHours} Hours): ${mod.title}`);
        doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(mod.topics.map((t) => `• ${t}`).join("   "));
        doc.moveDown(0.45);
      }

      doc.moveDown(0.3);
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("Key Learning Outcomes");
      for (const outcome of course.outcomes) {
        doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(`✓ ${outcome}`);
      }

      doc.moveDown(0.5);
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text(`Capstone: ${course.capstoneTitle}`);
      doc.fillColor(DARK).font("Helvetica").fontSize(9.5).text(course.capstoneDescription);

      this.drawFooter(doc);
    });
  }

  async generateComboBrochure(slug?: string): Promise<Buffer> {
    const combos = slug ? OFFICIAL_COMBOS.filter((c) => c.slug === slug) : OFFICIAL_COMBOS;
    const list = combos.length > 0 ? combos : OFFICIAL_COMBOS;

    return this.buildDocBuffer((doc) => {
      this.drawHeader(doc, "CAREER ACCELERATOR COMBOS");
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(18).text("Dual-Skill Career Accelerator Combos");
      doc.moveDown(0.8);

      for (const combo of list) {
        doc.fillColor(ROYAL).font("Helvetica-Bold").fontSize(13).text(`${combo.title} — ${combo.durationLabel}`);
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10).text(`Included: ${combo.includedLabel}`);
        doc.fillColor(MUTED).font("Helvetica").fontSize(9.5).text(`Ideal For: ${combo.idealFor}`);
        doc.moveDown(0.2);
        doc.fillColor(DARK).font("Helvetica").fontSize(10).text(combo.summary);
        doc.moveDown(0.2);
        for (const o of combo.outcomes) {
          doc.font("Helvetica").fontSize(9.5).text(`✓ ${o}`);
        }
        doc.moveDown(1);
      }

      this.drawFooter(doc);
    });
  }

  async generateAcademicBrochure(): Promise<Buffer> {
    return this.buildDocBuffer((doc) => {
      this.drawHeader(doc, "ACADEMIC & INSTITUTIONAL PARTNERSHIPS");

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(18).text("Empowering Colleges to Build Industry-Ready Graduates");
      doc.moveDown(0.4);
      doc
        .fillColor(DARK)
        .font("Helvetica")
        .fontSize(10.5)
        .text(
          "VLEARNIN collaborates with degree colleges, management institutes, and educational institutions across Karnataka to deliver structured 30-hour value-added certification programmes tailored to B.Com, BBA, BCA, and MBA students.",
        );
      doc.moveDown(0.8);

      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("6-Step Academic Delivery Framework");
      const steps = [
        "1. Curriculum Consultation — Align programme selection, batch size, and academic calendar.",
        "2. Programme Orientation — Introduce industry demand, software setup, and career pathways.",
        "3. Hands-On Classroom & Lab Sessions — 30 hours of practical instructor-led training.",
        "4. Assignments & Case Studies — Reinforce concepts through real business problem solving.",
        "5. Capstone Project & Practical Assessment — Final hands-on project presentation.",
        "6. Certification & Career Readiness — QR-verified certificates with resume & portfolio guidance.",
      ];
      for (const step of steps) {
        doc.fillColor(DARK).font("Helvetica").fontSize(10).text(step);
        doc.moveDown(0.2);
      }

      doc.moveDown(0.7);
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(12).text("Institutional Certification Portfolio");
      for (const course of OFFICIAL_COURSES) {
        doc
          .fillColor(ROYAL)
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(`${course.title} (${course.durationHours} Hours)`);
        doc.fillColor(MUTED).font("Helvetica").fontSize(9).text(`Target Streams: ${course.idealFor}`);
        doc.moveDown(0.3);
      }

      this.drawFooter(doc);
    });
  }

  async generateCertificatePdf(params: {
    certificateId: string;
    recipientName: string;
    programmeTitle: string;
    programmeDuration: string;
    capstoneStatus: string;
    grade?: string | null;
    issueDate: Date;
    verificationUrl: string;
  }): Promise<Buffer> {
    const qrDataUrl = await QRCode.toDataURL(params.verificationUrl, {
      width: 140,
      margin: 1,
      color: { dark: NAVY, light: "#FFFFFF" },
    });
    const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrBase64, "base64");

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 40,
        info: { Title: `VLEARNIN Certificate - ${params.certificateId}` },
      });
      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const w = doc.page.width;
      const h = doc.page.height;

      // Outer border
      doc.rect(20, 20, w - 40, h - 40).lineWidth(3).strokeColor(NAVY).stroke();
      doc.rect(28, 28, w - 56, h - 56).lineWidth(1.2).strokeColor(GOLD).stroke();

      // Top Navy Ribbon
      doc.rect(28, 28, w - 56, 72).fill(NAVY);
      doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(24).text("VLEARNIN ACADEMY", 56, 46);
      doc
        .fillColor(GOLD)
        .font("Helvetica")
        .fontSize(10)
        .text("THE V-WAY TO LEARN, BUILD & LEAD.", 56, 76, { characterSpacing: 1.4 });

      doc
        .fillColor("#E2E8F0")
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`CERTIFICATE ID: ${params.certificateId}`, w - 300, 56, { align: "right", width: 244 });

      // Body
      doc
        .fillColor(GOLD)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("CERTIFICATE OF COMPLETION", 0, 130, { align: "center", width: w, characterSpacing: 2.5 });

      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(12)
        .text("This is to certify that", 0, 165, { align: "center", width: w });

      doc
        .fillColor(NAVY)
        .font("Helvetica-Bold")
        .fontSize(30)
        .text(params.recipientName, 60, 195, { align: "center", width: w - 120 });

      doc
        .fillColor(DARK)
        .font("Helvetica")
        .fontSize(12.5)
        .text("has successfully completed the practical certification programme", 0, 245, {
          align: "center",
          width: w,
        });

      doc
        .fillColor(ROYAL)
        .font("Helvetica-Bold")
        .fontSize(20)
        .text(params.programmeTitle, 70, 275, { align: "center", width: w - 140 });

      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(11)
        .text(
          `Duration: ${params.programmeDuration}   •   Capstone: ${params.capstoneStatus}${
            params.grade ? `   •   Grade: ${params.grade}` : ""
          }`,
          60,
          320,
          { align: "center", width: w - 120 },
        );

      const formattedDate = params.issueDate.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Bottom Section: Issue Date, Authority, QR
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10.5).text("Issue Date", 72, 425);
      doc.fillColor(MUTED).font("Helvetica").fontSize(10).text(formattedDate, 72, 442);

      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10.5).text("Issuing Authority", 260, 425);
      doc.fillColor(MUTED).font("Helvetica").fontSize(10).text("VLEARNIN Academy, Bengaluru", 260, 442);

      doc.image(qrBuffer, w - 156, 392, { width: 92, height: 92 });
      doc
        .fillColor(MUTED)
        .font("Helvetica")
        .fontSize(8)
        .text("Scan to verify credential", w - 170, 488, { width: 120, align: "center" });

      doc.end();
    });
  }
}
