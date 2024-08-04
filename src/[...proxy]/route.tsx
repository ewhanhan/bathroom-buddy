/* eslint-disable react-refresh/only-export-components */
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Review if we need this, and why
function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers)
  responseHeaders.delete('content-encoding')

  return new Response(result.body, {
    headers: responseHeaders,
    status: result.status,
    statusText: result.statusText,
  })
}

async function handler(request: NextRequest) {
  const session = await auth()

  const headers = new Headers(request.headers)
  headers.set('Authorization', `Bearer ${session?.accessToken}`)

  const backendUrl
    = process.env.THIRD_PARTY_API_EXAMPLE_BACKEND
    ?? 'https://authjs-third-party-backend.authjs.dev'

  const url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
  const result = await fetch(url, { body: request.body, headers })

  return stripContentEncoding(result)
}

export const dynamic = 'force-dynamic'

export { handler as GET, handler as POST }
