'use server'

import { errorLogger } from '@/lib/logger'
import type { ReviewWithPhotosPayload } from '@/types/api'

export async function getWashroomReviewsWithPhotos(): Promise<ReviewWithPhotosPayload[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews`, {
      next: {
        revalidate: 60,
      },
    })
    if (!res.ok) {
      errorLogger(res, 'Error fetching washroom reviews')
      return []
    }
    const posts = await res.json()

    return posts satisfies ReviewWithPhotosPayload[]
  }
  catch (error) {
    errorLogger(error, 'Error fetching washroom reviews')
    return []
  }
}
