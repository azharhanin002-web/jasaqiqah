import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import NewsSection from "@/components/NewsSection";
import Testimonials from "@/components/Testimonials";
import { MessageCircle, Star, Facebook, Instagram, TrendingUp, CheckCircle2 } from "lucide-react";

// --- INTEGRASI SANITY ---
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// --- SEO & METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasaqiqah.my.id"),
  title: "Farhan Aqiqah - Jasa Aqiqah Purwokerto & Banyumas Nomor Satu",
  description: "Layanan jasa aqiqah Purwokerto & Banyumas terbaik. Masakan lezat, profesional, praktis, dan sesuai syariat. Pilihan tepat untuk akikah buah hati Anda.",
  keywords: ["aqiqah purwokerto", "aqiqah banyumas", "jasa aqiqah terpercaya", "farhan aqiqah"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Farhan Aqiqah - Layanan Jasa Aqiqah Purwokerto Nomor Satu",
    description: "Profesional, Praktis, dan Sesuai Syariat. Layanan aqiqah terpercaya untuk wilayah Banyumas dan sekitarnya.",
    url: "https://www.jasaqiqah.my.id",
    siteName: "Farhan Aqiqah",
    images: [{ url: "/images/og-image-large.png", width: 1200, height: 630, alt: "Farhan Aqiqah Purwokerto" }],
    locale: "id_ID",
    type: "website",
  },
};

// --- QUERY DATA DINAMIS DARI SANITY ---
const getData = async () => {
  const query = groq`{
    "ratingStats": {
      "totalReviews": count(*[_type == "testimony"]),
      "avgRating": "4.9" 
    },
    "posts": *[_type == "post"] | order(publishedAt desc)[0..3] {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      views,
      youtubeUrl,
      "mainImage": mainImage {
        "url": asset->url,
        alt
      }
    },
    "testimonials": *[_type == "testimony"] | order(_createdAt desc) {
      name,
      "location": role,
      "text": message,
      "image": avatar
    },
    "gallery": *[_type == "gallery"] | order(_createdAt desc) {
      title,
      category,
      "description": caption, 
      "url": image.asset->url,
      "alt": image.alt
    }
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } }); 
};

// DATA HARGA DISESUAIKAN DENGAN BROSUR (Sate vs Bistik)
const hargaJantan = [
  { p: "2,7", sate: "300", bistik: "60", tengkleng: "60" },
  { p: "2,9", sate: "350", bistik: "70", tengkleng: "70" },
  { p: "3,1", sate: "400", bistik: "80", tengkleng: "80" },
  { p: "3,3", sate: "450", bistik: "90", tengkleng: "90" },
  { p: "3,5", sate: "500", bistik: "100", tengkleng: "100" },
];

const hargaBetina = [
  { p: "1,7", sate: "250", bistik: "50", tengkleng: "50" },
  { p: "1,8", sate: "300", bistik: "60", tengkleng: "60" },
  { p: "2,0", sate: "350", bistik: "70", tengkleng: "70" },
  { p: "2,4", sate: "400", bistik: "80", tengkleng: "80" },
  { p: "2,6", sate: "450", bistik: "90", tengkleng: "90" },
  { p: "2,8", sate: "500", bistik: "100", tengkleng: "100" },
];

export default async function Home() {
  const { posts, testimonials, gallery, ratingStats } = await getData();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    "name": "Farhan Aqiqah",
    "image": "https://www.jasaqiqah.my.id/images/kantor.jpg",
    "description": "Layanan jasa aqiqah Purwokerto & Banyumas terbaik.",
    "url": "https://www.jasaqiqah.my.id",
    "telephone": "+62895324383400",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Lesanpura No. 17 RT 01/01 Karangklesem",
      "addressLocality": "Purwokerto Selatan",
      "addressRegion": "Jawa Tengah",
      "addressCountry": "ID"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingStats.avgRating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": ratingStats.totalReviews.toString()
    }
  };

  return (
    <main className="w-full overflow-hidden">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* 1. SECTION VALUE PROP */}
      <section className="pt-24 pb-8 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
            <Star className="w-4 h-4 flex-shrink-0" fill="currentColor" /> Jasa Aqiqah Terpercaya
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-8 tracking-tighter leading-tight">
            Layanan Jasa Aqiqah Purwokerto <br className="hidden md:block" /> & Banyumas Nomor Satu
          </h2>
          <div className="group relative aspect-video max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
            <Image 
              src="/images/kantor.jpg" 
              alt="Kantor Layanan Farhan Aqiqah" 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      <Features />

 {/* 3. PRICING SECTION (DEEP GOLDEN TWILIGHT - COMPACT) */}
<section id="paket" className="py-24 bg-gradient-to-b from-[#0f0e0a] via-[#261a02] to-[#0f0e0a] relative overflow-hidden">
  
  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-3 uppercase">
        Daftar Harga <span className="text-accent italic">Farhan Aqiqah</span>
      </h2>
      <p className="text-accent/40 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs border-y border-accent/20 inline-block py-2">
        Kualitas Premium di Setiap Hidangan
      </p>
    </div>

    {/* Container Grid Diperkecil agar kartu tidak terlalu lebar */}
    <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
      
      {/* --- KOLOM KIRI: JANTAN + BONUS --- */}
      <div className="space-y-6">
        {/* KARTU JANTAN (DARK GLASS) */}
        <div className="group relative bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.4)] hover:-translate-y-1">
          <div className="bg-gradient-to-r from-red-950/90 to-red-900/90 p-5 text-center border-b border-white/10">
            <h3 className="text-white font-black text-xl uppercase tracking-[0.2em]">Kambing Jantan</h3>
          </div>
          
          <div className="p-4 md:p-8 space-y-4">
            {hargaJantan.map((item, idx) => (
              <div key={idx} className="flex items-stretch bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group/item hover:border-red-500/20 hover:bg-white/[0.05]">
                <div className="bg-red-950/30 flex flex-col justify-center items-center px-5 py-4 border-r border-white/5 min-w-[100px]">
                  <span className="text-accent text-3xl font-black tracking-tighter">{item.p}</span>
                  <span className="text-accent/60 text-[10px] font-black uppercase tracking-widest mt-1">Juta</span>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2 text-white/80 text-[12px] font-bold">
                    <CheckCircle2 size={15} className="text-red-500 shrink-0" />
                    <span>{item.sate} Sate + {item.tengkleng} Tengkleng</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                    <span className="text-[8px] font-black text-red-500/30 tracking-[0.2em]">ATAU</span>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-[12px] font-bold">
                    <CheckCircle2 size={15} className="text-red-500 shrink-0" />
                    <span>{item.bistik} Bistik + {item.tengkleng} Tengkleng</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BONUS KECIL (KOMPAK DI BAWAH JANTAN) */}
        <div className="bg-black/40 backdrop-blur-md border border-accent/20 rounded-3xl p-4 flex items-center gap-4 transition-all hover:border-accent/40 shadow-lg">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-[#0f0e0a] shrink-0">
            <Star size={20} fill="currentColor" strokeWidth={0} />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-xs uppercase tracking-wider">Bonus Eksklusif</h4>
            <div className="flex flex-wrap gap-x-3 mt-0.5">
              {["Sertifikat", "Dokumentasi", "Souvenir"].map((b, i) => (
                <span key={i} className="text-[9px] font-bold text-accent uppercase opacity-70">#{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- KOLOM KANAN: BETINA --- */}
      <div className="group relative bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-1">
        <div className="bg-gradient-to-r from-emerald-950/90 to-emerald-900/90 p-5 text-center border-b border-white/10">
          <h3 className="text-white font-black text-xl uppercase tracking-[0.2em]">Kambing Betina</h3>
        </div>
        
        <div className="p-4 md:p-8 space-y-4">
          {hargaBetina.map((item, idx) => (
            <div key={idx} className="flex items-stretch bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group/item hover:border-emerald-500/20 hover:bg-white/[0.05]">
              <div className="bg-emerald-950/30 flex flex-col justify-center items-center px-5 py-4 border-r border-white/5 min-w-[100px]">
                <span className="text-accent text-3xl font-black tracking-tighter">{item.p}</span>
                <span className="text-accent/60 text-[10px] font-black uppercase tracking-widest mt-1">Juta</span>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 text-white/80 text-[12px] font-bold">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>{item.sate} Sate + {item.tengkleng} Tengkleng</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                  <span className="text-[8px] font-black text-emerald-500/30 tracking-[0.2em]">ATAU</span>
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-[12px] font-bold">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>{item.bistik} Bistik + {item.tengkleng} Tengkleng</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* PAKET NASI BOX (DARK GLASS) */}
    <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="w-full md:w-1/3 text-center md:text-left">
        {/* Label Harga ditambahkan di atas judul */}
        <p className="text-accent font-black text-[10px] uppercase tracking-[0.5em] mb-1">Harga</p>
        <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-3">PAKET NASI BOX</h3>
        <p className="text-accent font-black text-[9px] uppercase tracking-[0.3em] opacity-70">Menu Lengkap & Berkah</p>
      </div>
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Nasi", "Kari Kentang", "Capcay", "Acar", "Kerupuk", "Alat Makan"].map((m, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/[0.05] border border-white/5 p-2.5 rounded-xl">
              <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_rgba(217,161,60,0.6)]"></div>
              <span className="text-white font-bold text-[9px] uppercase tracking-tighter">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          <div className="flex-1 bg-black border border-accent/30 text-white p-4 rounded-2xl text-center transition-all hover:border-accent">
            <span className="block text-[8px] uppercase font-black text-accent/50 mb-1 tracking-widest">Buah Semangka</span>
            <span className="text-xl font-black text-white tracking-tighter">Rp 13.500</span>
          </div>
          <div className="flex-1 bg-black border border-accent/30 text-white p-4 rounded-2xl text-center transition-all hover:border-accent">
            <span className="block text-[8px] uppercase font-black text-accent/50 mb-1 tracking-widest">Buah Pisang</span>
            <span className="text-xl font-black text-white tracking-tighter">Rp 15.000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <Gallery items={gallery} />
      <NewsSection posts={posts} />
      <Testimonials data={testimonials} />

      {/* FAQ SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter text-primary">FAQ Farhan Aqiqah</h2>
          <div className="space-y-4 text-left">
            {[
              { q: "Apakah jasa aqiqah di Farhan Aqiqah sudah sesuai syariat?", a: "Kami memprioritaskan keabsahan aqiqah sebagai ibadah. Dari pemilihan kambing cukup umur hingga penyembelihan sesuai kaidah fikih." },
              { q: "Bagaimana cara pesan aqiqah di Farhan Aqiqah?", a: "Sangat mudah! Cukup konsultasi melalui WhatsApp, pilih paket yang diinginkan, dan tim kami akan mengelola semuanya." },
              { q: "Apakah melayani pengiriman area di luar kota?", a: "Kami melayani seluruh area Kabupaten Banyumas dan sekitarnya (seperti Cilacap, Purbalingga) untuk menjaga kualitas masakan." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group cursor-pointer overflow-hidden transition-all">
                <summary className="font-bold text-primary flex justify-between items-center text-lg list-none cursor-pointer">
                  {faq.q} <span className="text-accent transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <div className="overflow-hidden group-open:animate-in fade-in slide-in-from-top-2 duration-500">
                  <p className="mt-4 text-gray-500 text-sm font-medium leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tighter uppercase">Siap Sempurnakan Ibadah Buah Hati?</h2>
          <div className="flex flex-col items-center gap-8">
            <Link href="https://wa.me/62895324383400" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
              <MessageCircle size={20} /> Konsultasi Lewat WhatsApp
            </Link>
            <div className="flex gap-6 mt-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><Facebook size={20} /></Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><Instagram size={20} /></Link>
              <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><TrendingUp size={20} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}