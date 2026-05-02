import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Calendar, Eye, Facebook, Instagram, 
  MessageCircle, User, ChevronRight, TrendingUp,
  Clock, BookOpen
} from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react"; // Tambahkan PortableTextComponents
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import ViewTracker from "./ViewTracker";
import SocialShare from "@/components/SocialShare";
import BlogCTA from "@/components/BlogCTA";

// --- 1. RENDERER KHUSUS UNTUK CAPTION DI DALAM ARTIKEL ---
const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-12">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Gambar Farhan Aqiqah"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="text-center text-sm italic text-gray-400 mt-4 px-6 font-medium leading-relaxed">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

// --- HELPER: HITUNG DURASI BACA ---
const calculateReadingTime = (body: any[]) => {
  if (!body) return 0;
  const words = body.reduce((acc, block) => {
    if (block._type === 'block') {
      return acc + block.children.reduce((cAcc: number, child: any) => cAcc + (child.text?.split(/\s+/)?.length || 0), 0);
    }
    return acc;
  }, 0);
  return Math.ceil(words / 200); 
};

// --- HELPER YOUTUBE ---
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getYouTubeThumbnail = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// --- FETCH DATA ---
async function getPostData(slug: string) {
  const query = groq`{
    "post": *[_type == "post" && slug.current == $slug][0] {
      title, publishedAt, body, excerpt, views, youtubeUrl,
      "mainImage": mainImage { asset, alt, caption },
      "authorName": author->name,
    },
    "popularPosts": *[_type == "post" && slug.current != $slug] | order(views desc)[0..3] {
      title, "slug": slug.current, publishedAt, "imageUrl": mainImage.asset->url
    },
    "relatedPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..1] {
      title, "slug": slug.current, youtubeUrl, "imageUrl": mainImage.asset->url
    }
  }`;
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPostData(params.slug);
  if (!data?.post) return { title: "Artikel Tidak Ditemukan" };
  const ytThumb = data.post.youtubeUrl ? getYouTubeThumbnail(data.post.youtubeUrl) : null;
  const ogImage = data.post.mainImage ? urlFor(data.post.mainImage).url() : ytThumb;
  return {
    title: `${data.post.title} - Farhan Aqiqah`,
    description: data.post.excerpt,
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt,
      url: `https://jasaqiqah.my.id/blog/${params.slug}`,
      images: ogImage ? [{ url: ogImage }] : [],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { post, popularPosts, relatedPosts } = await getPostData(params.slug);
  if (!post) notFound();

  const youtubeId = post.youtubeUrl ? getYouTubeId(post.youtubeUrl) : null;
  const readingTime = calculateReadingTime(post.body);

  return (
    <main className="w-full bg-white min-h-screen pb-24">
      <ViewTracker slug={params.slug} />
      
      {/* 1. HERO HEADER (GRADASI MENUNJU TERANG) */}
      <section className="relative pt-40 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/images/terang.png')] bg-repeat" style={{ backgroundSize: '400px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-white/10 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-8 text-accent/80 font-black text-[10px] uppercase tracking-[0.2em]">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/60">Artikel</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-12 max-w-4xl shadow-sm">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-y-6 gap-x-6 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                <User size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-white/40 tracking-widest">Penulis</p>
                <p className="text-sm font-bold text-white">{post.authorName || "Admin"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white/70 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
              <Calendar size={14} className="text-accent" />
              <span className="text-xs font-bold">
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                <span className="mx-2 opacity-30">|</span>
                <Clock size={12} className="inline mr-1 mb-0.5 text-accent/70" />
                {new Date(post.publishedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
              </span>
            </div>

            <div className="flex items-center gap-3 text-white/70 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
              <BookOpen size={14} className="text-accent" />
              <span className="text-xs font-bold">{readingTime} Menit Baca</span>
            </div>
            
            <div className="flex items-center gap-3 text-white/70 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
              <Eye size={14} className="text-accent" />
              <span className="text-xs font-bold">{(post.views || 0).toLocaleString('id-ID')} Views</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <article className="lg:col-span-8">
            {/* THUMBNAIL UTAMA */}
            {youtubeId ? (
              <div className="mb-12">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-black">
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeId}`} frameBorder="0" allowFullScreen></iframe>
                </div>
                {post.mainImage?.caption && <p className="text-center text-sm italic text-gray-400 mt-4 font-medium">{post.mainImage.caption}</p>}
              </div>
            ) : post.mainImage ? (
              <div className="mb-12">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <Image src={urlFor(post.mainImage).url()} alt={post.mainImage.alt || post.title} fill className="object-cover" priority />
                </div>
                {post.mainImage.caption && <p className="text-center text-sm italic text-gray-400 mt-4 font-medium">{post.mainImage.caption}</p>}
              </div>
            ) : null}

            {/* ISI ARTIKEL (DENGAN RENDERER CAPTION) */}
            <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed prose-headings:text-primary prose-headings:font-black prose-strong:text-primary prose-img:rounded-2xl">
              <PortableText value={post.body} components={ptComponents} />
            </div>

            {/* KOMPONEN CTA */}
            <BlogCTA />

            <SocialShare title={post.title} slug={params.slug} />

            {/* RELATED POSTS */}
            {relatedPosts?.length > 0 && (
              <div className="mt-20 pt-10 border-t border-gray-100">
                <h4 className="text-xl font-black text-primary mb-8 uppercase tracking-tighter">Artikel Terkait</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((rel: any, i: number) => {
                    const relImg = rel.imageUrl || (rel.youtubeUrl ? getYouTubeThumbnail(rel.youtubeUrl) : null);
                    return (
                      <Link key={i} href={`/blog/${rel.slug}`} className="group block">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100 border border-gray-100">
                          {relImg && <Image src={relImg} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />}
                        </div>
                        <h5 className="font-bold text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">{rel.title}</h5>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            {/* Widget: Ikuti Kami */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <h4 className="text-xs font-black text-primary mb-6 uppercase tracking-widest border-b pb-4">Ikuti Kami</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="#" className="flex flex-col items-center gap-2 py-6 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 transition-all group">
                  <Facebook size={22} className="group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Facebook</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-2 py-6 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-pink-600 transition-all group">
                  <Instagram size={22} className="group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-2 py-6 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-black transition-all group">
                  <TrendingUp size={22} className="group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-widest">TikTok</span>
                </Link>
                <Link href="https://wa.me/62895324383400" className="flex flex-col items-center gap-2 py-6 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-green-600 transition-all group">
                  <MessageCircle size={22} className="group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                </Link>
              </div>
            </div>

            {/* Widget: Terpopuler */}
            {popularPosts?.length > 0 && (
              <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black text-primary mb-8 uppercase tracking-widest border-b pb-4">Terpopuler</h4>
                <div className="space-y-10">
                  {popularPosts.map((pop: any, i: number) => (
                    <Link key={i} href={`/blog/${pop.slug}`} className="group flex items-start gap-5">
                      <span className="text-5xl font-black text-gray-100 group-hover:text-accent/20 transition-colors leading-none pt-1">{i + 1}</span>
                      <div className="flex-1">
                        <div className="relative aspect-[4/3] w-20 rounded-xl overflow-hidden float-right ml-3 bg-gray-50 border border-gray-100 shadow-sm">
                          {pop.imageUrl && <Image src={pop.imageUrl} alt={pop.title} fill className="object-cover group-hover:scale-110 transition-transform" />}
                        </div>
                        <h5 className="font-bold text-primary group-hover:text-accent transition-colors leading-snug text-sm line-clamp-3 mb-2">{pop.title}</h5>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                          {new Date(pop.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
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