import React from "react";
import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Campus Visit | Rajajinagar, Bengaluru",
  description:
    "Visit VLEARNIN Academy at 6th Block, Rajajinagar, Bengaluru. Book a free demo class, request fee details, or chat with us on WhatsApp at +91 70223 37580.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
