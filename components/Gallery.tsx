"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Camera, 
  Package, 
  ShieldCheck, 
  X, 
  ZoomIn, 
  Truck // Import ikon Truck untuk kategori Delivery
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Definisi tipe data dari Sanity
interface GalleryItem {
  title: string;
  url: string;
  alt?: string;
  category: string;
  description?: string;
}

// 2. Tambahkan "Delivery" ke dalam daftar kategori
const categories = ["Semua", "Masakan", "Sembelih", "Packaging", "Delivery"];

// 3. Helper untuk memetakan ikon (Tambah case Delivery)
const getIcon = (category: string) => {
  switch (category) {
    case "Masakan": return <Utensils size={14} />;
    case "Sembelih": return <ShieldCheck size={14} />;
    case "Packaging": return <Package size={14} />;
    case "Delivery": return <Truck size={14} />; // Ikon Truck untuk Delivery
    default: return <Camera size={14} />;
  }
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Semua");
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  // Mencegah scroll pada body saat modal lightbox terbuka
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImg]);

  // Filter data berdasarkan kategori yang dipilih
  const filteredData = !items 
    ? [] 
    : filter === "Semua" 
      ? items 
      : items.filter((item) => item.category === filter);

  return (
    <section id="galeri" className="py-24 bg-primary relative overflow-hidden">
      {/* Pattern Gold Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-repeat"
        style={{ backgroundImage: "url('/images/pattern-gold.png')", backgroundSize: '400px' }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Portofolio Farhan Aqiqah
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-10"
          >
            Dokumentasi <span className="text-accent">Amanah</span> & Profesional
          </motion.h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                  filter === cat 
                    ? "bg-accent border-accent text-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                    : "bg-white/5 border-white/10 text-white hover:border-accent/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Gambar Dinamis */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, idx) => (
              <motion.div
                key={item.url + idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImg(item)}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in shadow-xl bg-gray-900"
              >
                {item.url && (
                  <Image
                    src={item.url}
                    alt={item.alt || item.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    {getIcon(item.category)}
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-none mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/50 text-[11px] line-clamp-1 font-medium">{item.description}</p>
                  )}
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <ZoomIn size={20} strokeWidth={2.5} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-primary/95 backdrop-blur-xl"
              onClick={() => setSelectedImg(null)}
            >
              <button className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors z-[110]" onClick={() => setSelectedImg(null)}>
                <X size={40} />
              </button>

              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={selectedImg.url} alt={selectedImg.title} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent">
                   <div className="flex items-center gap-2 text-accent mb-2">
                     {getIcon(selectedImg.category)}
                     <span className="text-accent font-black uppercase tracking-[0.2em] text-[10px]">{selectedImg.category}</span>
                   </div>
                   <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-3">{selectedImg.title}</h2>
                   {selectedImg.description && (
                     <p className="text-white/70 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
                       {selectedImg.description}
                     </p>
                   )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}