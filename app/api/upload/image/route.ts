import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cloudinary } from '@/cloudinary'
import { errorLogger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const { paramsToSign } = await request.json()

    if (!paramsToSign) {
      return NextResponse.json({
        error: {
          code: 'MISSING_PARAMS',
          message: 'paramsToSign is required.',
        },
      }, {
        status: 400,
      })
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!apiSecret) {
      return NextResponse.json({
        error: {
          code: 'CONFIG_ERROR',
          message: 'Cloudinary API secret is not configured.',
        },
      }, {
        status: 500,
      })
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret)

    return NextResponse.json({ signature })
  }
  catch (error) {
    errorLogger(error, 'Error generating Cloudinary signature:')
    return NextResponse.json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred while generating the Cloudinary signature.',
      },
    }, {
      status: 500,
    })
  }
}
