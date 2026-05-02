import Image from "next/image";
import Link from "next/link";
import { Calendar, Star, ArrowRight, Clock, Play } from "lucide-react";
import { client } from "@/sanity/lib/client"; 
import { groq } from "next-sanity";

// --- 1. DEFINISI INTERFACE ---
interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  image: string; // Hasil dari mainImage.asset->url
  youtubeUrl?: string;
  category: string;
}

interface BlogData {
  posts: Post[];
  allCategories: string[];
}

// --- 2. HELPER YOUTUBE ---
const getYouTubeThumbnail = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// --- 3. QUERY DATA BLOG ---
async function getBlogData(category?: string): Promise<BlogData> {
  const filter = category && category !== "Semua" ? `&& "${category}" in categories[]->title` : "";
  
  const query = groq`{
    "posts": *[_type == "post" ${filter}] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      youtubeUrl,
      "image": mainImage.asset->url,
      "category": categories[0]->title
    },
    "allCategories": *[_type == "category"] | order(title asc).title
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { cat?: string } 
}) {
  const currentCat = searchParams.cat || "Semua";
  const { posts, allCategories } = await getBlogData(currentCat);
  
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const categoriesList = ["Semua", ...allCategories];

  return (
    <main className="w-full bg-white min-h-screen pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-primary pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/pattern-gold.png')] bg-repeat" style={{ backgroundSize: '400px' }}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent/5 via-transparent to-primary pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm">
            <Star className="w-4 h-4 flex-shrink-0" fill="currentColor" /> Pojok Ilmu & Informasi
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Artikel & <span className="text-accent italic">Berita</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Informasi terupdate seputar ibadah aqiqah dan tips islami untuk Ayah & Bunda.
          </p>
        </div>
      </section>

      {/* 2. KATEGORI MENU */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.03] p-4 flex gap-3 overflow-x-auto hide-scrollbar border border-gray-100">
          {categoriesList.map((cat, idx) => (
            <Link 
              key={idx}
              href={`/blog?cat=${cat}`}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                currentCat === cat 
                ? "bg-primary text-accent shadow-lg" 
                : "bg-gray-50 text-gray-400 hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED POST */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="relative bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col lg:flex-row transition-all duration-500 hover:shadow-2xl">
              <div className="lg:w-3/5 relative aspect-video lg:aspect-auto overflow-hidden bg-gray-900">
                {/* LOGIKA GAMBAR UNTUK FEATURED */}
                {(() => {
                  const ytThumb = getYouTubeThumbnail(featuredPost.youtubeUrl);
                  const imageSrc = featuredPost.image || ytThumb;
                  if (!imageSrc) return <div className="w-full h-full bg-gray-800" />;
                  
                  return (
                    <>
                      <Image 
                        src={imageSrc} 
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                        priority
                      />
                      {featuredPost.youtubeUrl && !featuredPost.image && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center pl-1 shadow-2xl transform group-hover:scale-110 transition-transform">
                            <Play size={32} fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
                <div className="absolute top-6 left-6 bg-accent text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {featuredPost.category}
                </div>
              </div>

              <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> Baru Saja</span>
                  <span>•</span>
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-primary leading-tight mb-4 group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 text-sm lg:text-base font-medium leading-relaxed mb-8 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Baca Selengkapnya <ArrowRight size={16} className="text-accent" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 4. BLOG GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">Terbaru</h2>
          <div className="h-[1px] flex-1 bg-gray-100 ml-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {remainingPosts.length > 0 ? (
            remainingPosts.map((post: Post, idx: number) => {
              const ytThumb = getYouTubeThumbnail(post.youtubeUrl);
              const imageSrc = post.image || ytThumb;

              return (
                <Link key={idx} href={`/blog/${post.slug}`} className="group block w-full">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm transition-transform duration-500 group-hover:shadow-xl">
                    {imageSrc ? (
                      <>
                        <Image 
                          src={imageSrc} 
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {post.youtubeUrl && !post.image && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <div className="w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center pl-0.5 shadow-lg">
                              <Play size={18} fill="currentColor" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {post.category}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-primary leading-tight tracking-tight mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-400 font-medium py-10">
              Belum ada artikel lainnya untuk kategori ini.
            </p>
          )}
        </div>

        <div className="mt-20 text-center">
          <Link href="/blog" className="inline-flex items-center justify-center gap-3 bg-gray-50 text-primary px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-accent hover:text-primary transition-all active:scale-95 border border-transparent hover:border-accent">
            Segarkan Halaman
          </Link>
        </div>
      </section>

    </main>
  );
}