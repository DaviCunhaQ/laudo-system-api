import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  SECRET_KEY: z.string(),

  DEFAULT_MAIL_FROM: z.string(),
  FRONTEND_RESET_PASSWORD_URL: z.string(),
  PORT: z.coerce.number().default(3333),

  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),

  DATABASE_URL: z.string(),

  SUPABASE_PROJECT_URL: z.string().url(),
  SUPABASE_API_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
