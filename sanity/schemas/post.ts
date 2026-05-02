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
    
    // --- MAIN IMAGE DENGAN ALT & CAPTION ---
    defineField({
      name: 'mainImage',
      title: 'Thumbnail Utama',
      type: 'image',
      options: { hotspot: true },
      description: 'Gunakan gambar berkualitas tinggi. Jika dikosongkan, pastikan YouTube URL terisi.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Alt Text)',
          description: 'Sangat penting untuk SEO dan aksesibilitas.',
          validation: (Rule) => Rule.required().warning('Isi Alt Text untuk SEO Farhan Aqiqah.'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption Gambar (Opsional)',
        }
      ]
    }),

    // --- FITUR BARU: YOUTUBE EMBED & THUMBNAIL ALTERNATIF ---
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL (Opsional)',
      type: 'url',
      description: 'Masukkan link video YouTube. Jika Thumbnail Utama kosong, web akan otomatis mengambil thumbnail dari video ini.',
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
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Pendek (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'Muncul di daftar blog dan preview media sosial.',
      validation: (Rule) => Rule.required().max(200).error('Ringkasan maksimal 200 karakter.'),
    }),
    
    // --- BODY DENGAN IMAGE ALT TEXT ---
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        { type: 'block' }, 
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              options: { isHighlighted: true },
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

    // --- VIEWS SUNGGUHAN ---
    defineField({
      name: 'views',
      title: 'Total Views (Real Data)',
      type: 'number',
      description: 'Data trafik pembaca otomatis.',
      initialValue: 0,
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      views: 'views',
      yt: 'youtubeUrl'
    },
    prepare(selection) {
      const { author, views, yt } = selection
      const subtitleParts = [];
      
      if (author) subtitleParts.push(`Oleh: ${author}`);
      if (views !== undefined) subtitleParts.push(`👁️ ${views}`);
      if (yt) subtitleParts.push(`🎥 Video`);

      return {
        ...selection,
        subtitle: subtitleParts.join(' | ') || 'Draft artikel'
      }
    },
  },
})