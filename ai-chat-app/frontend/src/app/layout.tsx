import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Chat Assistant',
  description: 'Voice and text AI chat application with long-term memory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white antialiased">
        <div className="min-h-screen bg-black/20 backdrop-blur-sm">
          {children}
        </div>
      </body>
    </html>
  );
}