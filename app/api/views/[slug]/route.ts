// 1. Paksa rute ini menjadi dinamis agar tidak error saat 'npm run build'
export const dynamic = 'force-dynamic';

import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request, 
  { params }: { params: Promise<{ slug: string }> } // Next.js 15 mewajibkan Promise untuk params
) {
  // 2. Await params sesuai standar Next.js 15
  const { slug } = await params;

  // Pastikan Token tersedia di Environment Variable
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  if (!writeToken) {
    console.error("SANITY_WRITE_TOKEN is missing");
    return NextResponse.json({ error: 'Konfigurasi server tidak lengkap' }, { status: 500 });
  }

  try {
    // 3. Gunakan setIfMissing agar tidak error jika field 'views' belum ada di dokumen
    const result = await client
      .withConfig({ 
        token: writeToken,
        useCdn: false // Wajib false untuk operasi Write/Patch
      })
      .patch({ query: `*[_type == "post" && slug.current == $slug][0]`, params: { slug } })
      .setIfMissing({ views: 0 }) 
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ 
      success: true,
      views: result.views 
    });
  } catch (error) {
    console.error('Gagal update view:', error);
    return NextResponse.json({ error: 'Gagal memperbarui jumlah tayangan' }, { status: 500 });
  }
}