import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

// Solusi untuk Cloudflare: Jika variabel dari file env gagal dimuat saat build, 
// masukkan ID Proyek Sanity kamu langsung di string cadangan bawah ini.
const SANITY_PROJECT_ID = projectId || 'nr91ekf5'
const SANITY_DATASET = dataset || 'production'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: apiVersion || '2024-01-01', // Fallback apiVersion jika kosong
  useCdn: useCdn,
  perspective: 'published', // Hanya menampilkan data yang sudah di-publish (bukan draft)
})