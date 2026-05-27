import { Metadata } from 'next';
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: 'Kontak Kami | Farhan Aqiqah Purwokerto',
  description: 'Hubungi Jasa Aqiqah Amanah untuk konsultasi gratis mengenai paket aqiqah putra-putri Anda wilayah Purwokerto dan Banyumas.',
};

export default function KontakPage() {
  return (
    <>
      {/* 1. FIXED HEADER WRAPPER: Memaksa elemen navbar melayang bawaan agar mengunci background gelap sejak awal sebelum di-scroll */}
      <div className="w-full relative z-50 bg-[#0f0e0a] h-20 [&_header]:bg-[#0f0e0a] [&_nav]:bg-[#0f0e0a]">
        <Header variant="dark" />
      </div>

      {/* 2. MAIN CONTENT AREA: Bersih latar putih dari batas bawah navbar */}
      <main className="pt-16 pb-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* JUDUL UTAMA */}
          <div className="text-center mb-16">
            <p className="text-amber-600 font-black text-xs uppercase tracking-[0.4em] mb-3">Hubungi Farhan Aqiqah</p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Kontak Kami
            </h1>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Kami siap membantu Ayah & Bunda kapan saja untuk mewujudkan ibadah aqiqah buah hati yang amanah, praktis, dan sesuai syariat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Info Detail */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-2xl text-amber-700 mr-4 shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-1">Lokasi Kantor</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Jl. Lesanpura No. 17 RT 01/01 Karangklesem, <br />
                    Kec. Purwokerto Selatan, Kabupaten Banyumas, Jawa Tengah
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-2xl text-amber-700 mr-4 shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-1">Jam Operasional</h3>
                  <p className="text-gray-600 text-sm">Senin - Minggu: 08.00 - 20.00 WIB</p>
                  <p className="text-amber-600 text-[10px] font-bold uppercase mt-1 tracking-wider">*Layanan Chat WA Aktif 24 Jam</p>
                </div>
              </div>
            </div>

            {/* MAP CONTAINER */}
            <div className="bg-gray-50 rounded-[2.5rem] h-64 flex items-center justify-center border border-gray-200 overflow-hidden group hover:border-amber-500/30 transition-colors shadow-sm relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.1276514125684!2d109.2479343!3d-7.451127000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c2ed126d177%3A0xd40189b4d77e4995!2sAQIQAH%20PURWOKERTO!5e0!3m2!1sid!2sid!4v1779834637808!5m2!1sid!2sid" 
                className="w-full h-full absolute inset-0"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}