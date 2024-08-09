import type { Prisma } from '@prisma/client'

export type ReviewWithPhotosPayload = Prisma.WashroomReviewGetPayload<{
  include: { photos: true }
}>
