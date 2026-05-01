import { client } from '@/sanity/lib/client'; // Sesuaikan path client Anda
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    // Gunakan patch untuk menambah nilai view secara atomik (+1)
    const result = await client
      .withConfig({ token: process.env.SANITY_WRITE_TOKEN }) // Butuh Write Token
      .patch({ query: `*[_type == "post" && slug.current == $slug][0]`, params: { slug } })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ views: result.views });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update view' }, { status: 500 });
  }
}