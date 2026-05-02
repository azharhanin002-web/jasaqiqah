import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Konfigurasi Font Inter dengan subset Latin
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// Konfigurasi Viewport (Terpisah dari Metadata di Next.js 15)
export const viewport: Viewport = {
  themeColor: "#ffffff", // Sesuaikan dengan warna brand Anda
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // metadataBase disetel ke www agar sinkron dengan GSC & sitemap.ts Anda
  metadataBase: new URL("https://www.jasaqiqah.my.id"),
  title: {
    default: "Farhan Aqiqah - Jasa Aqiqah Purwokerto & Banyumas Nomor Satu",
    template: "%s | Farhan Aqiqah",
  },
  description: "Layanan jasa aqiqah Purwokerto & Banyumas terbaik. Masakan lezat, profesional, praktis, dan sesuai syariat. Pilihan tepat untuk akikah buah hati Anda.",
  keywords: [
    "aqiqah purwokerto", 
    "aqiqah banyumas", 
    "jasa aqiqah terpercaya", 
    "harga aqiqah purwokerto", 
    "paket aqiqah banyumas"
  ],
  authors: [{ name: "Farhan Aqiqah" }],
  creator: "Farhan Aqiqah",
  publisher: "Farhan Aqiqah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  openGraph: {
    title: "Farhan Aqiqah - Layanan Jasa Aqiqah Purwokerto Nomor Satu",
    description: "Profesional, Praktis, dan Sesuai Syariat. Layanan aqiqah terpercaya untuk wilayah Banyumas dan sekitarnya.",
    url: "https://www.jasaqiqah.my.id",
    siteName: "Farhan Aqiqah",
    images: [
      {
        url: "/images/og-image-large.png",
        width: 1200,
        height: 630,
        alt: "Layanan Premium Farhan Aqiqah Purwokerto",
      },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "Odpd2CclXtZRjuWQpqt44nYm8iaVcsCILU4Azkd-XxY", // Ganti dengan kode dari Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${inter.className} bg-white text-primary antialiased selection:bg-accent/30 selection:text-primary`}
      >
        {/* Header tetap di atas (Fixed) */}
        <Header />
        
        {/* Area Konten Utama dengan transisi halus */}
        <main className="relative min-h-screen flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
        </main>
        
        {/* Footer di bawah */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}