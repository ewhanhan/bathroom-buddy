import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MapLoadingSkeleton() {
  return (
    <div className="flex size-full flex-col p-4">
      <div className="mb-4 flex grow flex-col justify-between">
        <div className="flex justify-between space-x-3">
          <Skeleton className="h-12 w-2/3 animate-pulse rounded-lg bg-gradient-to-r from-gray-300 to-gray-200" />
          <Skeleton className="h-12 w-1/4 animate-pulse rounded-lg bg-gradient-to-r from-gray-300 to-gray-200" />
        </div>
      </div>
      <Skeleton className="mb-4 size-full animate-pulse rounded-lg bg-gradient-to-r from-gray-300 to-gray-200" />
    </div>
  )
}
