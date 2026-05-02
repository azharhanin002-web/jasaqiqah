// app/(site)/blog/[slug]/ViewTracker.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function ViewTracker({ slug }: { slug: string }) {
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      
      // PERBAIKAN: Kirim slug lewat URL agar terbaca oleh 'params' di API
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      }).catch((err) => console.error("Error tracking view:", err));
    }
  }, [slug]);

  return null; 
}