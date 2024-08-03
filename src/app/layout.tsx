import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bathroom Buddy - Find and Review Restrooms Near You',
  description: 'Bathroom Buddy is your personal restroom companion, helping you find, review, and share clean and accessible restrooms in your area.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" flex h-screen w-screen flex-col antialiased">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
