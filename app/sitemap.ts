import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Mendefinisikan URL dasar sesuai dengan properti di GSC
  const baseUrl = 'https://www.jasaqiqah.my.id';

  // 1. Ambil semua slug postingan dari Sanity secara dinamis
  const query = groq`*[_type == "post"] { "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(query, {}, { next: { revalidate: 3600 } });

  // 2. Petakan postingan blog menjadi format sitemap
  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 3. Gabungkan rute statis dengan rute dinamis dari Sanity
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/paket-harga`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...postEntries,
  ];
}