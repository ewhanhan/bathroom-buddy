/* eslint-disable no-console */
import prisma from './../db'

async function main() {
  console.log(`Start seeding ...`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
