import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { BRAND } from "@vlearnin/shared";
import { LeadModalProvider } from "@/components/LeadModalProvider";
import { GlobalHeader } from "@/components/GlobalHeader";
import { GlobalFooter } from "@/components/GlobalFooter";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-ibm-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vlearnin.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VLEARNIN Academy | Practical Certification Training in Bengaluru",
    template: "%s | VLEARNIN Academy",
  },
  description:
    "The V-Way to Learn, Build & Lead. Intensive 30-hour certification programmes in AI & Business Intelligence, Power BI, Financial Modelling, Investment Banking, Digital Marketing, and Video Editing in Rajajinagar, Bengaluru.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "VLEARNIN Academy",
    title: "VLEARNIN Academy | Practical Certification Training in Bengaluru",
    description:
      "Industry-aligned 30-hour certification programmes, dual-skill career combos, academic partnerships, and dedicated placement assistance in Bengaluru.",
    images: [{ url: "/images/hero-1.jpg", width: 1200, height: 630, alt: "VLEARNIN Academy Bengaluru" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: BRAND.legalName,
    url: siteUrl,
    telephone: BRAND.phoneDisplay,
    email: BRAND.email,
    slogan: BRAND.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6th Block, Rajajinagar (Next to Sangeetha Mobiles)",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560010",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#111827]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScrollProvider>
          <FirebaseAnalytics />
          <SiteContentProvider>
            <LeadModalProvider>
              <GlobalHeader />
              <main className="flex-1">{children}</main>
              <GlobalFooter />
            </LeadModalProvider>
          </SiteContentProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
