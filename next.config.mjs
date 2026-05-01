/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Aktifkan Compiler untuk Styled Components
  // Wajib aktif agar antarmuka Sanity Studio v3 tidak error saat rendering
  compiler: {
    styledComponents: true,
  },

  // 2. Konfigurasi Keamanan Gambar (Remote Patterns)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // WAJIB: Agar gambar yang di-upload ke Sanity CMS bisa tampil di frontend
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 3. Opsi Tambahan (Opsional)
  // Jika Anda menggunakan banyak icon dari lucide-react, ini membantu optimasi build
  transpilePackages: ['lucide-react'],
};

export default nextConfig;