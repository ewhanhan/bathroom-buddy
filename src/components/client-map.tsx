'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, APIProvider as GoogleMapsProvider, Map, MapControl, Marker } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { ControlPanel } from './control-panel'
import { logger } from '@/lib/logger'
import { useGeolocationPermission } from '@/hooks/useGeolocationPermission'
import { UNION_STATION } from '@/constant/map'

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000,
} satisfies PositionOptions

export function ClientMap() {
  const { permissionState } = useGeolocationPermission()
  const { latitude, loading: isLoadingGeolocation, longitude } = useGeolocation(geolocationOptions)
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)

  useEffect(() => {
    if (isLoadingGeolocation) {
      return
    }

    if (latitude && longitude) {
      logger({ latitude, longitude }, 'Geolocation updated')
      setUserLocation({
        lat: latitude,
        lng: longitude,
      })
    }
  }, [isLoadingGeolocation, latitude, longitude, permissionState])

  return (
    <div className="flex size-full flex-col gap-4">
      <GoogleMapsProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        authReferrerPolicy="origin"
      >
        <Map
          className="size-full"
          defaultCenter={UNION_STATION}
          center={userLocation}
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
          gestureHandling="greedy"
        >
          <MapControl position={ControlPosition.RIGHT_BOTTOM}>
            <ControlPanel />
          </MapControl>
          <Marker position={userLocation} />
        </Map>
      </GoogleMapsProvider>
    </div>
  )
}
