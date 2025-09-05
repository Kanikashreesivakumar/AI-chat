import type { Metadata } from 'next'
// import { GeistMono } from 'geist/font/mono'
// If you want to use GeistSans, import it from @geist-ui/react or use a Google Fonts alternative

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI CHAT',

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
