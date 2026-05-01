import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

// 1. Definisikan tipe data sesuai dengan GROQ query dari page.tsx
interface Post {
  title: string;
  slug: string; // Tipe slug diperbaiki menjadi string, karena di page.tsx kita menggunakan "slug": slug.current
  publishedAt: string;
  views: number;
  mainImage: {
    url: string;
    alt: string;
  };
}

export default function NewsSection({ posts }: { posts: Post[] }) {
  // Jika data belum ada, tampilkan null agar tidak error
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              Blog Edukasi
            </span>
            <h2 className="text-4xl font-black text-primary tracking-tighter">
              Kabar Terbaru & Tips Aqiqah
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest hover:text-accent transition-colors"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid 4 Kolom - Data Dinamis dari Sanity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post, idx) => (
            // PERBAIKAN: Menggunakan post.slug secara langsung
            <Link key={idx} href={`/blog/${post.slug}`} className="group">
              <div className="space-y-4">
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-100">
                  {post.mainImage?.url ? (
                    <Image
                      src={post.mainImage.url}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-bold text-gray-400">
                      NO IMAGE
                    </div>
                  )}
                  
                  {/* View Count Badge (Real) */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-black/5">
                    <Eye size={10} className="text-accent" />
                    <span className="text-[9px] font-black text-primary">{(post.views || 0).toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-[15px] font-bold text-primary leading-snug tracking-tight line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Format Tanggal Real dari Sanity */}
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Mobile Only */}
        <div className="mt-10 md:hidden text-center">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest"
            >
                Lihat Semua <ArrowRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
}