import React from "react";
import type { Metadata } from "next";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Administrator Dashboard | VLEARNIN",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
