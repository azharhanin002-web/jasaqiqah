// app/(site)/blog/[slug]/ViewTracker.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function ViewTracker({ slug }: { slug: string }) {
  // Gunakan ref untuk mencegah double request dalam mode StrictMode React
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      
      // Kirim data slug ke API yang sudah kita buat
      fetch('/api/views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });
    }
  }, [slug]);

  // Komponen ini tidak me-render UI apapun
  return null; 
}