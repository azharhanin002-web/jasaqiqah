"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import CardPaket from "./CardPaket";

const paketData = [
  {
    title: "Paket Kambing Jantan Termurah",
    price: "2.700.000",
    features: [
      "Harga Normal: Rp. 2.800.000",
      "300 tusuk sate + 60 porsi gulai",
      "atau 60 porsi bistik + 60 porsi gulai",
      "Kambing Jantan Lebih Afdhal",
      "Sertifikat & Dokumentasi Sembelih"
    ],
    isFeatured: true, // Dibuat menonjol sebagai pilihan utama
  },
  {
    title: "Paket Kambing Betina Termurah",
    price: "1.700.000",
    features: [
      "Harga Normal: Rp. 1.800.000",
      "250 tusuk sate + 50 porsi gulai",
      "atau 50 porsi bistik + 50 porsi gulai",
      "Pilihan Ekonomis & Berkah",
      "Sertifikat Aqiqah"
    ],
    isFeatured: false,
  },
  {
    title: "Paket nasi BOX",
    price: "15.000/box",
    features: [
      "Harga Normal: Rp. 16.000/box",
      "Isi: Nasi, Kari kentang, capcay, acar",
      "kerupuk, sendok & tisu, pisang",
      "Praktis & Higienis",
      "Siap Dibagikan"
    ],
    isFeatured: false,
  }
];

export default function KatalogPaket() {
  return (
    <section id="paket" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Daftar Harga
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-6"
          >
            Pilihan Paket Aqiqah <br className="hidden md:block" /> Hemat & Syar'i
          </motion.h2>
          <p className="text-gray-500 leading-relaxed font-medium">
            Semua paket dikelola secara profesional sesuai syariat, menggunakan bumbu rempah pilihan tanpa bau prengus untuk kesempurnaan ibadah Anda.
          </p>
        </div>

        {/* Grid 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {paketData.map((paket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <CardPaket {...paket} />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer Harga */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-2 text-gray-400"
        >
          <Info size={16} className="text-accent" />
          <p className="text-xs font-bold uppercase tracking-widest italic">
            Harga dapat berubah sewaktu-waktu
          </p>
        </motion.div>

      </div>
    </section>
  );
}