"use client";

import React, { useState } from "react";
import { Pencil, Image as ImageIcon } from "lucide-react";
import { useSiteContent } from "./SiteContentProvider";

export function EditableText({
  path,
  value,
  as: Tag = "span",
  className = "",
  numeric = false,
}: {
  path: string;
  value: string | number;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  numeric?: boolean;
}) {
  const { isEditMode, setByPath } = useSiteContent();

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      title={`Click to edit (${path})`}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const raw = e.currentTarget.textContent ?? "";
        if (numeric) {
          const parsed = Number(raw.replace(/[^0-9.-]/g, ""));
          if (!Number.isNaN(parsed)) setByPath(path, parsed);
        } else {
          setByPath(path, raw);
        }
      }}
      className={`${className} outline-dashed outline-1 outline-transparent hover:outline-[#EA580C] focus:outline-[#1D4ED8] focus:outline-2 focus:bg-white/95 focus:text-[#111827] rounded-[6px] px-0.5 transition-all cursor-text`}
    >
      {value}
    </Tag>
  );
}

export function EditableImageTrigger({
  path,
  currentSrc,
  altPath,
  currentAlt,
}: {
  path: string;
  currentSrc: string;
  altPath?: string;
  currentAlt?: string;
}) {
  const { isEditMode, setByPath } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [srcVal, setSrcVal] = useState(currentSrc);
  const [altVal, setAltVal] = useState(currentAlt || "");

  if (!isEditMode) return null;

  return (
    <div
      className="absolute top-3 right-3 z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => {
          setSrcVal(currentSrc);
          setAltVal(currentAlt || "");
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-1.5 bg-[#1E3A8A]/95 hover:bg-[#EA580C] text-white text-[11px] font-nav font-bold px-2.5 py-1.5 rounded-[10px] shadow-md cursor-pointer transition-colors"
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>Edit Image</span>
      </button>

      {open && (
        <div className="mt-2 w-72 bg-white text-[#111827] border border-[#E5E7EB] shadow-xl p-3 rounded-[15px] space-y-2">
          <label className="block text-[11px] font-nav font-bold text-[#1E3A8A]">
            Image URL / Path
          </label>
          <input
            type="text"
            value={srcVal}
            onChange={(e) => setSrcVal(e.target.value)}
            className="w-full border border-[#E5E7EB] px-2.5 py-1.5 text-xs rounded-[10px]"
          />
          {altPath && (
            <>
              <label className="block text-[11px] font-nav font-bold text-[#1E3A8A]">
                Alt Text
              </label>
              <input
                type="text"
                value={altVal}
                onChange={(e) => setAltVal(e.target.value)}
                className="w-full border border-[#E5E7EB] px-2.5 py-1.5 text-xs rounded-[10px]"
              />
            </>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs px-2.5 py-1 border border-[#E5E7EB] rounded-[8px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setByPath(path, srcVal.trim() || currentSrc);
                if (altPath) setByPath(altPath, altVal);
                setOpen(false);
              }}
              className="text-xs px-3 py-1 bg-[#1D4ED8] text-white rounded-[8px] font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              <Pencil className="w-3 h-3" />
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
