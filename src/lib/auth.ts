import NextAuth from 'next-auth'
import 'next-auth/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/Google'

import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { db } from './prisma'
import { isLocal } from '@/constant/env'

const config = {
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  adapter: PrismaAdapter(db),
  providers: [
    GitHub,
    Google,
  ],
  debug: isLocal,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

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
