import '@/app/globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { inter } from '@/components/ui/fonts'
import { ClientProviders } from '@/components/client-providers'

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
        <ClientProviders>
          <main className="flex h-dvh w-screen flex-col antialiased">
            <Header />
            {children}
            <Toaster />
          </main>
        </ClientProviders>
        <Analytics mode="production" />
        <SpeedInsights />
      </body>
    </html>
  )
}
