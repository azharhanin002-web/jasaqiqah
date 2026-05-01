"use client";

import React from 'react';
import { Check } from "lucide-react";

interface CardPaketProps {
  title: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
}

export default function CardPaket({ title, price, features, isFeatured }: CardPaketProps) {
  // Link WhatsApp dengan nomor resmi Farhan Aqiqah dan pesan otomatis
  const waLink = `https://wa.me/62895324383400?text=Halo%20Farhan%20Aqiqah,%20saya%20tertarik%20dengan%20${title}.%20Bisa%20jelaskan%20detailnya?`;

  return (
    <div 
      className={`group relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 ease-out border ${
        isFeatured 
          ? 'bg-primary border-accent shadow-[0_20px_50px_rgba(212,175,55,0.15)] scale-[1.02] z-10' 
          : 'bg-white border-gray-100 shadow-sm hover:shadow-2xl hover:border-accent/30'
      }`}
    >
      {/* Badge untuk Paket Terpopuler */}
      {isFeatured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-dark text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
          Paling Direkomendasikan
        </div>
      )}

      {/* Header Paket */}
      <div className="mb-8">
        <h3 className={`text-[10px] uppercase tracking-[0.4em] font-black mb-3 ${
          isFeatured ? 'text-accent' : 'text-gray-400'
        }`}>
          {title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-bold ${isFeatured ? 'text-accent/80' : 'text-gray-400'}`}>Rp</span>
          <span className={`text-4xl font-black tracking-tighter ${
            isFeatured ? 'text-white' : 'text-primary'
          }`}>
            {price}
          </span>
        </div>
      </div>

      {/* Daftar Fitur - Dengan Fix Ikon Raksasa */}
      <ul className="flex-grow space-y-4 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group/item">
            <div className={`mt-0.5 rounded-full transition-colors flex-shrink-0 ${
              isFeatured ? 'text-accent' : 'text-gray-300 group-hover/item:text-accent'
            }`}>
              {/* Ukuran ikon dikunci w-5 h-5 agar tidak meledak di layout */}
              <Check className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
            </div>
            <span className={`text-sm leading-relaxed font-medium ${
              isFeatured ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Tombol CTA Modern */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative overflow-hidden w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-300 text-center shadow-lg ${
          isFeatured 
            ? 'bg-accent text-primary hover:bg-white hover:scale-[1.03]' 
            : 'bg-primary text-white hover:bg-accent hover:text-primary'
        } active:scale-95`}
      >
        <span className="relative z-10">Pilih Paket Ini</span>
      </a>

      {/* Glow Effect untuk Kartu Featured */}
      {isFeatured && (
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
      )}
    </div>
  );
}