import React from "react";
import type { Metadata } from "next";
import { VerifyCertificateClient } from "@/components/verify/VerifyCertificateClient";

export const metadata: Metadata = {
  title: "Verify Certificate | Credential Authentication",
  description:
    "Verify the authenticity of VLEARNIN Academy certificates using a unique Certificate ID or QR verification link.",
};

export default function VerifyCertificatePage() {
  return <VerifyCertificateClient />;
}
