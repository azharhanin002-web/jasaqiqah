import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimony',
  title: 'Testimoni',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Pelanggan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Status (Contoh: Ayah di Purwokerto)',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Isi Testimoni',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Foto Pelanggan',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})