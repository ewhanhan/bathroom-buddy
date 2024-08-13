'use client' // Error components must be Client Components

import React from 'react'
import { Warning } from '@phosphor-icons/react/Warning'
import { Button } from '@/components/ui/button'
import { errorLogger } from '@/lib/logger'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    errorLogger(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="rounded-lg bg-white p-8 text-center shadow-lg md:p-16">
        <div className="flex flex-col items-center">
          <Warning
            size={64}
          />
          <h1 className="mt-8 text-4xl font-bold text-gray-800 md:text-6xl">
            Oops, something went wrong!
          </h1>
          <Button variant="outline" onClick={reset} className="mt-8">
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}
