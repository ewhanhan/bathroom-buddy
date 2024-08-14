import { getWashroomReviewsWithPhotos } from '@/app/dashboard/actions'
import { Dashboard } from '@/components/dashboard-reviews'

export default async function Index() {
  const washroomReviews = await getWashroomReviewsWithPhotos()
  return <Dashboard reviews={washroomReviews} />
}
