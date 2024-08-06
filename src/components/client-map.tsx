'use client'

import { useGeolocation } from '@uidotdev/usehooks'
import { ControlPosition, Map, MapControl, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import { logger } from '@/lib/logger'
import { useGeolocationPermission } from '@/hooks/useGeolocationPermission'
import { UNION_STATION } from '@/constant/map'
import { ToiletMarker } from '@/components/custom-pins'
import { ControlPanel } from '@/components/control-panel'

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
} satisfies PositionOptions

export function ClientMap() {
  const map = useMap()
  const { permissionState } = useGeolocationPermission()
  const { latitude, loading: isLoadingGeolocation, longitude } = useGeolocation(geolocationOptions)
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
      logger('Map not ready')
      return
    }

    if (!userLocation) {
      return
    }

    logger({ userLocation }, 'Pan to user location')
    map.panTo(userLocation)
  }, [map, userLocation])

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
