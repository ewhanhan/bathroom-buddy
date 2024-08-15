import React from 'react'

export default function LoadingComponent() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-200 opacity-75"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      aria-label="Loading"
    >
      <div
        className="size-8 animate-spin rounded-full border-4 border-blue-500"
        role="status"
        aria-label="Loading spinner"
      >
      </div>
    </div>
  )
}
