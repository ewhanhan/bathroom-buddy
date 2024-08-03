'use client'

import React from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useGeolocation } from '@uidotdev/usehooks'
import { logger } from '@/lib/logger'

export function ClientMap() {
  const position = { lat: 53.54992, lng: 10.00678 }

  const state = useGeolocation()
  logger(state, 'useGeolocation')

  return (
    <div className="flex size-full flex-col gap-4">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map defaultCenter={position} defaultZoom={10} className="size-full">
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
  )
}
