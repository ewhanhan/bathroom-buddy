/* eslint-disable no-console */
import { db } from '@/lib/prisma'

async function main() {
  console.log(`Start seeding ...`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
