import { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, Truck, ChevronRight, PhoneCall, Award 
} from "lucide-react";

// Import fungsi auto-link otomatis dari folder utils root
import { applyAutoLinks } from "@/utils/applyAutoLinks";

// --- 1. OPTIMASI SEO METADATA ---
export const metadata: Metadata = {
  title: "Jasa Aqiqah Purwokerto & Banyumas Terbaik | Farhan Aqiqah",
  description: "Cari jasa aqiqah Purwokerto yang syar'i, amanah, and lezat? Farhan Aqiqah menawarkan paket lengkap gratis ongkir dengan olahan masakan khas Sate KMC.",
  keywords: [
    "jasa aqiqah purwokerto",
    "aqiqah purwokerto",
    "aqiqah banyumas",
    "aqiqah purbalingga",
    "paket harga aqiqah banyumas",
    "kambing aqiqah purwokerto"
  ],
  openGraph: {
    title: "Jasa Aqiqah Purwokerto & Banyumas Terpercaya - Farhan Aqiqah",
    description: "Layanan aqiqah premium beralamat di Karangklesem, Purwokerto Selatan. Praktis, higienis, dan sesuai syariat Islam.",
    url: "https://www.jasaqiqah.my.id/jasa-aqiqah",
    type: "website",
  },
};

export default function JasaAqiqahPage() {
  
  // Teks paragraf komersial yang dilewatkan ke sistem auto-linking
  const introText = "Farhan Aqiqah merupakan penyedia layanan jasa aqiqah purwokerto dan area aqiqah banyumas yang berkomitmen menjaga kemurnian syariat Islam. Kami memahami bahwa aqiqah adalah ibadah sekali seumur hidup untuk buah hati Anda. Oleh karena itu, kami memberikan paket harga terbaik dengan kualitas hewan yang terjamin kesehatannya.";

  // --- 2. INJEKSI SCHEMA JSON-LD ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Farhan Aqiqah - Jasa Aqiqah Purwokerto",
    "image": "https://www.jasaqiqah.my.id/images/logo.png",
    "@id": "https://www.jasaqiqah.my.id/#localbusiness",
    "url": "https://www.jasaqiqah.my.id/jasa-aqiqah",
    "telephone": "+62895324383400",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Lesanpura No. 17 RT 01/01 Karangklesem",
      "addressLocality": "Purwokerto Selatan, Banyumas",
      "addressRegion": "Jawa Tengah",
      "postalCode": "53144",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.4524, 
      "longitude": 109.2431
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full bg-white min-h-screen pb-24">
        
        {/* SECTION 1: HERO HEADER */}
        <section className="bg-gradient-to-b from-[#0f0e0a] to-[#1a1305] text-white pt-36 pb-24 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <nav className="flex justify-center items-center gap-2 mb-6 text-amber-500 font-bold text-xs uppercase tracking-widest">
              <Link href="/" className="hover:underline">Beranda</Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/60">Jasa Aqiqah</span>
            </nav>
            
            {/* PERBAIKAN UTAMA: Menambahkan class text-white langsung pada h1 agar teks bawaannya tidak menabrak kegelapan */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter max-w-3xl mx-auto leading-none mb-6 text-white">
              Jasa Aqiqah <span className="text-amber-500">Purwokerto</span> & Banyumas
            </h1>
            
            <p className="text-gray-200 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-90">
              Layanan aqiqah profesional kelas bintang lima yang amanah, transparan, dan dimasak langsung oleh tim ahli dapur Sate KMC.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                href="https://wa.me/62895324383400"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-md shadow-lg transition-all"
              >
                <PhoneCall size={14} /> Konsultasi Gratis
              </Link>
              <Link 
                href="/#paket"
                className="inline-flex items-center bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md transition-all"
              >
                Lihat Pilihan Paket
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: TEKS PENGANTAR SEO (Dengan Auto-Internal Linking) */}
        <section className="py-16 container mx-auto px-6 max-w-4xl border-b border-gray-100">
          <div className="prose prose-lg max-w-none text-center">
            <div className="text-gray-600 font-medium text-base md:text-lg leading-relaxed">
              {applyAutoLinks(introText)}
            </div>
          </div>
        </section>

        {/* SECTION 3: KEUNGGULAN UTAMA */}
        <section className="py-20 container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
              Mengapa Harus Memilih Farhan Aqiqah?
            </h2>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-md shadow-sm hover:border-amber-500/20 transition-colors">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2 text-base">100% Sesuai Syariat</h3>
              <p className="text-gray-600 text-xs leading-relaxed font-medium">
                Kambing/domba dijamin sehat, cukup umur, tidak cacat, dan disembelih mengikuti tata cara fikih Islam yang sah.
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-md shadow-sm hover:border-amber-500/20 transition-colors">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2 text-base">Cita Rasa Sate KMC</h3>
              <p className="text-gray-600 text-xs leading-relaxed font-medium">
                Seluruh masakan diolah langsung oleh tim ahli dari Warung Sate KMC Banyumas. Hidangan empuk, lezat, dan anti prengus.
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-md shadow-sm hover:border-amber-500/20 transition-colors">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-md flex items-center justify-center mb-4">
                <Truck size={20} />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2 text-base">Fasilitas Free Ongkir</h3>
              <p className="text-gray-600 text-xs leading-relaxed font-medium">
                Paket hantaran nasi box kami kirim tepat waktu menggunakan armada khusus langsung menuju rumah Anda di area Purwokerto kota.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: AREA CAKUPAN REGIONAL */}
        <section className="bg-gray-50 py-20 border-y border-gray-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">
              Wilayah Layanan Pengiriman Gratis
            </h2>
            <p className="text-gray-600 text-xs md:text-sm font-medium max-w-xl mx-auto mb-10 leading-relaxed">
              Kami siap melayani kebutuhan aqiqah keluarga Ayah dan Bunda hingga ke pelosok desa di seluruh wilayah eks-karesidenan Banyumas:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Purwokerto Utara", "Purwokerto Selatan", "Purwokerto Timur", "Purwokerto Barat", "Sokaraja", "Baturraden", "Ajibarang", "Purbalingga Kota", "Cilacap Utara"].map((region, i) => (
                <span 
                  key={i} 
                  className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-md shadow-sm"
                >
                  📍 {region}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: QUICK CLOSING CTA */}
        <section className="pt-20 container mx-auto px-6 max-w-3xl text-center">
          <div className="bg-[#0f0e0a] text-white p-10 rounded-md relative overflow-hidden border border-amber-500/10 shadow-xl">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4">
              Sambut Kelahiran Si Kecil dengan Sempurna
            </h3>
            <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto mb-8 opacity-90">
              Konsultasikan kebutuhan tipe kambing, jumlah porsi nasi box, serta jadwal pengiriman acara buah hati Anda bersama admin amanah kami.
            </p>
            <Link 
              href="https://wa.me/62895324383400"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-md shadow-md transition-all"
            >
              Hubungi WhatsApp Admin
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}