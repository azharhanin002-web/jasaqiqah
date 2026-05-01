import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeri Dokumentasi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Foto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Masakan', value: 'Masakan' },
          { title: 'Sembelih', value: 'Sembelih' },
          { title: 'Packaging', value: 'Packaging' },
          { title: 'Delivery', value: 'Delivery' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Upload Foto',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Keterangan',
      type: 'string',
    }),
  ],
})