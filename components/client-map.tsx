'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, Map, MapControl, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ToiletMarker } from '@/components/custom-pins'
import { UNION_STATION } from '@/constant/map'
import { errorLogger, logger } from '@/lib/logger'

const DynamicControlPanel = dynamic(() => import('./control-panel').then(mod => mod.ControlPanel))

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
} satisfies PositionOptions

export function ClientMap() {
  const map = useMap()
  const { error: geolocationError, latitude, loading: isLoadingGeolocation, longitude } = useGeolocation(geolocationOptions)
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)

  useEffect(() => {
    if (latitude && longitude) {
      logger({
        latitude,
        longitude,
      }, 'Geolocation updated')

      setUserLocation({
        lat: latitude,
        lng: longitude,
      })
    }
  }, [isLoadingGeolocation, latitude, longitude])

  useEffect(() => {
    if (!map) {
      return
    }

    if (!userLocation) {
      return
    }

    logger({ userLocation }, 'Pan to user location')
    map.panTo(userLocation)
  }, [map, userLocation])

  if (geolocationError) {
    errorLogger(geolocationError, 'Geolocation error')
    throw new Error('Geolocation error')
  }

  return (
    <Map
      className="size-full"
      defaultCenter={UNION_STATION}
      defaultZoom={17}
      fullscreenControl={false}
      mapTypeControl={false}
      reuseMaps
      streetViewControl={false}
      zoomControlOptions={
        { position: ControlPosition.RIGHT_BOTTOM }
      }
      gestureHandling="greedy"
    >
      <MapControl position={ControlPosition.RIGHT_BOTTOM}>
        <DynamicControlPanel />
      </MapControl>
      {userLocation && <ToiletMarker position={userLocation} />}
    </Map>
  )
}
