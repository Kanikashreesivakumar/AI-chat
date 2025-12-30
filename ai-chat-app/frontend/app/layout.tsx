import type { Metadata } from 'next'

 '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI CHAT BOT',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
