/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Compiler Settings
  // Tetap diaktifkan agar Sanity Studio v3 berjalan lancar tanpa error.
  compiler: {
    styledComponents: true,
  },

  // 2. Konfigurasi Keamanan & Optimasi Gambar
  images: {
    // Mengizinkan format modern AVIF untuk kompresi maksimal (lebih kecil dari WebP) guna menekan LCP.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
  },

  // 3. OPTIMASI TBT (Total Blocking Time) - KUNCI GRADE A
  // Fitur ini memaksa Next.js hanya memuat ikon yang benar-benar digunakan.
  // Ini akan secara signifikan mengurangi ukuran bundle JavaScript utama Anda.
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Memastikan paket lucide-react diproses dengan benar selama proses build.
  transpilePackages: ['lucide-react'],

  // Mengaktifkan Strict Mode untuk mendeteksi potensi masalah performa sejak dini.
  reactStrictMode: true,
  
  // Mematikan source maps di produksi untuk mempercepat proses build dan mengurangi beban file.
  productionBrowserSourceMaps: false,
};

export default nextConfig;