import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s\-()]{8,18}$/;

export const StudentEnquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone or WhatsApp number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  qualification: z.string().trim().min(1, "Select your qualification").max(80),
  interestedProgramme: z.string().trim().max(160).optional().or(z.literal("")),
  preferredBatch: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(120).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please provide consent to be contacted by VLEARNIN" }),
  }),
  website: z.string().max(0).optional(), // honeypot
});

export const DemoBookingSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone or WhatsApp number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  qualification: z.string().trim().min(1, "Select your qualification").max(80),
  interestedProgramme: z.string().trim().min(1, "Select a programme or combo").max(160),
  preferredBatch: z.string().trim().min(1, "Select a preferred batch timing").max(80),
  sourcePage: z.string().trim().max(120).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to schedule a demo class" }),
  }),
  website: z.string().max(0).optional(),
});

export const BrochureRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone or WhatsApp number"),
  qualification: z.string().trim().min(1, "Select your qualification").max(80),
  interestedProgramme: z.string().trim().max(160).optional().or(z.literal("")),
  brochureType: z.enum(["complete", "course", "combo", "academic"]).default("complete"),
  brochureSlug: z.string().trim().max(120).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to download the brochure" }),
  }),
  website: z.string().max(0).optional(),
});

export const InstitutionalEnquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  designation: z.string().trim().min(2, "Select your designation").max(80),
  institutionName: z.string().trim().min(2, "College / Institution name is required").max(180),
  cityArea: z.string().trim().max(120).optional().or(z.literal("")),
  officialEmail: z.string().trim().email("Enter a valid official email"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone or WhatsApp number"),
  interestedProgrammes: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one programme or Custom Workshop"),
  estimatedBatchSize: z.string().trim().min(1, "Select estimated batch size").max(60),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit an institutional inquiry" }),
  }),
  website: z.string().max(0).optional(),
});

export const EmployerRequestSchema = z.object({
  contactPersonName: z.string().trim().min(2, "Contact person name is required").max(120),
  companyName: z.string().trim().min(2, "Company / Firm name is required").max(160),
  officialEmail: z.string().trim().email("Enter a valid official email"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  roleCategories: z
    .array(z.string().trim().min(1))
    .min(1, "Select at least one role category"),
  opportunityType: z.enum(["Full-Time", "Paid Internship"]),
  jobLocation: z.string().trim().min(1, "Select job location").max(80),
  jobDescription: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit hiring requirements" }),
  }),
  website: z.string().max(0).optional(),
});

export const VerifyCertificateSchema = z.object({
  certificateId: z
    .string()
    .trim()
    .min(4, "Enter a valid Certificate ID")
    .max(64)
    .regex(/^[A-Za-z0-9\-_]+$/, "Certificate ID may only contain letters, numbers, and hyphens"),
});

export const AdminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password is required").max(128),
});

export type StudentEnquiryInput = z.infer<typeof StudentEnquirySchema>;
export type DemoBookingInput = z.infer<typeof DemoBookingSchema>;
export type BrochureRequestInput = z.infer<typeof BrochureRequestSchema>;
export type InstitutionalEnquiryInput = z.infer<typeof InstitutionalEnquirySchema>;
export type EmployerRequestInput = z.infer<typeof EmployerRequestSchema>;
export type VerifyCertificateInput = z.infer<typeof VerifyCertificateSchema>;
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
