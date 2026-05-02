"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Play } from "lucide-react";

// 1. Update tipe data untuk menyertakan youtubeUrl
interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  views: number;
  youtubeUrl?: string; // Field baru dari Sanity
  mainImage?: {
    url: string;
    alt: string;
  };
}

// 2. Helper untuk mengambil thumbnail YouTube kualitas HD
const getYouTubeThumbnail = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

export default function NewsSection({ posts }: { posts: Post[] }) {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post, idx) => {
            // LOGIKA GAMBAR: Prioritas Main Image > YouTube Thumbnail > Placeholder
            const ytThumb = post.youtubeUrl ? getYouTubeThumbnail(post.youtubeUrl) : null;
            const imageSrc = post.mainImage?.url || ytThumb;
            const isVideoPost = !!post.youtubeUrl && !post.mainImage?.url;

            return (
              <Link key={idx} href={`/blog/${post.slug}`} className="group">
                <div className="space-y-4">
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-sm">
                    {imageSrc ? (
                      <>
                        <Image
                          src={imageSrc}
                          alt={post.mainImage?.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay khusus untuk postingan Video */}
                        {isVideoPost && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-100 group-hover:bg-black/40 transition-all">
                            <div className="w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                              <Play size={20} fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-bold text-gray-400">
                        NO IMAGE
                      </div>
                    )}
                    
                    {/* View Count Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-black/5 z-10">
                      <Eye size={10} className="text-accent" />
                      <span className="text-[9px] font-black text-primary">
                        {(post.views || 0).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-[15px] font-bold text-primary leading-snug tracking-tight line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    
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
            );
          })}
        </div>

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