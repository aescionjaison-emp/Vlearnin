"use client";

import React, { useRef, useState } from "react";
import { FolderOpen, UploadCloud } from "lucide-react";

/**
 * Compresses an uploaded image file via HTMLCanvasElement so it can be stored
 * cleanly in SiteContent (localStorage + Firestore) without exceeding size limits.
 */
function compressImageFile(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Invalid image file"));
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function readVideoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read video file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

function isVideoSrc(src: string): boolean {
  if (!src) return false;
  return (
    src.startsWith("data:video/") ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src)
  );
}

export function ImageDropzoneInput({
  value,
  onChange,
  compact = false,
  allowVideo = true,
  label,
}: {
  value: string;
  onChange: (nextSrc: string) => void;
  compact?: boolean;
  allowVideo?: boolean;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    const isImg = file.type.startsWith("image/");
    const isVid = allowVideo && file.type.startsWith("video/");
    if (!isImg && !isVid) return;

    setProcessing(true);
    try {
      if (isImg) {
        const compressed = await compressImageFile(file);
        onChange(compressed);
      } else if (isVid) {
        const dataUrl = await readVideoFile(file);
        onChange(dataUrl);
      }
    } finally {
      setProcessing(false);
    }
  };

  const accept = allowVideo ? "image/*,video/*" : "image/*";
  const showVideoPreview = isVideoSrc(value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-nav font-semibold uppercase tracking-wider text-[#1D4ED8]">
          {label}
        </label>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-[15px] transition-colors cursor-pointer flex flex-col items-center justify-center text-center ${
          compact ? "p-3 gap-1.5" : "p-4 gap-2"
        } ${
          dragging
            ? "border-[#EA580C] bg-[#FFF7ED]"
            : "border-[#BFDBFE] bg-[#F8FAFC] hover:border-[#1D4ED8] hover:bg-[#EFF6FF]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            handleFile(file);
            e.target.value = "";
          }}
          className="hidden"
        />

        {value &&
          (showVideoPreview ? (
            <video
              src={value}
              controls
              muted
              className={`${compact ? "h-20" : "h-24"} w-full object-cover rounded-[10px] border border-[#E5E7EB] bg-black`}
            />
          ) : (
            <img
              src={value}
              alt="Preview"
              className={`${compact ? "h-16" : "h-20"} w-full object-cover rounded-[10px] border border-[#E5E7EB]`}
            />
          ))}

        <div className="flex items-center gap-1.5 text-xs font-nav font-semibold text-[#1D4ED8]">
          <UploadCloud className="w-4 h-4 text-[#EA580C]" />
          <span>
            {processing
              ? "Processing media..."
              : dragging
                ? allowVideo
                  ? "Drop image or video here"
                  : "Drop image here"
                : allowVideo
                  ? "Drag & drop image or video here"
                  : "Drag & drop image here"}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          className="inline-flex items-center gap-1.5 bg-[#1D4ED8] hover:bg-[#1D4ED8] text-white font-nav text-[11px] font-semibold px-3 py-1 rounded-[10px] cursor-pointer"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Select from Folder</span>
        </button>
      </div>

      <input
        type="text"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          value.startsWith("data:")
            ? "Uploaded file active (or paste URL to replace)"
            : allowVideo
              ? "/images/hero-1.jpg or video URL (.mp4 / https://...)"
              : "/images/hero-1.jpg or https://..."
        }
        className="w-full border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-xs rounded-[12px]"
      />
    </div>
  );
}
