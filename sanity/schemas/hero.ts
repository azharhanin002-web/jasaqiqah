import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama (H1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sub Judul',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Teks Tombol WA',
      type: 'string',
    }),
  ],
})