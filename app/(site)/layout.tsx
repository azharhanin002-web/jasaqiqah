import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Farhan Aqiqah - Jasa Aqiqah Purwokerto & Banyumas Nomor Satu Terpercaya",
    template: "%s | Farhan Aqiqah",
  },
  description: "Layanan jasa aqiqah Purwokerto & Banyumas terbaik. Masakan lezat, profesional, praktis, dan sesuai syariat. Pilihan tepat untuk akikah dan aqeqah buah hati Anda.",
  metadataBase: new URL("https://jasaqiqah.my.id"),
  alternates: { 
    canonical: "/",
  },
  openGraph: {
    title: "Farhan Aqiqah - Layanan Jasa Aqiqah Purwokerto Nomor Satu",
    description: "Profesional, Praktis, dan Sesuai Syariat. Layanan aqiqah terpercaya untuk wilayah Banyumas dan sekitarnya.",
    url: "https://jasaqiqah.my.id",
    siteName: "Farhan Aqiqah",
    images: [
      { 
        url: "/images/og-image-large.png", // Menggunakan aset visual premium yang sudah kita siapkan
        width: 1200, 
        height: 630,
        alt: "Layanan Premium Farhan Aqiqah Purwokerto",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Aqiqah Purwokerto & Banyumas",
    description: "Jasa Aqiqah Nomor Satu dengan masakan lezat dan pelayanan profesional.",
    images: ["/images/og-image-large.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-primary antialiased`}>
        {/* Header tetap di atas (Fixed) */}
        <Header />
        
        {/* Area Konten Utama */}
        <div className="relative min-h-screen">
          {children}
        </div>
        
        {/* Footer di bawah */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}