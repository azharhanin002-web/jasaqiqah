import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Calendar, Eye, Facebook, Instagram, 
  MessageCircle, Star, TrendingUp, 
  User, ChevronRight 
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import ViewTracker from "./ViewTracker";

// --- FETCH DATA ARTIKEL DAN RELATED POSTS ---
async function getPostData(slug: string) {
  const query = groq`{
    "post": *[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      body,
      excerpt,
      views,
      "mainImage": mainImage {
        asset,
        alt,
        caption
      },
      "authorName": author->name,
    },
    "popularPosts": *[_type == "post" && slug.current != $slug] | order(views desc)[0..3] {
      title,
      "slug": slug.current,
      publishedAt
    },
    "relatedPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..1] {
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }
  }`;
  
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

// --- SEO & METADATA DYNAMIC ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPostData(params.slug);
  if (!data?.post) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${data.post.title} - Farhan Aqiqah`,
    description: data.post.excerpt,
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt,
      url: `https://jasaqiqah.my.id/blog/${params.slug}`,
      images: data.post.mainImage ? [{ url: urlFor(data.post.mainImage).url() }] : [],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { post, popularPosts, relatedPosts } = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-white min-h-screen pb-24">
      <ViewTracker slug={params.slug} />
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-40 pb-16 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/images/pattern-gold.png')] bg-repeat" style={{ backgroundSize: '400px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-primary/40 to-primary pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-8 text-accent/80 font-black text-[10px] uppercase tracking-[0.2em]">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/60">Artikel</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-10 max-w-4xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-y-6 gap-x-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                <User size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Penulis</p>
                <p className="text-sm font-bold text-white">{post.authorName || "Admin Farhan Aqiqah"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Calendar size={16} className="text-accent" />
              <span className="text-xs font-bold tracking-tight">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Eye size={16} className="text-accent" />
              <span className="text-xs font-bold tracking-tight">{(post.views || 0).toLocaleString('id-ID')} Views</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <article className="lg:col-span-8">
            {/* THUMBNAIL UTAMA */}
            {post.mainImage && (
              <div className="mb-12">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="aspect-video relative">
                    <Image 
                      src={urlFor(post.mainImage).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                {post.mainImage.caption && (
                  <p className="text-center text-sm italic text-gray-400 mt-4">{post.mainImage.caption}</p>
                )}
              </div>
            )}

            {/* ISI ARTIKEL */}
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed prose-headings:text-primary prose-headings:font-black prose-strong:text-primary prose-img:rounded-2xl">
              <PortableText value={post.body} />
            </div>

            {/* RELATED POSTS SECTION */}
            {relatedPosts?.length > 0 && (
              <div className="mt-20 pt-16 border-t border-gray-100">
                <h4 className="text-xl font-black text-primary mb-8 uppercase tracking-tighter">Artikel Terkait</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((rel: any, i: number) => (
                    <Link key={i} href={`/blog/${rel.slug}`} className="group block">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">
                        {rel.imageUrl && <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <h5 className="font-bold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">{rel.title}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            {/* Widget: Ikuti Kami */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b pb-4">Ikuti Kami</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="#" className="flex flex-col items-center gap-2 py-5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 transition-all group">
                  <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Facebook</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-2 py-5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-pink-600 transition-all group">
                  <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Instagram</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-2 py-5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all group">
                  <TrendingUp size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">TikTok</span>
                </Link>
                <Link href="https://wa.me/62895324383400" className="flex flex-col items-center gap-2 py-5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-green-600 transition-all group">
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">WhatsApp</span>
                </Link>
              </div>
            </div>

            {/* Widget: Terpopuler */}
            {popularPosts?.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b pb-4">Terpopuler</h4>
                <div className="space-y-6">
                  {popularPosts.map((pop: any, i: number) => (
                    <Link key={i} href={`/blog/${pop.slug}`} className="group block">
                      <p className="text-[9px] font-bold text-accent uppercase mb-1">
                        {new Date(pop.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <h5 className="font-bold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">{pop.title}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}