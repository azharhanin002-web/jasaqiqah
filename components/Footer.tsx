// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 pt-20 pb-10 border-t border-white/5">
      {/* PERBAIKAN: Menggunakan max-w-6xl agar tidak terlalu lebar dan konsisten */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-16">
        
        {/* Brand & Deskripsi */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10">
               <Image 
                src="/images/logo-farhan.png" 
                alt="Farhan Aqiqah Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <h3 className="text-white text-xl font-black tracking-tighter">
              FARHAN <span className="text-accent">AQIQAH</span>
            </h3>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            Layanan aqiqah premium yang mengutamakan keberkahan dan kualitas. Menggunakan kambing pilihan sesuai syariat dengan cita rasa masakan yang istimewa.
          </p>
        </div>

        {/* Link Cepat */}
        <div>
          <h4 className="text-accent font-black mb-8 text-[10px] uppercase tracking-[0.4em]">Navigasi</h4>
          <ul className="space-y-4 text-[13px] font-bold">
            <li><Link href="/" className="hover:text-accent transition-colors">Beranda</Link></li>
            <li><Link href="/#paket" className="hover:text-accent transition-colors">Paket Aqiqah</Link></li>
            <li><Link href="/blog" className="hover:text-accent transition-colors">Artikel Edukasi</Link></li>
            <li><Link href="/kontak" className="hover:text-accent transition-colors">Hubungi Kami</Link></li>
			<li><Link href="https://onislam.web.id" className="hover:text-accent transition-colors">Artikel Islami</Link></li>
          </ul>
        </div>

        {/* Layanan Utama */}
        <div>
          <h4 className="text-accent font-black mb-8 text-[10px] uppercase tracking-[0.4em]">Layanan</h4>
          <ul className="space-y-4 text-[13px] font-medium">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              Aqiqah Paket Sultan
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              Nasi Box Premium
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              Katering Walimah
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
              Dokumentasi Sembelih
            </li>
          </ul>
        </div>

        {/* Kontak Detail */}
        <div>
          <h4 className="text-accent font-black mb-8 text-[10px] uppercase tracking-[0.4em]">Workshop</h4>
          <div className="space-y-5 text-[13px] font-medium">
            <p className="flex items-start gap-4">
              <MapPin size={18} className="text-accent flex-shrink-0" />
              Jl. Lesanpura No.17, RW No.RT.07, Kalibiru, Karangklesem, Purwokerto Selatan, Banyumas Regency, Central Java 53145
            </p>
            <p className="flex items-center gap-4">
              <Mail size={18} className="text-accent flex-shrink-0" />
              admin@jasaqiqah.my.id
            </p>
            <p className="flex items-center gap-4 font-black text-white text-base">
              <Phone size={18} className="text-accent flex-shrink-0" />
              0895-3243-83400
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          © {new Date().getFullYear()} FARHAN AQIQAH • Jasa Aqiqah Profesional Purwokerto
        </p>
      </div>
    </footer>
  );
}