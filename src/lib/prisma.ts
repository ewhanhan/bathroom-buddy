import { PrismaClient } from '@prisma/client'
import { isLocal, isProd } from '@/constant/env'

function createPrismaClient() {
  return new PrismaClient({
    log: isLocal ? ['query', 'error', 'warn'] : ['error'],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (!isProd) {
  globalForPrisma.prisma = db
}
