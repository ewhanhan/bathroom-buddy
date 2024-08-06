import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { isLocal } from './constant/env'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

export default {
  callbacks: {
    jwt({ session, token, trigger }) {
      if (trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  debug: isLocal,
  providers: [
    GitHub,
    Google,
  ].filter(Boolean) satisfies NextAuthConfig['providers'],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
} satisfies NextAuthConfig
