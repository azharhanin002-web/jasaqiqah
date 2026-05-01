import Image from "next/image";
import { MessageCircle, ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-24 pb-12">
      
      {/* 1. Background Image Utama */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pattern-gold.png"
          alt="Farhan Aqiqah Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradasi Transparan - Memberikan kegelapan di sisi kiri/bawah agar teks kontras */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
      </div>

      {/* 2. Background Pattern - Transparansi sangat rendah */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]" 
        style={{ 
          backgroundImage: "url('/images/pattern-gold.png')", 
          backgroundSize: '500px', 
          backgroundRepeat: 'repeat'
        }}
      />

      {/* 3. Dekorasi Teks Besar di Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-[1]">
        <h2 className="text-[20vw] font-black text-white leading-none tracking-tighter">
          PREMIUM
        </h2>
      </div>

      {/* Kontainer Utama */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* SISI KIRI: KONTEN TEKS */}
          <div className="lg:col-span-7 text-left space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Jasa Aqiqah Nomor Satu Purwokerto
            </div>
            
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-sm">
              Sempurnakan <span className="text-accent italic">Ibadah</span>,<br />
              Hadirkan Berkah.
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium drop-shadow-md">
              Layanan <strong>aqiqah Purwokerto</strong> & <strong>Banyumas</strong> profesional. 
              Masakan lezat, proses sesuai syariat, dan pengantaran praktis sampai depan rumah.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href="#paket" 
                className="inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white transition-all shadow-2xl shadow-accent/20 active:scale-95"
              >
                Pilih Paket <ArrowRight size={20} />
              </a>
              <a 
                href="https://wa.me/6281229787700" 
                className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all backdrop-blur-md active:scale-95"
              >
                <MessageCircle size={20} /> Konsultasi
              </a>
            </div>
          </div>

          {/* SISI KANAN: VISUAL UTAMA */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
              
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl z-10">
                <Image
                  src="/images/senyum.png"
                  alt="Dokumentasi Farhan Aqiqah"
                  fill
                  className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                  priority
                />
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:-left-12 lg:translate-x-0 bg-white p-5 rounded-[2rem] shadow-2xl z-20 min-w-[220px] hidden sm:block border border-gray-100">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">Rating Pelanggan</p>
                      <p className="text-xl font-black text-primary leading-none">4.9/5.0</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}