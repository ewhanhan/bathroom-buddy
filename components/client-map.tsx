'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, Map, MapControl, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { ControlPanel } from '@/components/control-panel'
import { ToiletMarker } from '@/components/custom-pins'
import { UNION_STATION } from '@/constant/map'
import { useGeolocationPermission } from '@/hooks/useGeolocationPermission'
import { errorLogger, logger } from '@/lib/logger'

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
} satisfies PositionOptions

export function ClientMap() {
  const map = useMap()
  const { permissionState } = useGeolocationPermission()
  const { error, latitude, loading: isLoadingGeolocation, longitude } = useGeolocation(geolocationOptions)
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
  }, [isLoadingGeolocation, latitude, longitude, permissionState])

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

  if (error) {
    errorLogger(error, 'Geolocation error')
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
        <ControlPanel />
      </MapControl>
      {/* {userLocation && <UserMarker position={userLocation} />} */}
      {userLocation && <ToiletMarker position={userLocation} />}
    </Map>
  )
}
