// lib/youtube.ts

// Fungsi untuk mengambil ID Video dari berbagai format URL YouTube
export function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Fungsi untuk mendapatkan URL Thumbnail kualitas HD
export function getYouTubeThumbnail(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}