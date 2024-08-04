import NextAuth from 'next-auth'
import 'next-auth/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { db } from './prisma'
import { isLocal } from '@/constant/env'

const config = {
  adapter: PrismaAdapter(db),
  debug: isLocal,
  providers: [
    GitHub,
    Google,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
} satisfies NextAuthConfig

export const { auth, handlers, signIn, signOut } = NextAuth(config)

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
