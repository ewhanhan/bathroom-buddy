'use client'

import { APIProvider as GoogleMapsProvider } from '@vis.gl/react-google-maps'
import { Toaster } from './ui/toaster'
import { QueryProvider } from '@/lib/react-query'

export function ClientProviders({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <GoogleMapsProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        authReferrerPolicy="origin"
        region="CA"
        language="en"
      >
        {children}
      </GoogleMapsProvider>
      <Toaster />
    </QueryProvider>
  )
}
