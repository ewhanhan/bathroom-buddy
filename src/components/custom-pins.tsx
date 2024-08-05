import { AdvancedMarker, Marker } from '@vis.gl/react-google-maps'
import { RiAccountPinCircleFill } from 'react-icons/ri'
import { logger } from '@/lib/logger'

export function UserMarker({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  return (
    <AdvancedMarker position={position} title="you">
      <RiAccountPinCircleFill size={64} />
    </AdvancedMarker>
  )
}

export function ToiletMarker({
  position,
}: {
  position: google.maps.LatLngLiteral
}) {
  return (
    <Marker
      position={position}
      label={
        {
          color: 'black',
          fontSize: '1rem',
          text: '🚽',
        }
      }
      clickable
      onClick={(e) => {
        logger(e, 'ToiletMarker clicked')
      }}
    >
    </Marker>
  )
}
