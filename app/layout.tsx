import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Bathroom Buddy is your personal restroom companion, helping you find, review, and share clean and accessible restrooms in your area.',
  icons: {
    apple: '/favicon/apple-touch-icon.png',
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
  },
  manifest: `/favicon/site.webmanifest`,
  robots: {
    follow: true,
    index: true,
  },
  title: 'Bathroom Buddy - Find and Review Restrooms Near You',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-dvh w-screen flex-col antialiased">
          <Header />
          {children}
          <Analytics mode="production" />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
