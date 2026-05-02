import React from "react";
import Link from "next/link";
// OPTIMASI TBT: Menggunakan impor spesifik untuk ikon guna meminimalkan ukuran bundle JavaScript.
import MessageCircle from "lucide-react/dist/esm/icons/message-circle"; 

export default function BlogCTA() {
  return (
    <div className="mt-16 mb-10 p-8 md:p-10 bg-[#fff9f0] border border-[#fef3c7] rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden">
      <div className="text-center md:text-left flex-1 min-w-0">
        {/* JUDUL: Dipertahankan satu baris dengan estetika bersih sesuai preferensi Abah Saif */}
        <h4 className="whitespace-nowrap text-xl md:text-[28px] font-black text-[#1a1a1a] mb-3 tracking-tight">
          Konsultasi Aqiqah <span className="text-[#d9a13c] italic">Gratis!</span>
        </h4>
        
        {/* DESKRIPSI: Font-size dioptimalkan agar layout tetap stabil */}
        <p className="text-[14px] md:text-[15px] text-[#4b5563] font-medium leading-relaxed max-w-full md:max-w-[450px]">
          Punya pertanyaan seputar layanan Farhan Aqiqah? Jangan ragu untuk menghubungi tim ahli kami melalui WhatsApp sekarang juga.
        </p>
      </div>

      {/* TOMBOL: Desain compact untuk mendukung skema warna branding produk */}
      <div className="shrink-0">
        <Link 
          href="https://wa.me/62895324383400" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1a1a1a] text-white px-7 py-3.5 rounded-xl font-black uppercase text-[11px] tracking-[0.15em] hover:bg-black transition-all shadow-lg hover:-translate-y-1 flex items-center gap-3"
        >
          <MessageCircle size={18} strokeWidth={2.5} className="shrink-0" /> 
          HUBUNGI ADMIN
        </Link>
      </div>
    </div>
  );
}