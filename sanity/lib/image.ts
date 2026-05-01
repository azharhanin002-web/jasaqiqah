import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * Fungsi untuk menghasilkan URL gambar Sanity.
 * Menggunakan .image() sebagai metode standar.
 */
export const urlFor = (source: Image) => {
  return imageBuilder.image(source)
}