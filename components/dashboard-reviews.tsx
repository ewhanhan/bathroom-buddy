import type { ReviewWithPhotosPayload } from '@/types/api'
import { WashroomCard } from '@/components/washroom-review-card'

export function Dashboard({
  reviews,
}: {
  reviews: ReviewWithPhotosPayload[]
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((washroom: any) => (
          <WashroomCard
            key={washroom.id}
            cleanliness={washroom.cleanliness}
            description={washroom.comments ?? ''}
            photos={washroom.photos}
            rating={washroom.rating}
            title={washroom.washroomName}
          />
        ))}
      </div>
    </div>
  )
}
