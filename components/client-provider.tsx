'use client'

import { APIProvider as GoogleMapsProvider } from '@vis.gl/react-google-maps'
import { Toaster } from './ui/toaster'
import { ClientMap } from '@/components/client-map'

export function ClientProvider() {
  return (
    <>
      <GoogleMapsProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        authReferrerPolicy="origin"
        region="CA"
        language="en"
      >
        <ClientMap />
      </GoogleMapsProvider>
      <Toaster />
    </>
  )
}
