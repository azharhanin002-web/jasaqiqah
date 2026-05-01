'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';
import { useEffect, useState } from 'react';

export default function StudioPage() {
  // State untuk memastikan komponen hanya dirender di client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum mounted (masih di server), jangan render apa-apa
  if (!mounted) return null;

  return <NextStudio config={config} />;
}