import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const serviceTypes = [
  { code: 'E401', days_limit: 6, service_value: 406 },
  { code: 'B438', days_limit: 15, service_value: 914 },
  { code: 'B437', days_limit: 15, service_value: 716 },
  { code: 'A413', days_limit: 6, service_value: 466 },
  { code: 'G401', days_limit: 4 },
  { code: 'G402', days_limit: 3 },
  { code: 'G416', days_limit: 5 },
  { code: 'G415', days_limit: 5 },
  { code: 'G403', days_limit: 4 }
];

export async function serviceTypesSeed() {
  await Promise.all(
    serviceTypes.map(({ code, days_limit, service_value }) =>
      prisma.soType.upsert({
        where: { code },
        update: {},
        create: { code, days_limit, ...(service_value && { service_value }) },
      })
    )
  );
}
