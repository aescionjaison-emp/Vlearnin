"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getAdminSession();
    router.replace(session ? "/admin/dashboard" : "/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="bg-white border border-[#E5E7EB] rounded-[15px] px-8 py-6 text-center shadow-sm">
        <p className="font-nav text-sm font-semibold text-[#1E3A8A]">
          Redirecting to VLEARNIN Admin Portal...
        </p>
      </div>
    </div>
  );
}
