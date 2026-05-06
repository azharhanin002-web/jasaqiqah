import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET() {
  const baseUrl = 'https://www.jasaqiqah.my.id';

  // 1. Ambil data blog dari Sanity
  const query = groq`*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(query);

  const staticUrls = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/aqiqah-purwokerto', priority: '0.9', changefreq: 'weekly' },
    { url: '/aqiqah-banyumas', priority: '0.9', changefreq: 'weekly' },
    { url: '/aqiqah-purbalingga', priority: '0.9', changefreq: 'weekly' },
    { url: '/paket-aqiqah-murah', priority: '0.9', changefreq: 'weekly' },
    { url: '/paket-harga', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ];

  // 2. Susun XML String
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls.map(item => `
        <url>
          <loc>${baseUrl}${item.url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${item.changefreq}</changefreq>
          <priority>${item.priority}</priority>
        </url>
      `).join('')}
      ${posts.map((post: any) => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  // 3. Return dengan Header XML yang tegas
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}