import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import { CheckCircle2, MessageCircle, Star, ShieldCheck, Utensils, Truck, MapPin } from "lucide-react";

// --- SEO & METADATA (Spesifik Wilayah Purbalingga) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasaqiqah.my.id"),
  title: "Jasa Aqiqah Purbalingga Terbaik | Paket Kambing & Catering Berkah - Farhan Aqiqah",
  description: "Layanan jasa aqiqah Purbalingga terpercaya. Paket kambing aqiqah lengkap, masakan enak (Sate, Tengkleng, Bistik), dan gratis ongkir ke wilayah Purbalingga. Cek harga paket sekarang!",
  keywords: ["aqiqah purbalingga", "jasa aqiqah purbalingga", "paket aqiqah purbalingga murah", "kambing aqiqah purbalingga", "catering aqiqah purbalingga"],
  alternates: { canonical: "/aqiqah-purbalingga" },
  openGraph: {
    title: "Farhan Aqiqah - Spesialis Jasa Aqiqah Profesional di Purbalingga",
    description: "Ibadah aqiqah jadi lebih praktis dan berkah dengan layanan Farhan Aqiqah. Gratis pengiriman untuk area Kabupaten Purbalingga.",
    url: "https://www.jasaqiqah.my.id/aqiqah-purbalingga",
    siteName: "Farhan Aqiqah",
    images: [{ url: "/images/og-image-purbalingga.png", width: 1200, height: 630, alt: "Farhan Aqiqah Purbalingga" }],
    locale: "id_ID",
    type: "article",
  },
};

const hargaJantan = [
  { p: "2,7", sate: "300", bistik: "60", tengkleng: "60" },
  { p: "2,9", sate: "350", bistik: "70", tengkleng: "70" },
  { p: "3,1", sate: "400", bistik: "80", tengkleng: "80" },
  { p: "3,3", sate: "450", bistik: "90", tengkleng: "90" },
  { p: "3,5", sate: "500", bistik: "100", tengkleng: "100" },
];

export default function AqiqahPurbalinggaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.jasaqiqah.my.id/aqiqah-purbalingga/#organization",
        "name": "Farhan Aqiqah Purbalingga",
        "description": "Layanan aqiqah profesional melayani wilayah Kabupaten Purbalingga.",
        "url": "https://www.jasaqiqah.my.id/aqiqah-purbalingga",
        "telephone": "+62895324383400",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Lesanpura No. 17 RT 01/01 Karangklesem",
          "addressLocality": "Purwokerto Selatan",
          "addressRegion": "Jawa Tengah",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -7.3875,
          "longitude": 109.3514
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Apakah Farhan Aqiqah melayani pengiriman ke Bobotsari dan Bukateja?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tentu! Kami melayani pengiriman gratis untuk seluruh wilayah Kabupaten Purbalingga, termasuk Bobotsari, Bukateja, Kalimanah, dan Bojongsari."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Header variant="light" />

      <main className="w-full bg-white overflow-hidden">
        <Script id="structured-data-purbalingga" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-20 bg-gray-50 border-b border-gray-100 text-center relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Layanan Spesialis Purbalingga</p>
            <h1 className="text-4xl md:text-7xl font-black text-primary mb-6 tracking-tighter leading-tight uppercase">
              Jasa Aqiqah <br className="hidden md:block" /> Purbalingga Terbaik
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Sempurnakan ibadah aqiqah buah hati Anda dengan layanan catering profesional yang menjangkau seluruh pelosok Kabupaten Purbalingga.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="https://wa.me/62895324383400" target="_blank" className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <MessageCircle size={20} /> Konsultasi Sekarang
              </Link>
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm">
                <MapPin size={18} className="text-accent" /> Area Purbalingga & Sekitarnya
              </div>
            </div>
          </div>
        </section>

        {/* 2. ARTIKEL SEO LOKAL */}
        <article className="py-24 max-w-4xl mx-auto px-6 prose prose-headings:text-primary prose-headings:font-black prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-primary prose-ul:text-gray-600">
          <h2 id="cerita">Solusi Praktis Aqiqah Bagi Warga Purbalingga</h2>
          <p>
            Memilih <strong>jasa aqiqah Purbalingga</strong> yang tepat bukan hanya soal mencari harga termurah, melainkan soal kepercayaan dan keberkahan ibadah. Bagi keluarga di Purbalingga, Farhan Aqiqah hadir sebagai solusi yang memudahkan transisi momen kelahiran menjadi syukuran yang bermakna tanpa harus merepotkan tuan rumah.
          </p>

          <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
            {[
              { t: "Pemilihan Hewan Syar'i", d: "Kami memastikan kambing sehat, tidak cacat, dan cukup umur.", i: ShieldCheck },
              { t: "Olahan Khas Nusantara", d: "Sate empuk, Tengkleng gurih, dan Bistik yang kaya rempah.", i: Utensils },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex gap-5 items-start transition-all hover:border-accent/30">
                <item.i className="w-10 h-10 text-accent shrink-0" />
                <div>
                  <h4 className="font-black text-primary uppercase text-sm mb-2">{item.t}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <h3>Mengapa Memilih Kami untuk Aqiqah di Purbalingga?</h3>
          <p>
            Kabupaten Purbalingga memiliki karakteristik masyarakat yang sangat menghargai kebersamaan dan kualitas hidangan. Farhan Aqiqah menjawab kebutuhan tersebut dengan standar pelayanan premium:
          </p>
          <ul>
            <li><strong>Gratis Pengiriman:</strong> Layanan kami menjangkau seluruh kecamatan di Purbalingga seperti Bukateja, Kalimanah, Karangreja, Kutasari, hingga Mrebet tanpa biaya tambahan.</li>
            <li><strong>Sertifikat & Dokumentasi:</strong> Setiap paket sudah termasuk sertifikat aqiqah sebagai kenangan dan dokumentasi proses penyembelihan untuk ketenangan hati Anda.</li>
            <li><strong>Kemasan Higienis:</strong> Nasi box kami dikemas secara profesional dan elegan, sangat cocok untuk dibagikan kepada kerabat dan tetangga.</li>
          </ul>

          <blockquote className="border-l-4 border-accent bg-[#fdfaf0] p-8 rounded-r-3xl my-10">
            <p className="italic text-primary font-bold">"Kepercayaan warga Purbalingga adalah amanah bagi kami. Kami berkomitmen menyajikan yang terbaik untuk momen sekali seumur hidup buah hati Anda."</p>
          </blockquote>
        </article>

        {/* 3. PRICING SECTION (DEEP GOLDEN TWILIGHT) */}
        <section id="paket" className="py-24 bg-gradient-to-b from-[#0f0e0a] via-[#261a02] to-[#0f0e0a] relative">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-3 uppercase italic">Harga Paket <span className="text-accent">Purbalingga</span></h2>
              <div className="h-1 w-24 bg-accent mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
              <div className="space-y-6">
                <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-accent/40">
                  <div className="bg-gradient-to-r from-red-950/90 to-red-900/90 p-6 text-center">
                    <h3 className="text-white font-black text-xl uppercase tracking-widest">Kambing Jantan</h3>
                  </div>
                  <div className="p-8 space-y-4">
                    {hargaJantan.map((item, idx) => (
                      <div key={idx} className="flex items-stretch bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-colors">
                        <div className="bg-red-950/30 flex flex-col justify-center items-center px-6 py-4 border-r border-white/5 min-w-[100px]">
                          <span className="text-accent text-3xl font-black tracking-tighter">{item.p}</span>
                          <span className="text-accent/60 text-[10px] font-black uppercase mt-1">Juta</span>
                        </div>
                        <div className="flex-1 p-5 flex flex-col justify-center gap-2">
                          <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-tight">
                            <CheckCircle2 size={16} className="text-red-500" />
                            <span>{item.sate} Sate + {item.tengkleng} Tengkleng</span>
                          </div>
                          {/* PENAMBAHAN KATA "ATAU" */}
                          <div className="flex items-center gap-4">
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                            <span className="text-[8px] font-black text-red-500/30 tracking-[0.2em]">ATAU</span>
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                          </div>
                          <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-tight">
                            <CheckCircle2 size={16} className="text-red-500" />
                            <span>{item.bistik} Bistik + {item.tengkleng} Tengkleng</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 border border-accent/20 rounded-3xl p-5 flex items-center gap-5">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-[#0f0e0a] shrink-0 shadow-[0_0_20px_rgba(217,161,60,0.3)]"><Star size={24} fill="currentColor" /></div>
                  <div className="flex-1">
                    <h4 className="text-white font-black text-sm uppercase tracking-wider">Bonus Spesial Purbalingga</h4>
                    <p className="text-[10px] font-bold text-accent/60 uppercase mt-1 tracking-widest">#Sertifikat #Souvenir #GratisAntar</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 flex flex-col gap-8 h-full">
                <div>
                  <p className="text-accent font-black text-[10px] uppercase tracking-[0.5em] mb-2">Penawaran Lengkap</p>
                  <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-4">PAKET NASI BOX</h3>
                  <div className="h-0.5 w-full bg-gradient-to-r from-accent/50 to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["Nasi Putih", "Kari Kentang", "Capcay", "Acar Segar", "Kerupuk", "Alat Makan"].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.05] p-3 rounded-2xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(217,161,60,0.8)]"></div>
                      <span className="text-white font-bold text-[10px] uppercase tracking-tighter">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-6 border-t border-white/10 mt-auto">
                  <div className="bg-black/80 border border-accent/20 text-white p-5 rounded-3xl flex justify-between items-center transition-all hover:border-accent">
                    <span className="text-[10px] font-black uppercase text-accent/50 tracking-[0.2em]">Plus Semangka</span>
                    <span className="text-2xl font-black text-white tracking-tighter">Rp 13.500</span>
                  </div>
                  <div className="bg-black/80 border border-accent/20 text-white p-5 rounded-3xl flex justify-between items-center transition-all hover:border-accent">
                    <span className="text-[10px] font-black uppercase text-accent/50 tracking-[0.2em]">Plus Pisang</span>
                    <span className="text-2xl font-black text-white tracking-tighter">Rp 15.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="py-24 bg-accent text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter leading-none">Aqiqah di Purbalingga <br /> Tanpa Ribet?</h2>
            <p className="text-primary/70 font-bold mb-10 max-w-lg mx-auto text-sm md:text-base leading-relaxed">Konsultasikan kebutuhan ibadah buah hati Anda bersama tim Farhan Aqiqah. Kami siap memberikan penawaran paket terbaik hari ini.</p>
            <Link href="https://wa.me/62895324383400" className="bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl inline-block hover:scale-105 transition-all active:scale-95">
              Hubungi Admin Kami
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}