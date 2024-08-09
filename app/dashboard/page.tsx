import { Dashboard } from '@/components/dashboard-reviews'
import { logger } from '@/lib/logger'
import type { ReviewWithPhotosPayload } from '@/types/api'

async function getWashroomReviewsWithPhotos() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews`, {
      next: {
        revalidate: 60,
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch washroom reviews: ${res.statusText}`)
    }
    const posts = await res.json()

    return posts as ReviewWithPhotosPayload[]
  }
  catch (error) {
    logger(error, 'Error fetching washroom reviews')
    throw error
  }
}

export default async function Index() {
  const washroomReviews = await getWashroomReviewsWithPhotos()
  return <Dashboard reviews={washroomReviews} />
}
