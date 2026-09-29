import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Funtush — Trekking in Nepal',
    template: '%s | Funtush',
  },
  description: 'Book authentic trekking and travel experiences across Nepal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
