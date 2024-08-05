'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, APIProvider as GoogleMapsProvider, Map, MapControl, Marker } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import { RiCamera2Fill } from 'react-icons/ri'
import { FullPageLoadingSpinner } from './loading-spinner'
import { ReviewDialog } from './review-dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current!.click()
  }
  const [imageUrl, setImageUrl] = useState('')

  const handleCapture = (target: EventTarget & HTMLInputElement) => {
    if (target.files?.length) {
      const file = target.files[0] as Blob

      if (file.type.startsWith('image/')) {
        const newUrl = URL.createObjectURL(file)

        // Revoke the previous URL if it exists to avoid memory leaks
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl)
        }

        setImageUrl(newUrl)
      }
      else {
        console.error('The selected file is not an image.')
      }
    }
  }

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
            <div className="mb-5 mr-3 flex">
              <Input
                ref={fileInputRef}
                accept="image/*"
                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={e => handleCapture(e.target)}
                className="hidden"
              />
              <Button
                aria-label="Open menu"
                className="bg-white transition-colors duration-200 hover:bg-gray-300 active:bg-gray-400"
                size="icon"
                variant="ghost"
                onClick={handleButtonClick}
              >
                <RiCamera2Fill size={50} />
              </Button>
            </div>
          </MapControl>
          <Marker position={userLocation} />
        </Map>
      </GoogleMapsProvider>
      <ReviewDialog imageUrl={imageUrl} setSource={setImageUrl} />
    </div>
  )
}
