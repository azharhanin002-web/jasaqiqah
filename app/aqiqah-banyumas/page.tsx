import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, MessageCircle, Star, ShieldCheck, Utensils, Truck } from "lucide-react";

// --- SEO & METADATA (Spesifik untuk Wilayah Banyumas) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasaqiqah.my.id"),
  title: "Jasa Aqiqah Banyumas Terpercaya | Paket Lengkap & Sesuai Syariat - Farhan Aqiqah",
  description: "Layanan jasa aqiqah Banyumas terbaik dan profesional. Kami menyediakan paket aqiqah lengkap dengan masakan lezat (Sate, Tengkleng, Bistik) dan gratis antar wilayah Banyumas.",
  keywords: ["aqiqah banyumas", "jasa aqiqah banyumas murah", "paket aqiqah banyumas", "catering aqiqah banyumas", "harga aqiqah banyumas"],
  alternates: { canonical: "/aqiqah-banyumas" },
  openGraph: {
    title: "Farhan Aqiqah - Jasa Aqiqah Terpercaya di Kabupaten Banyumas",
    description: "Nikmati kemudahan ibadah aqiqah dengan layanan profesional, praktis, dan sesuai syariat di wilayah Banyumas.",
    url: "https://www.jasaqiqah.my.id/aqiqah-banyumas",
    siteName: "Farhan Aqiqah",
    images: [{ url: "/images/og-image-banyumas.png", width: 1200, height: 630, alt: "Farhan Aqiqah Banyumas" }],
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

export default function AqiqahBanyumasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Farhan Aqiqah Banyumas",
        "description": "Jasa Aqiqah terbaik di wilayah Kabupaten Banyumas.",
        "url": "https://www.jasaqiqah.my.id/aqiqah-banyumas",
        "telephone": "+62895324383400",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Lesanpura No. 17 RT 01/01 Karangklesem",
          "addressLocality": "Purwokerto Selatan",
          "addressRegion": "Jawa Tengah",
          "addressCountry": "ID"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Apakah Farhan Aqiqah melayani seluruh area Kabupaten Banyumas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya, kami melayani pengiriman gratis untuk seluruh wilayah Kabupaten Banyumas termasuk Sokaraja, Ajibarang, Wangon, dan sekitarnya."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full bg-white">
      <Script id="structured-data-banyumas" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 bg-[#fdfaf0] border-b border-accent/10 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter leading-tight uppercase">
            Jasa Aqiqah Banyumas <br /> Profesional & Amanah
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Wujudkan ibadah aqiqah buah hati Anda dengan layanan catering terbaik di Kabupaten Banyumas. Higienis, masakan lezat, dan jaminan sesuai syariat Islam.
          </p>
          <Link href="https://wa.me/62895324383400" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">
            <MessageCircle size={20} /> Konsultasi Paket Banyumas
          </Link>
        </div>
      </section>

      {/* 2. ARTIKEL PANJANG SEO */}
      <article className="py-20 max-w-4xl mx-auto px-6 prose prose-headings:text-primary prose-headings:font-black prose-p:text-gray-600 prose-p:leading-relaxed">
        <h2>Mengapa Farhan Aqiqah Menjadi Pilihan Utama di Banyumas?</h2>
        <p>
          Menjalankan ibadah aqiqah adalah momen sakral bagi setiap orang tua di Banyumas. Sebagai bentuk syukur atas kelahiran putra atau putri tercinta, pemilihan <strong>jasa aqiqah Banyumas</strong> tidak boleh dilakukan sembarangan. Anda memerlukan mitra yang memahami tata cara syariat sekaligus mampu menyajikan hidangan berkualitas tinggi.
        </p>

        <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
          {[
            { title: "Sesuai Syariat", desc: "Hewan sehat & cukup umur", icon: ShieldCheck },
            { title: "Masakan Lezat", desc: "Resep khas Sate & Tengkleng", icon: Utensils },
            { title: "Gratis Antar", desc: "Seluruh wilayah Banyumas", icon: Truck },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
              <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
              <h4 className="font-black text-primary uppercase text-sm mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3>Keunggulan Menu Autentik Farhan Aqiqah</h3>
        <p>
          Kami memahami bahwa lidah masyarakat Banyumas sangat menghargai masakan dengan bumbu meresap. Oleh karena itu, tim dapur kami mengolah daging kambing dengan teknik khusus untuk memastikan tekstur yang empuk dan tanpa aroma prengus.
        </p>
        <ul>
          <li><strong>Sate Kambing:</strong> Dibakar dengan tingkat kematangan sempurna dan bumbu kacang/kecap yang kaya rasa.</li>
          <li><strong>Tengkleng:</strong> Olahan tulang dan daging dengan kuah rempah yang segar dan gurih.</li>
          <li><strong>Bistik Kambing:</strong> Pilihan menu modern dengan saus bistik yang kental dan menggugah selera.</li>
        </ul>

        <h3>Layanan Praktis untuk Keluarga di Kabupaten Banyumas</h3>
        <p>
          Kini Anda tidak perlu lagi repot mengurus penyembelihan dan pengolahan daging di rumah. Farhan Aqiqah menyediakan layanan <em>one-stop service</em> mulai dari pemilihan hewan di kandang, penyembelihan yang bisa disaksikan langsung, hingga pengiriman nasi box siap saji ke lokasi Anda di Sokaraja, Ajibarang, Rawalo, hingga Sumpiuh.
        </p>
      </article>

      {/* 3. PRICING SECTION (DEEP GOLDEN TWILIGHT) */}
      <section id="paket" className="py-24 bg-gradient-to-b from-[#0f0e0a] via-[#261a02] to-[#0f0e0a] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-3 uppercase">Daftar Harga Banyumas</h2>
            <p className="text-accent/40 font-bold tracking-[0.2em] uppercase text-[10px] border-y border-accent/20 inline-block py-2">Premium & Sesuai Syariat</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
            <div className="space-y-6">
              <div className="group relative bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.4)] hover:-translate-y-1">
                <div className="bg-gradient-to-r from-red-950/90 to-red-900/90 p-5 text-center border-b border-white/10">
                  <h3 className="text-white font-black text-xl uppercase tracking-[0.2em]">Kambing Jantan</h3>
                </div>
                <div className="p-8 space-y-4">
                  {hargaJantan.map((item, idx) => (
                    <div key={idx} className="flex items-stretch bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all hover:bg-white/[0.05]">
                      <div className="bg-red-950/30 flex flex-col justify-center items-center px-5 py-4 border-r border-white/5 min-w-[100px]">
                        <span className="text-accent text-3xl font-black tracking-tighter">{item.p}</span>
                        <span className="text-accent/60 text-[10px] font-black uppercase mt-1">Juta</span>
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-2 text-white/80 text-[12px] font-bold">
                          <CheckCircle2 size={15} className="text-red-500 shrink-0" />
                          <span>{item.sate} Sate + {item.tengkleng} Tengkleng</span>
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

              {/* BONUS KECIL */}
              <div className="bg-black/40 border border-accent/20 rounded-3xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-[#0f0e0a]"><Star size={20} fill="currentColor" /></div>
                <div className="flex-1"><h4 className="text-white font-black text-xs uppercase">Bonus Banyumas</h4>
                <p className="text-[9px] font-bold text-accent uppercase opacity-70">#Sertifikat #Dokumentasi #Souvenir</p></div>
              </div>
            </div>

            {/* PAKET NASI BOX (Diletakkan di samping untuk variasi layout) */}
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 flex flex-col gap-6 h-full justify-center">
              <div>
                <p className="text-accent font-black text-[10px] uppercase tracking-[0.5em] mb-1">Harga</p>
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none mb-3">PAKET NASI BOX</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Nasi", "Kari Kentang", "Capcay", "Acar", "Kerupuk", "Alat Makan"].map((m, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.05] p-2.5 rounded-xl">
                    <div className="w-1 h-1 rounded-full bg-accent"></div>
                    <span className="text-white font-bold text-[9px] uppercase">{m}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="bg-black border border-accent/30 text-white p-4 rounded-2xl flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-accent/50">Buah Semangka</span>
                  <span className="text-xl font-black text-white tracking-tighter">Rp 13.500</span>
                </div>
                <div className="bg-black border border-accent/30 text-white p-4 rounded-2xl flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-accent/50">Buah Pisang</span>
                  <span className="text-xl font-black text-white tracking-tighter">Rp 15.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 bg-accent text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black text-primary mb-6 uppercase tracking-tighter">Aqiqah di Banyumas Jadi Lebih Mudah</h2>
          <p className="text-primary/70 font-medium mb-10">Hubungi admin Farhan Aqiqah sekarang untuk mendapatkan penawaran harga terbaik dan konsultasi syariat gratis.</p>
          <Link href="https://wa.me/62895324383400" className="bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl inline-block hover:scale-105 transition-all">
            Kirim Pesan WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}