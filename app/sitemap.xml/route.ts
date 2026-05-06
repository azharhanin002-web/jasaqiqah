import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = 'https://www.jasaqiqah.my.id';

  // Fetching data dari Sanity
  let posts = [];
  try {
    const query = groq`*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`;
    posts = await client.fetch(query);
  } catch (error) {
    console.error("Gagal load Sanity di Sitemap:", error);
  }

  // List URL Statis Abah
  const staticUrls = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/aqiqah-purwokerto', priority: '0.9', changefreq: 'weekly' },
    { url: '/aqiqah-banyumas', priority: '0.9', changefreq: 'weekly' },
    { url: '/aqiqah-purbalingga', priority: '0.9', changefreq: 'weekly' },
    { url: '/paket-aqiqah-murah', priority: '0.9', changefreq: 'weekly' },
    { url: '/paket-harga', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ];

  // Susun XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.map(item => `
  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('')}
  ${posts.map((post: any) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  // MENGGUNAKAN NEXTRESPONSE (Sangat Penting)
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Tambahkan instruksi ini agar Cache tidak "membeku"
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate',
    },
  });
}