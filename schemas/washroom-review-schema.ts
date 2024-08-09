import { z } from 'zod'

export const ReviewFormSchema = z.object({
  cleanliness: z.coerce.number().min(0).max(5),
  comments: z.string(),
  rating: z.coerce.number().min(0).max(5),
  userId: z.string().uuid().optional(),
  washroomName: z.string(),
})

export const ReviewWithPhotosSchema = ReviewFormSchema.extend({
  imageUrls: z.array(z.string().url()),
})

export const DeleteReviewSchema = z.object({
  id: z.string().uuid(),
})
