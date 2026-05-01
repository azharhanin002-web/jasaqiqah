// app/(marketing)/kontak/page.tsx
export const metadata = {
  title: 'Kontak Kami',
  description: 'Hubungi Jasa Aqiqah Amanah untuk konsultasi gratis mengenai paket aqiqah putra-putri Anda.',
};

export default function KontakPage() {
  return (
    <main className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Hubungi Kami</h1>
          <p className="mt-4 text-gray-600 text-lg">Kami siap membantu Ayah & Bunda kapan saja.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Detail */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Lokasi Kami</h3>
                <p className="text-gray-600">Jl. Raya Kebahagiaan No. 45, Purwokerto</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Jam Operasional</h3>
                <p className="text-gray-600">Senin - Minggu: 08.00 - 20.00 WIB</p>
              </div>
            </div>
          </div>

          {/* Map / Image Placeholder */}
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Embed Google Maps di Sini</p>
          </div>
        </div>
      </div>
    </main>
  );
}