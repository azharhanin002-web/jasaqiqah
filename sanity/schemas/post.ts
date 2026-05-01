import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artikel Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Judul artikel wajib diisi.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { 
        source: 'title', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
      description: 'Ini akan menjadi URL artikel Anda. Klik "Generate" setelah mengisi Judul.',
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: { type: 'author' },
    }),
    
    // --- PEMBARUAN: MAIN IMAGE DENGAN ALT & CAPTION ---
    defineField({
      name: 'mainImage',
      title: 'Thumbnail Utama',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error('Thumbnail wajib ada untuk SEO dan Tampilan Depan.'),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Alt Text)',
          description: 'Sangat penting untuk SEO dan tunanetra. Deskripsikan apa yang ada di gambar secara singkat.',
          validation: (Rule) => Rule.required().warning('Sebaiknya isi Alt Text untuk kebaikan SEO Farhan Aqiqah.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption Gambar (Opsional)',
          description: 'Teks kecil yang akan muncul di bawah gambar (jika tema mendukung).',
        }
      ]
    }),

    defineField({
      name: 'categories',
      title: 'Kategori',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(), // Otomatis terisi waktu saat ini
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Pendek (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'Muncul di halaman depan daftar blog dan saat artikel di-share ke WhatsApp/Facebook.',
      validation: (Rule) => Rule.required().max(200).error('Ringkasan maksimal 200 karakter.'),
    }),
    
    // --- PEMBARUAN: BODY DENGAN IMAGE ALT TEXT ---
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        { type: 'block' }, 
        // Gambar yang disisipkan di tengah paragraf
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text (Penting untuk SEO)',
              options: { isHighlighted: true }, // Muncul langsung saat gambar di-klik di editor
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: { isHighlighted: true },
            }
          ]
        }
      ],
    }),

    // --- PEMBARUAN: VIEWS SUNGGUHAN ---
    defineField({
      name: 'views',
      title: 'Total Views (Real Data)',
      type: 'number',
      description: 'Data trafik pembaca yang masuk secara otomatis. Tidak disarankan untuk diubah manual.',
      initialValue: 0,
      readOnly: true, // Kunci field ini agar aman dari perubahan manual editor
    }),
  ],

  // --- PREVIEW CUSTOMIZATION (Bonus) ---
  // Ini membuat tampilan daftar artikel di dashboard Sanity Anda lebih rapi
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      views: 'views',
    },
    prepare(selection) {
      const { author, views } = selection
      return {
        ...selection,
        subtitle: author && views !== undefined 
          ? `Oleh: ${author} | 👁️ ${views} kali dilihat` 
          : author ? `Oleh: ${author}` : 'Penulis belum diisi',
      }
    },
  },
})