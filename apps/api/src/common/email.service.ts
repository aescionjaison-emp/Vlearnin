import { Injectable, Logger } from "@nestjs/common";
import nodemailer from "nodemailer";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  isConfigured(): boolean {
    return Boolean(process.env.RESEND_API_KEY || this.transporter);
  }

  async sendMail(opts: SendMailOptions): Promise<{ sent: boolean; provider: string }> {
    const from = process.env.EMAIL_FROM || "VLEARNIN Academy <info@vlearnin.com>";

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [opts.to],
            subject: opts.subject,
            html: opts.html,
            text: opts.text,
          }),
        });
        if (res.ok) {
          return { sent: true, provider: "resend" };
        }
        this.logger.warn(`Resend responded with status ${res.status}`);
      } catch (err) {
        this.logger.error(`Resend error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from,
          to: opts.to,
          subject: opts.subject,
          html: opts.html,
          text: opts.text,
        });
        return { sent: true, provider: "smtp" };
      } catch (err) {
        this.logger.error(`SMTP error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    this.logger.log(`Email integration not configured; skipped mail to ${opts.to} (${opts.subject})`);
    return { sent: false, provider: "none" };
  }
}
