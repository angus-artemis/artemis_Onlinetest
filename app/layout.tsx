import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artemis - Influencer Marketing Platform',
  description: 'Connect brands with influencers for powerful marketing campaigns',
  generator: 'Artemis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
