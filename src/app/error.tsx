'use client' // Error components must be Client Components

import * as React from 'react'
import { RiAlarmWarningFill } from 'react-icons/ri'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="rounded-lg bg-white p-8 text-center shadow-lg md:p-16">
        <div className="flex flex-col items-center">
          <RiAlarmWarningFill
            size={60}
          />
          <h1 className="mt-8 text-4xl font-bold text-gray-800 md:text-6xl">
            Oops, something went wrong!
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            We are experiencing some technical issues. Please try again later.
          </p>
          <Button variant="outline" onClick={reset} className="mt-8">
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}
