import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageCircle, TrendingUp, Users, ChefHat } from "lucide-react";

// --- SEO & METADATA (Spesifik untuk Halaman Aqiqah Purwokerto) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasaqiqah.my.id"),
  title: "Panduan Lengkap Memilih Jasa Aqiqah Purwokerto Terbaik | Farhan Aqiqah",
  description: "Mencari jasa aqiqah Purwokerto terbaik? Farhan Aqiqah menawarkan paket lengkap, harga murah, masakan lezat, profesional, dan sesuai syariat. Konsultasi Gratis via WhatsApp sekarang.",
  keywords: ["aqiqah purwokerto", "jasa aqiqah banyumas", "paket aqiqah purwokerto", "aqiqah terdekat", "farhan aqiqah purwokerto"],
  alternates: { canonical: "/aqiqah-purwokerto" },
  openGraph: {
    title: "Farhan Aqiqah - Jasa Aqiqah Purwokerto & Banyumas Terbaik",
    description: "Profesional, Praktis, dan Sesuai Syariat. Layanan aqiqah terpercaya dengan bonus lengkap di Purwokerto.",
    url: "https://www.jasaqiqah.my.id/aqiqah-purwokerto",
    siteName: "Farhan Aqiqah",
    images: [{ url: "/images/og-image-purwokerto.png", width: 1200, height: 630, alt: "Farhan Aqiqah Purwokerto" }],
    locale: "id_ID",
    type: "article",
  },
};

// --- DATA UNTUK ARTIKEL ---
const benefits = [
  { icon: CheckCircle2, text: "Kambing Jantan/Betina Cukup Umur & Sehat" },
  { icon: ChefHat, text: "Masakan Lezat & Higienis (Sate, Tengkleng, Bistik)" },
  { icon: Users, text: "Layanan Profesional & Pengiriman Tepat Waktu" },
  { icon: TrendingUp, text: "Bonus Lengkap: Sertifikat, Dokumentasi, Souvenir" },
];

export default function AqiqahPurwokertoPage() {
  return (
    <>
      {/* Memanggil Header dengan varian light agar teks berwarna hitam di bg putih */}
      <Header variant="light" /> 

      <main className="w-full bg-white overflow-hidden">
        
        {/* 1. HERO SECTION (SIMPLE & OPTIMIZED) */}
        <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-accent font-black text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Solusi Ibadah Buah Hati</p>
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter leading-tight">
              Panduan Memilih Jasa Aqiqah <br className="hidden md:block" /> Purwokerto Terbaik & Terpercaya
            </h1>
            <p className="max-w-3xl mx-auto text-gray-500 font-medium leading-relaxed mb-12">
              Mencari jasa aqiqah di Purwokerto yang sesuai syariat, praktis, dan menyajikan masakan lezat bukanlah hal mudah. Tim Farhan Aqiqah menyusun panduan lengkap ini untuk membantu Anda menyempurnakan ibadah aqiqah buah hati tercinta.
            </p>
            <Link href="https://wa.me/62895324383400" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
              <MessageCircle size={18} /> Konsultasi Gratis Sekarang
            </Link>
          </div>
        </section>

        {/* 2. ARTIKEL UTAMA (SEMANTIC HTML) */}
        <article className="py-24">
          <div className="max-w-4xl mx-auto px-6 prose prose-accent prose-sm md:prose-base prose-headings:font-black prose-headings:tracking-tight prose-headings:text-primary prose-p:font-medium prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            
            <h2 id="mengapa">Mengapa Harus Selektif Memilih Jasa Aqiqah di Purwokerto?</h2>
            <p>
              Purwokerto, sebagai pusat Kabupaten Banyumas, memiliki banyak pilihan layanan aqiqah. Namun, aqiqah bukan sekadar memesan makanan. Ini adalah ibadah yang memiliki ketetapan hukum fiqih. Salah dalam pemilihan hewan, proses penyembelihan, atau pengolahan masakan dapat berisiko pada keabsahan ibadah tersebut.
            </p>
            <p>
              Oleh karena itu, memilih Jasa Aqiqah Purwokerto yang **profesional** dan **sesuai syariat** adalah prioritas utama. Anda berhak mendapatkan ketenangan pikiran bahwa ibadah Anda dikelola oleh tim yang ahli dan amanah.
            </p>

            <blockquote className="bg-[#fcf8e8] p-8 rounded-3xl border border-accent/20 my-12">
              <h3 className="text-primary !text-2xl mt-0">Farhan Aqiqah Purwokerto: Kualitas Nomor Satu</h3>
              <p className="text-gray-700 !leading-relaxed">Farhan Aqiqah hadir di Purwokerto dengan komitmen tunggal: menyempurnakan ibadah aqiqah Anda dengan layanan yang tak tertandingi. Kami memadukan ketaatan pada syariat dengan keahlian kuliner terbaik.</p>
            </blockquote>

            <h2 id="kriteria">Kriteria Jasa Aqiqah Purwokerto Terpercaya</h2>
            <p>Berikut adalah 4 kriteria utama yang wajib Anda perhatikan saat memilih layanan aqiqah di Purwokerto, Banyumas, dan sekitarnya:</p>

            <h3 id="syariat">1. Kesesuaian Syariat Islam</h3>
            <p>
              Ini adalah kriteria mutlak. Tim kami di Farhan Aqiqah memastikan bahwa hewan aqiqah (baik kambing jantan maupun betina) memenuhi kriteria umur, kesehatan, dan fisik. Proses penyembelihan dilakukan oleh penjagal yang bersertifikat dan memahami kaidah fikih penyembelihan secara mendalam.
            </p>

            <h3 id="kualitas">2. Kualitas dan Rasa Masakan</h3>
            <p>
              Masakan yang lezat adalah bentuk penghormatan terbaik untuk tamu undangan dan kerabat. Tim koki kami ahli dalam mengolah daging kambing menjadi hidangan tanpa bau prengus, empuk, dan kaya bumbu. Pilihan menu favorit kami meliputi Sate, Tengkleng, dan Bistik yang autentik.
            </p>

            <h3 id="praktis">3. Pelayanan Praktis & Lengkap</h3>
            <p>
              Keluarga modern membutuhkan layanan yang serba praktis. Farhan Aqiqah menawarkan paket lengkap "Siap Antar". Kami tidak hanya menyiapkan masakan, tetapi juga paket Nasi Box premium yang higienis, lengkap dengan buah semangka atau pisang sebagai pencuci mulut.
            </p>

            <h3 id="bonus">4. Bonus Eksklusif</h3>
            <p>
              Sebagai Jasa Aqiqah Purwokerto nomor satu, kami memberikan nilai tambah eksklusif untuk setiap pemesanan. Paket Anda sudah termasuk:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-accent/30">
                  <benefit.icon className="w-5 h-5 flex-shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-primary font-bold text-xs md:text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <h2 id="area">Area Layanan Farhan Aqiqah Purwokerto</h2>
            <p>
              Kami dengan bangga melayani seluruh area di Purwokerto Selatan, Purwokerto Barat, Purwokerto Timur, dan Purwokerto Utara. Selain itu, kami juga menjangkau seluruh area di Kabupaten Banyumas dan sekitarnya, termasuk Cilacap, Purbalingga, dan Banjarnegara. Tim armada kami berkomitmen untuk pengiriman yang tepat waktu.
            </p>

            <h2 id="kesimpulan">Kesimpulan: Pesan di Jasa Aqiqah Purwokerto Terbaik</h2>
            <p>
              Menyempurnakan ibadah buah hati adalah bentuk syukur terbaik. Pilihlah Jasa Aqiqah Purwokerto yang memberikan jaminan kesesuaian syariat, kelezatan masakan, dan pelayanan profesional.
            </p>
            <p>
              Jangan ragu untuk mengonsultasikan kebutuhan aqiqah buah hati Anda dengan tim ahli kami di Farhan Aqiqah. Kami siap membantu Anda menyusun paket terbaik dengan harga yang transparan dan kompetitif.
            </p>
          </div>
        </article>

        {/* 3. FINAL CTA SECTION (STYLING MODERN GOLD) */}
        <section className="py-24 bg-gradient-to-b from-[#0f0e0a] via-[#261a02] to-[#0f0e0a] text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
            <p className="text-accent font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">Layanan Spesialis Aqiqah Purwokerto</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
              Konsultasi Gratis Via WhatsApp Sekarang
            </h2>
            <p className="max-w-xl mx-auto text-white/50 font-medium leading-relaxed">
              Punya pertanyaan mengenai pemilihan kambing jantan, harga betina, atau area pengiriman di luar Purwokerto? Tim kami siap menjawabnya melalui WhatsApp dalam hitungan menit.
            </p>
            <div className="flex flex-col items-center gap-6 pt-6">
              <Link href="https://wa.me/62895324383400" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-accent text-[#0f0e0a] px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
                <MessageCircle size={20} /> CHAT ADMIN FARHAN AQIQAH
              </Link>
              <p className="text-accent text-[10px] uppercase font-bold tracking-widest">Sesuai Brosur: Sate, Tengkleng, Bistik</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}