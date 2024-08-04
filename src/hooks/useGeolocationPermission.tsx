import { useCallback, useEffect, useState } from 'react'

export type GeolocationPermissionState = 'granted' | 'prompt' | 'denied' | 'unknown'

export function useGeolocationPermission() {
  const [permissionState, setPermissionState] = useState<GeolocationPermissionState>('unknown')

  const handlePermissionChange = useCallback((result: PermissionStatus) => {
    setPermissionState(result.state)
  }, [])

  const checkPermission = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      handlePermissionChange(result)

      const handleChange = () => handlePermissionChange(result)
      result.addEventListener('change', handleChange)

      return () => {
        result.removeEventListener('change', handleChange)
      }
    }
    catch (error) {
      console.error('Failed to query geolocation permission:', error)
    }
  }, [handlePermissionChange])

  useEffect(() => {
    const cleanup = checkPermission()
    return () => {
      if (cleanup instanceof Function) {
        cleanup()
      }
    }
  }, [checkPermission])

  return { checkPermission, permissionState } as const
}
