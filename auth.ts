import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import type { NextAuthConfig } from 'next-auth'
import prisma from 'db'
import authConfig from './auth..config'

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
} satisfies NextAuthConfig)
