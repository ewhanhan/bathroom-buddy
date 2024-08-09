import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { Photo } from '@prisma/client'
import { logger } from '@/lib/logger'
import prisma from '@/db'

const reviewFormSchema = z.object({
  cleanliness: z.coerce.number().min(0).max(5),
  comments: z.string(),
  imageUrls: z.array(z.string()),
  rating: z.coerce.number().min(0).max(5),
  washroomName: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    logger(req, 'Request body')
    const data = reviewFormSchema.parse(body)

    const dbResponse = await prisma.washroomReview.create({
      data: {
        cleanliness: data.cleanliness,
        comments: data.comments,
        rating: data.rating,
        washroomName: data.washroomName ?? '',
      },
    })

    let photoPromises: Photo[] = []

    if (dbResponse.id) {
      try {
        photoPromises = await Promise.all(
          data.imageUrls.map(imageUrl =>
            prisma.photo.create({
              data: {
                url: imageUrl,
                washroomReviewId: dbResponse.id,
              },
            }),
          ),
        )
      }
      catch (error) {
        console.error('Error creating photos:', error)
        throw new Error('Failed to create photos')
      }
    }
    return NextResponse.json({
      data: {
        ...dbResponse,
        photo: photoPromises,
      },
      message: 'Form submitted successfully',
      status: 'success',
    }, { status: 201 }) // Use HTTP 201 Created status code for resource creation
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation error response
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }
    else {
      // Send generic error response
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
  }
}

export async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req)
  }
  else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }
}
