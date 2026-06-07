import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funtush',
  description: 'Book authentic trekking and travel experiences across Nepal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
