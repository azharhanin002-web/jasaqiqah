import { Metadata } from "next";
import Image from "next/image";
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
  title: "Farhan Aqiqah - Jasa Aqiqah Purwokerto & Banyumas Nomor Satu Terpercaya",
  description: "Layanan jasa aqiqah Purwokerto & Banyumas terbaik. Masakan lezat (sate, tengkleng, bistik), profesional, praktis, dan sesuai syariat.",
  keywords: ["aqiqah purwokerto", "aqiqah banyumas", "jasa aqiqah terpercaya", "farhan aqiqah"],
  alternates: { canonical: "https://jasaqiqah.my.id" },
  openGraph: {
    title: "Farhan Aqiqah - Layanan Jasa Aqiqah Purwokerto & Banyumas Terpercaya",
    description: "Profesional, Praktis, dan Sesuai Syariat. Layanan aqiqah nomor satu dengan masakan lezat di wilayah Banyumas.",
    url: "https://jasaqiqah.my.id",
    siteName: "Farhan Aqiqah",
    images: [{ url: "/images/og-image-large.png", width: 1200, height: 630, alt: "Farhan Aqiqah Purwokerto" }],
    locale: "id_ID",
    type: "website",
  },
};

// --- QUERY DATA DARI SANITY (SINKRON DENGAN SCHEMA TESTIMONY) ---
const getData = async () => {
  const query = groq`{
    "posts": *[_type == "post"] | order(publishedAt desc)[0..3] {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      views,
      "mainImage": mainImage {
        "url": asset->url,
        alt,
        caption
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

// --- DATA HARDCODE DAFTAR HARGA ---
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
  const { posts, testimonials, gallery } = await getData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Farhan Aqiqah",
    "image": "https://jasaqiqah.my.id/images/og-image-large.png",
    "telephone": "+62895324383400",
    "priceRange": "Rp13.500 - Rp3.500.000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Lesanpura No. 17 RT 01/01 Karangklesem",
      "addressLocality": "Purwokerto Selatan",
      "addressRegion": "Jawa Tengah",
      "postalCode": "53144",
      "addressCountry": "ID"
    }
  };

  return (
    <main className="w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <Hero />

      {/* 1. SECTION VALUE PROP */}
      <section className="pt-24 pb-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
            <Star className="w-4 h-4 flex-shrink-0" fill="currentColor" /> Jasa Aqiqah Terpercaya
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-8 tracking-tighter leading-tight">
            Layanan Jasa Aqiqah Purwokerto <br className="hidden md:block" /> & Banyumas Nomor Satu
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Mencari <strong>jasa aqiqah terpercaya</strong> di wilayah <strong>Banyumas</strong>? <strong>Farhan Aqiqah</strong> hadir memberikan solusi <strong>cara aqiqah</strong> yang praktis dengan <strong>masakan lezat</strong> standar premium.
          </p>
          
          <div className="group relative aspect-video max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 transition-transform duration-700 hover:scale-[1.01]">
            <Image src="/images/kantor.jpg" alt="Kantor Layanan Farhan Aqiqah Purwokerto" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" sizes="(max-w-768px) 100vw, 80vw" priority />
          </div>
        </div>
      </section>

      <Features />

      {/* 3. PRICING SECTION */}
      <section id="paket" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/pattern-gold.png')] bg-repeat" style={{ backgroundSize: '400px' }}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-none">
              Daftar Harga <span className="text-accent italic">Terbaik</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm font-medium">
              Pilihan paket aqiqah profesional yang dikelola sepenuh hati, praktis, dan sesuai syariat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-12">
            {/* KARTU JANTAN */}
            <div className="group relative flex flex-col">
              <div className="absolute -inset-1 bg-gradient-to-b from-accent/30 to-transparent rounded-[2rem] blur opacity-25"></div>
              <div className="relative bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-red-950/40 to-transparent">
                  <h3 className="text-white font-black text-3xl mb-2">KAMBING JANTAN</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-wider">Afdhal</span>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Pilihan Utama Sesuai Sunnah</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-3 flex-grow">
                  {hargaJantan.map((item, idx) => (
                    <div key={idx} className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-accent/[0.07] hover:border-accent/40 transform hover:scale-[1.02]">
                      <div className="flex flex-col items-center justify-center w-24 border-r border-white/10 mr-5 text-accent">
                        <span className="text-3xl font-black leading-none">{item.p}</span>
                        <span className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">Juta</span>
                      </div>
                      <div className="flex-1 text-white">
                        <p className="text-sm md:text-base font-bold tracking-tight">{item.s} Sate + {item.t} Porsi Tengkleng</p>
                        <p className="text-white/60 text-xs md:text-sm font-medium italic mt-1.5">Atau {item.t} Bistik + {item.t} Tengkleng</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KARTU BETINA */}
            <div className="group relative flex flex-col">
              <div className="absolute -inset-1 bg-gradient-to-b from-accent/30 to-transparent rounded-[2rem] blur opacity-25"></div>
              <div className="relative bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-gray-900 to-transparent">
                  <h3 className="text-white font-black text-3xl mb-2">KAMBING BETINA</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-white/70 text-[10px] font-black uppercase tracking-wider">Ekonomis</span>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Hemat & Syar'i</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-3 flex-grow">
                  {hargaBetina.map((item, idx) => (
                    <div key={idx} className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-accent/[0.07] hover:border-accent/40 transform hover:scale-[1.02]">
                      <div className="flex flex-col items-center justify-center w-24 border-r border-white/10 mr-5 text-accent">
                        <span className="text-3xl font-black leading-none">{item.p}</span>
                        <span className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1">Juta</span>
                      </div>
                      <div className="flex-1 text-white">
                        <p className="text-sm md:text-base font-bold tracking-tight">{item.s} Sate + {item.t} Porsi Tengkleng</p>
                        <p className="text-white/60 text-xs md:text-sm font-medium italic mt-1.5">Atau {item.t} Bistik + {item.t} Tengkleng</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery items={gallery} />
      <NewsSection posts={posts} />
      
      {/* 5. TESTIMONIALS SECTION */}
      <Testimonials data={testimonials} />

      {/* 6. FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter text-primary">FAQ Farhan Aqiqah</h2>
          <div className="space-y-4 text-left">
            {[
              { q: "Apakah jasa aqiqah di Farhan Aqiqah sudah sesuai syariat?", a: "Kami memprioritaskan keabsahan aqiqah sebagai ibadah. Dari pemilihan kambing cukup umur hingga penyembelihan sesuai kaidah fikih." },
              { q: "Bagaimana cara pesan aqiqah di Farhan Aqiqah?", a: "Sangat mudah! Cukup konsultasi melalui WhatsApp, pilih paket yang diinginkan, dan tim kami akan mengelola semuanya." },
              { q: "Apakah melayani pengiriman area di luar kota?", a: "Kami melayani seluruh area Kabupaten Banyumas dan sekitarnya (seperti Cilacap, Purbalingga) untuk menjaga kualitas masakan." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
                <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center text-lg">
                  {faq.q} <span className="text-accent transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-500 text-sm font-medium leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA WITH SOCIALS */}
      <section className="py-24 bg-accent text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tighter leading-none">Siap Sempurnakan Ibadah Buah Hati?</h2>
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