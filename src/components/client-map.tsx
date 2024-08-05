'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, APIProvider as GoogleMapsProvider, Map, MapControl, Marker } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { RiCamera2Fill } from 'react-icons/ri'
import { CldUploadButton } from 'next-cloudinary'
import { FullPageLoadingSpinner } from './loading-spinner'
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
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>({
    lat: latitude ?? UNION_STATION.lat,
    lng: longitude ?? UNION_STATION.lng,
  })

  useEffect(() => {
    if (isLoadingGeolocation || latitude === null || longitude === null) {
      return
    }

    logger({ latitude, longitude }, 'Geolocation updated')
    setUserLocation({
      lat: latitude,
      lng: longitude,
    })
  }, [isLoadingGeolocation, latitude, longitude, permissionState])

  if (isLoadingGeolocation) {
    return (
      <FullPageLoadingSpinner />
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
            <div className="mb-5 mr-2 flex">
              <CldUploadButton
                uploadPreset="bathroom-buddy"
                signatureEndpoint="/api/upload/image"
                options={{
                  clientAllowedFormats: ['images'],
                  maxFiles: 5,
                  multiple: true,
                  sources: ['local', 'camera'],
                }}
                onSuccess={(results) => {
                  logger(results, 'Upload results')
                }}
              >
                <RiCamera2Fill size={50} />
              </CldUploadButton>
            </div>
          </MapControl>
          <Marker position={userLocation} />
        </Map>
      </GoogleMapsProvider>
    </div>
  )
}
