'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { APIProvider as GoogleMapsProvider, Map, Marker } from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from './loading-spinner'
import { logger } from '@/lib/logger'
import { UNION_STATION } from '@/constant/map'

export function ClientMap() {
  const { loading: isLoadingGeolocation, ...rest } = useGeolocation({ enableHighAccuracy: true, timeout: Infinity })
  const { latitude, longitude } = rest
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({ lat: latitude ?? UNION_STATION.lat, lng: longitude ?? UNION_STATION.lng })

  useEffect(() => {
    setUserLocation({
      lat: latitude ?? UNION_STATION.lat,
      lng: longitude ?? UNION_STATION.lng,
    })
  }, [latitude, longitude])

  if (isLoadingGeolocation) {
    logger('Loading geolocation...')
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size={64} />
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col gap-4">
      <GoogleMapsProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map defaultCenter={userLocation} defaultZoom={17} className="size-full">
          <Marker position={userLocation} />
        </Map>
      </GoogleMapsProvider>
    </div>
  )
}
