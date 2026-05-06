import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Maksa agar file ini selalu di-generate ulang
export const revalidate = 0; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.jasaqiqah.my.id';

  // Ambil data Sanity
  const posts = await client.fetch(groq`*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`);

  const blogEntries = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/aqiqah-purwokerto`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/aqiqah-banyumas`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/aqiqah-purbalingga`, lastModified: new Date(), priority: 0.9 },
    ...blogEntries,
  ];
}