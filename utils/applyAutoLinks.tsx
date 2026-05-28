// utils/applyAutoLinks.tsx
import React from "react";
import Link from "next/link";
import { AUTO_LINK_MAP } from "@/config/autoLinks";

/**
 * Mengubah kata kunci tertentu di dalam teks menjadi Link Next.js secara otomatis.
 * Tipe kembalian diset ke React.ReactNode agar mendukung manipulasi array string & JSX Element.
 */
export function applyAutoLinks(text: string): React.ReactNode {
  if (!text) return text;

  // 1. Urutkan kata kunci dari yang paling panjang agar tidak terjadi tumpang tindih
  const sortedMap = [...AUTO_LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);

  // 2. Escape karakter khusus regex dan gabungkan semua keyword dengan separator "|"
  const keywords = sortedMap
    .map((item) => item.keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join("|");
    
  if (!keywords) return text;

  // 3. Gunakan regex dengan flag "i" (case-insensitive) dan "g" (global)
  const regex = new RegExp(`\\b(${keywords})\\b`, "gi");
  const parts = text.split(regex);

  // Jika tidak ada kecocokan kata kunci sama sekali, kembalikan teks asli (string)
  if (parts.length === 1) return text;

  // 4. Petakan potongan teks menjadi elemen React / Next.js Link
  return parts.map((part, index) => {
    // Cari apakah potongan teks ini cocok dengan salah satu keyword di config
    const match = sortedMap.find(
      (item) => item.keyword.toLowerCase() === part.toLowerCase()
    );

    if (match) {
      return (
        <Link
          key={`${match.keyword}-${index}`}
          href={match.url}
          className="text-amber-600 hover:underline font-bold"
        >
          {part}
        </Link>
      );
    }

    // Jika bukan keyword, kembalikan teks biasa
    return part;
  });
}