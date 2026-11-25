import React from "react";
import type { Metadata } from "next";
import { VerifyCertificateClient } from "@/components/verify/VerifyCertificateClient";

export const metadata: Metadata = {
  title: "Certificate Verification Result",
  robots: { index: false, follow: false },
};

export default async function VerifyCertificateTokenPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  return <VerifyCertificateClient initialTokenOrId={certificateId} />;
}
