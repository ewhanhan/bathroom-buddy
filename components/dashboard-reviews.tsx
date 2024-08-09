import type { ReviewWithPhotosPayload } from '@/types/api'
import { WashroomCard } from '@/components/washroom-review-card'

export function Dashboard({
  reviews,
}: {
  reviews: ReviewWithPhotosPayload[]
}) {
  return (
    <section className="mx-auto h-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {reviews.length > 0
        ? (
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map(washroom => (
                <article key={washroom.id}>
                  <WashroomCard
                    cleanliness={washroom.cleanliness}
                    description={washroom.comments ?? ''}
                    photos={washroom.photos}
                    rating={washroom.rating}
                    title={washroom.washroomName}
                  />
                </article>
              ))}
            </section>
          )
        : (
            <section className="flex size-full flex-col items-center justify-center py-20 text-center text-gray-600 dark:text-gray-400">
              <p className="text-xl font-medium">No reviews yet.</p>
              <p className="mt-2 text-sm">Check back later for updates.</p>
            </section>
          )}
    </section>
  )
}
