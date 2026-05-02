import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import NewsSection from "@/components/NewsSection";
import Testimonials from "@/components/Testimonials";
import { MessageCircle, Star, Facebook, Instagram, TrendingUp } from "lucide-react";

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

const hargaJantan = [
  { p: "2,7", s: "300", t: "60" },
  { p: "2,9", s: "350", t: "70" },
  { p: "3,1", s: "400", t: "80" },
  { p: "3,3", s: "450", t: "90" },
  { p: "3,5", s: "500", t: "100" },
];

const hargaBetina = [
  { p: "1,7", s: "250", t: "50" },
  { p: "1,8", s: "300", t: "60" },
  { p: "2,0", s: "350", t: "70" },
  { p: "2,4", s: "400", t: "80" },
  { p: "2,6", s: "450", t: "90" },
  { p: "2,8", s: "500", t: "100" },
];

export default async function Home() {
  const { posts, testimonials, gallery, ratingStats } = await getData();

  // FIX SCHEMA: Menggunakan LocalBusiness agar 5 Bintang muncul di Google
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    "name": "Farhan Aqiqah",
    "image": "https://www.jasaqiqah.my.id/images/kantor.jpg",
    "description": "Layanan jasa aqiqah Purwokerto & Banyumas terbaik. Masakan lezat, profesional, dan sesuai syariat.",
    "url": "https://www.jasaqiqah.my.id",
    "telephone": "+62895324383400",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Purwokerto",
      "addressLocality": "Banyumas",
      "addressRegion": "Jawa Tengah",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.4244,
      "longitude": 109.2303
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
      {/* Script Structured Data JSON-LD */}
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
            <Image src="/images/kantor.jpg" alt="Kantor Layanan Farhan Aqiqah" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <Features />

      {/* 3. PRICING SECTION */}
      <section id="paket" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/pattern-gold.png')] bg-repeat" style={{ backgroundSize: '400px' }}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Daftar Harga <span className="text-accent italic">Terbaik</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-12">
            <div className="relative bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden p-8 shadow-2xl">
              <h3 className="text-white font-black text-3xl mb-6 uppercase">Kambing Jantan</h3>
              <div className="space-y-3">
                {hargaJantan.map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                    <div className="w-20 border-r border-white/10 mr-5 text-accent text-3xl font-black">{item.p}</div>
                    <div className="text-white text-sm font-bold">{item.s} Sate + {item.t} Porsi Tengkleng</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden p-8 shadow-2xl">
              <h3 className="text-white font-black text-3xl mb-6 uppercase">Kambing Betina</h3>
              <div className="space-y-3">
                {hargaBetina.map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                    <div className="w-20 border-r border-white/10 mr-5 text-accent text-3xl font-black">{item.p}</div>
                    <div className="text-white text-sm font-bold">{item.s} Sate + {item.t} Porsi Tengkleng</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BANNER BONUS EKSKLUSIF */}
          <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-[#0d0d0d] to-[#1a1a1a] border border-accent/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-xl"><Star size={28} fill="currentColor" /></div>
              <div><h4 className="text-white font-black text-lg uppercase mb-1">Bonus Eksklusif</h4><p className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Seluruh Paket Aqiqah</p></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["Sertifikat", "Video Dokumentasi", "Souvenir", "Gratis Ongkir*"].map((b, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold text-white/80 uppercase tracking-widest">{b}</span>
              ))}
            </div>
          </div>

          {/* PAKET NASI BOX */}
          <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-12 border border-white/20 shadow-2xl overflow-hidden">
            <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0 md:pr-12">
              <h3 className="text-primary text-3xl font-black uppercase mb-8">PAKET NASI BOX</h3>
              <p className="text-4xl font-black text-accent tracking-tighter">Rp 13.500 <span className="text-xs text-primary/30 ml-1">/ box</span></p>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-y-5">
              {["Nasi Putih", "Kari Kentang", "Capcay", "Acar", "Kerupuk", "Sendok & Tisu"].map((m, i) => (
                <div key={i} className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div><span className="text-primary font-bold text-[12px] uppercase">{m}</span></div>
              ))}
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
                <summary className="font-bold text-primary flex justify-between items-center text-lg list-none">
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
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tighter">Siap Sempurnakan Ibadah Buah Hati?</h2>
          <div className="flex flex-col items-center gap-8">
            <a href="https://wa.me/62895324383400" className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
              <MessageCircle size={20} /> Konsultasi Lewat WhatsApp
            </a>
            <div className="flex gap-6 mt-4">
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg"><TrendingUp size={20} /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}