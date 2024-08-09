import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/db'
import { DeleteReviewSchema, ReviewWithPhotosSchema } from '@/schemas/washroom-review-schema'
import { errorLogger, logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = ReviewWithPhotosSchema.parse(body)
    logger(data, 'Form data')

    const [washroomReviewResult, createdPhotosResult] = await prisma.$transaction(async (prisma) => {
      const reviewCreationResult = await prisma.washroomReview.create({
        data: {
          cleanliness: data.cleanliness,
          comments: data.comments,
          rating: data.rating,
          userId: data.userId,
          washroomName: data.washroomName,
        },
      })

      if (!reviewCreationResult.id) {
        throw new Error('Failed to create washroom review')
      }

      const reviewPhotosPromises = await Promise.all(
        data.imageUrls.map(imageUrl =>
          prisma.photo.create({
            data: {
              url: imageUrl,
              washroomReviewId: reviewCreationResult.id,
            },
          }),
        ),
      )
      return [reviewCreationResult, reviewPhotosPromises]
    })

    return NextResponse.json({
      data: {
        ...washroomReviewResult,
        photo: createdPhotosResult,
      },
      message: 'Form submitted successfully',
      status: 'success',
    }, {
      status: 201,
    })
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation error response
      return NextResponse.json({
        errors: error.errors,
      }, {
        status: 400,
      })
    }
    else {
      // Send generic error response
      return NextResponse.json({ message: 'Internal server error' }, {
        status: 500,
      })
    }
  }
}

async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const data = DeleteReviewSchema.parse(body)

    await prisma.$transaction([
      prisma.washroomReview.delete({
        where: { id: data.id },
      }),
      prisma.photo.deleteMany({
        where: { washroomReviewId: data.id },
      }),
    ])

    return NextResponse.json(null, { status: 204 })
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation error response
      return NextResponse.json({
        errors: error.errors,
      }, {
        status: 400,
      })
    }
    else {
      // Send generic error response
      return NextResponse.json({
        message: 'Internal server error',
      }, {
        status: 500,
      })
    }
  }
}

async function GET() {
  try {
    const washroomReviews = await prisma.washroomReview.findMany({
      include: {
        photos: true,
      },
    })
    logger(JSON.stringify(washroomReviews, null, 2), 'GET')

    return NextResponse.json(washroomReviews, {
      status: 200,
    })
  }
  catch (error) {
    errorLogger(error, 'Error fetching washroom reviews')

    return NextResponse.json({
      error: 'An error occurred while fetching washroom reviews',
    }, {
      status: 500,
    })
  }
}

export { POST, DELETE, GET }
