import React from "react";
import Image from "next/image";
import { Star, Quote, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image"; // Pastikan Anda memiliki helper urlFor

// 1. Definisikan tipe data testimonial dari Sanity
interface Testimonial {
  name: string;
  location: string;
  text: string;
  image?: any;
}

export default function Testimonials({ data }: { data: Testimonial[] }) {
  // Jika data belum tersedia di Sanity
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Star className="w-3 h-3 text-accent" fill="currentColor" />
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              Apa Kata Mereka <br /> <span className="text-accent">Tentang Kami?</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
            <div className="text-right">
              <p className="text-2xl font-black text-white leading-none">4.9/5</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-accent mt-1">Excellent Rating</p>
            </div>
            <div className="flex text-accent gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>

        {/* Grid Testimonial Dinamis dari Sanity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-[#0d0d0d]/50 border border-white/10 p-8 rounded-2xl flex flex-col md:flex-row gap-8 hover:bg-white hover:border-white transition-all duration-500 shadow-xl"
            >
              {/* Foto Profil dengan Penanganan Sanity Image */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-accent/20 group-hover:border-accent bg-gray-800">
                  {item.image ? (
                    <Image 
                      src={urlFor(item.image).width(200).height(200).url()} 
                      alt={`Testimoni ${item.name}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                       <span className="text-accent font-black text-2xl">{item.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent p-2 rounded-xl shadow-lg">
                  <Quote size={12} className="text-primary" fill="currentColor" />
                </div>
              </div>
              
              {/* Konten Teks */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex text-accent mb-4 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-white/70 group-hover:text-primary/80 italic text-sm md:text-base leading-relaxed font-medium mb-6">
                    "{item.text}"
                  </p>
                </div>
                
                <div>
                  <h4 className="font-black text-accent group-hover:text-primary transition-colors text-lg tracking-tight leading-none mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/30 group-hover:text-primary/40">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-accent hover:text-primary hover:border-accent px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-500 group shadow-xl">
            Testimoni Selengkapnya
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}