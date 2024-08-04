'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, APIProvider as GoogleMapsProvider, Map, MapControl, Marker } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { RiCamera2Fill } from 'react-icons/ri'
import { LoadingSpinner } from './loading-spinner'
import { Button } from './ui/button'
import { logger } from '@/lib/logger'
import { useGeolocationPermission } from '@/hooks/useGeolocationPermission'
import { UNION_STATION } from '@/constant/map'

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
} satisfies PositionOptions

export function ClientMap() {
  const { permissionState } = useGeolocationPermission()
  const { loading: isLoadingGeolocation, latitude, longitude } = useGeolocation(geolocationOptions)
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({
    lat: latitude ?? UNION_STATION.lat,
    lng: longitude ?? UNION_STATION.lng,
  })

  useEffect(() => {
    if (isLoadingGeolocation || latitude === null || longitude === null) {
      return
    }

    if (latitude !== null && longitude !== null) {
      logger({ latitude, longitude }, 'Geolocation updated')
      setUserLocation({
        lat: latitude,
        lng: longitude,
      })
    }
  }, [isLoadingGeolocation, latitude, longitude, permissionState])

  if (isLoadingGeolocation) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size={64} />
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col gap-4">
      <GoogleMapsProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        authReferrerPolicy="origin"
      >
        <Map
          className="size-full"
          defaultCenter={userLocation}
          defaultZoom={17}
          fullscreenControl={false}
          mapTypeControl={false}
          reuseMaps
          streetViewControl={false}
          zoomControlOptions={
            {
              position: ControlPosition.RIGHT_BOTTOM,
            }
          }
        >
          <MapControl position={ControlPosition.RIGHT_BOTTOM}>
            <div className="mb-5 mr-3 flex">
              <Button
                aria-label="Open menu"
                className="bg-gray-200 transition-colors duration-200 hover:bg-gray-300 active:bg-gray-400"
                size="icon"
                variant="ghost"
              >
                <RiCamera2Fill size={50} />
              </Button>
            </div>
          </MapControl>
          <Marker position={userLocation} />
        </Map>
      </GoogleMapsProvider>
    </div>
  )
}
