import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flux Image Generator',
  description: 'Generate images using Flux API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
