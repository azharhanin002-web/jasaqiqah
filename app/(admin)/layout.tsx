export const metadata = {
  title: 'Farhan Aqiqah - Content Manager',
  description: 'Area khusus pengelolaan konten Farhan Aqiqah Purwokerto',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}