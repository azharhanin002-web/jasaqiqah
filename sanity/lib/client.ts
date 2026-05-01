import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published', // Hanya menampilkan data yang sudah di-publish (bukan draft)
})