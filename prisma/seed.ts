import { PrismaClient } from '@prisma/client'
import { citiesSeed } from './seeds/citiesSeed'
import { serviceTypesSeed } from './seeds/serviceTypesSeed'
const prisma = new PrismaClient()

citiesSeed()
  .then(async () => {
    serviceTypesSeed().then(async()=>{
      await prisma.$disconnect()
    }).catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })