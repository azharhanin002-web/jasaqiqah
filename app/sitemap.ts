import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// 1. Tipe Data Modern: Mencegah error 'any' dan membuat kode lebih stabil
interface SanityPost {
  slug: string;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.jasaqiqah.my.id';

  // 2. Error Handling & Fetching dari Sanity
  let posts: SanityPost[] = [];
  try {
    // Hanya ambil post yang punya slug (mencegah error draft kosong)
    const query = groq`*[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`;
    
    posts = await client.fetch(query, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error("Gagal mengambil data blog untuk sitemap:", error);
    // Jika gagal, sitemap tetap jalan tanpa data blog (tidak bikin web crash)
  }

  // 3. Pemetaan Artikel Dinamis (Prioritas 0.7)
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Daftar Halaman Statis FULL SEO LOKAL (Ladang Konversi)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Homepage wajib prioritas tertinggi
    },
    {
      url: `${baseUrl}/aqiqah-purwokerto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Halaman wilayah sangat penting untuk SEO Lokal
    },
    {
      url: `${baseUrl}/aqiqah-banyumas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aqiqah-purbalingga`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/paket-aqiqah-murah`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // Artikel Pilar
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
      changeFrequency: 'daily',
      priority: 0.8, // Halaman daftar blog (harus sering dirayapi)
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5, // Halaman statis yang jarang berubah
    },
  ];

  // 5. Gabungkan rute statis dan dinamis dengan rapi
  return [...staticRoutes, ...postEntries];
}