import type { Config } from "tailwindcss";

const config: Config = {
  // Menentukan folder mana saja yang akan di-scan oleh Tailwind
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",         // Folder App Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  // Folder Komponen
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",       // Folder Pages (jika ada)
  ],
  theme: {
    extend: {
      // Skema warna premium untuk branding Farhan Aqiqah
      colors: {
        primary: "#1A1A1A",      // Hitam pekat elegan
        accent: "#D4AF37",       // Emas / Gold premium
        "accent-dark": "#AA8C2C", // Variasi emas untuk efek hover
      },
      // Definisi animasi untuk transisi halus
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    // Wajib ditambahkan agar artikel blog memiliki tata letak otomatis yang rapi
    require('@tailwindcss/typography'), 
  ],
};
export default config;