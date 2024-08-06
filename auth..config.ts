import Google from 'next-auth/providers/google'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { isLocal } from './constant/env'
import 'next-auth/jwt'
import prisma from '@/db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    user: {
      id: string
    } & DefaultSession['user']
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token: string
    error?: 'RefreshAccessTokenError'
  }
}
export default {
  callbacks: {
    async session({ session, user }) {
      const [googleAccount] = await prisma.account.findMany({
        where: { provider: 'google', userId: user.id },
      })
      if ((googleAccount?.expires_at ?? Infinity) * 1000 < Date.now() && googleAccount?.refresh_token) {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch('https://oauth2.googleapis.com/token', {
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: googleAccount.refresh_token,
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: 'POST',
          })

          const responseTokens = await response.json()

          if (!response.ok) {
            throw responseTokens
          }

          await prisma.account.update({
            data: {
              access_token: responseTokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + responseTokens.expires_in,
              ),
              refresh_token:
                responseTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          })
        }
        catch (error) {
          console.error('Error refreshing access token', error)
          session.error = 'RefreshAccessTokenError'
        }
      }
      return session
    },
  },
  debug: isLocal,
  providers: [
    Google,
  ].filter(Boolean) satisfies NextAuthConfig['providers'],
  secret: process.env.NEXTAUTH_SECRET,
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
} satisfies NextAuthConfig
