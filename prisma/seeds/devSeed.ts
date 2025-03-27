import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function devSeed(){
  await prisma.user.upsert({
    where: { email: 'davicunha1983@gmail.com' },
    update: {},
    create: {
      email: 'davicunha1983@gmail.com',
      name: 'Davi',
      role: 'Dev',
      password: 'DaviDev123'
    },
  })
}

