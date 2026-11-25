"use client";

import React from "react";
import { Download, Calendar } from "lucide-react";
import { useLeadModal } from "@/components/LeadModalProvider";

export function ComboActionsClient({
  comboTitle,
  comboDuration,
  comboSlug,
}: {
  comboTitle: string;
  comboDuration: string;
  comboSlug?: string;
}) {
  const { openDemoModal, openBrochureModal } = useLeadModal();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() =>
          openDemoModal({
            preselectedProgramme: `${comboTitle} (${comboDuration})`,
            sourcePage: comboSlug ? `/career-combos/${comboSlug}` : "/career-combos",
          })
        }
        className="btn-gold px-6 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Book Free Demo Class
      </button>
      <button
        type="button"
        onClick={() =>
          openBrochureModal({
            preselectedProgramme: comboTitle,
            brochureType: "combo",
            brochureSlug: comboSlug,
          })
        }
        className="btn-navy px-6 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download Combo Brochure
      </button>
    </div>
  );
}
