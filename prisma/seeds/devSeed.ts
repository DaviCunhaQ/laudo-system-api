import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function devSeed(){
  await prisma.user.upsert({
    where: { email: process.env.DEV_EMAIL },
    update: {},
    create: {
      email: process.env.DEV_EMAIL as string,
      name: 'Davi',
      role: 'Dev',
      password: process.env.DEV_HASH_PASSWORD as string
    },
  })
}

