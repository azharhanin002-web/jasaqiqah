export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// Gunakan 'false' agar saat kita update data di Sanity, website langsung berubah
// (Karena kita sudah pakai next: { revalidate: 60 } di page.tsx)
export const useCdn = false