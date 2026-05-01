import React from "react";
import Image from "next/image";
import { ShieldCheck, Utensils, HeartHandshake, Scissors } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} className="text-white" />,
    title: "Amanah & Syariat",
    description: "Pelayanan kami senantiasa berpedoman pada tuntunan syariat Islam yang ketat mulai dari pemilihan hingga penyembelihan kambing.",
  },
  {
    icon: <Utensils size={28} className="text-white" />,
    title: "Masakan Lezat & Higienis",
    description: "Diolah oleh tenaga profesional, menjadikan hidangan aqiqah Anda tidak prengus (bau), lezat, dan disajikan dengan standar kebersihan tinggi.",
  },
  {
    icon: <HeartHandshake size={28} className="text-white" />,
    title: "Praktis & Bebas Ribet",
    description: "Ayah & Bunda cukup di rumah, serahkan semua urusan aqiqah dari A sampai Z kepada tim ahli kami.",
  },
  {
    icon: <Scissors size={28} className="text-white" />,
    title: "Gratis Cukur Rambut",
    description: "Layanan tambahan gratis potong/cukur rambut bayi untuk melengkapi kesempurnaan ibadah aqiqah buah hati Anda.",
  }
];

export default function Features() {
  return (
    // padding-top dikurangi (pt-12) agar menempel dengan foto kantor di atasnya
    <section className="pt-12 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <ShieldCheck size={14} className="text-accent" />
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Our Values</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter">
            Mengapa Memilih <span className="text-accent">Farhan Aqiqah?</span>
          </h2>
          <p className="mt-4 text-gray-500 font-medium max-w-2xl mx-auto">
            Kami dedikasikan seluruh pengalaman kami untuk membantu Ayah & Bunda menyempurnakan ibadah aqiqah dengan layanan terbaik di Purwokerto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Kolom Kiri: Gambar Ilustrasi */}
          <div className="relative group h-full min-h-[400px]">
            <div className="absolute inset-0 bg-accent/20 rounded-[2.5rem] transform -rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
               <Image 
                  src="/images/order.png" // Pastikan gambar ini ada, atau ganti dengan /images/kantor.jpg
                  alt="Nilai Lebih Farhan Aqiqah" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-black text-2xl tracking-tighter mb-2">100% Sesuai Syariat</p>
                  <p className="text-sm font-medium text-white/80">Kepercayaan Anda adalah amanah terbesar kami.</p>
               </div>
            </div>
          </div>

          {/* Kolom Kanan: Daftar Fitur (Ikon Diperbaiki) */}
          <div className="space-y-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-6 group">
                {/* Ikon kembali tajam dengan background dinamis */}
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
                   {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-primary mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}