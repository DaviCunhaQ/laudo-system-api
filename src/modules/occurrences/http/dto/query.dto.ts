import { z } from 'zod'

export const PaginationSchema = z.object({
  page: z
    .number()
    .int({ message: 'O número da página deve ser um inteiro.' })
    .min(1, { message: 'A página deve ser maior ou igual a 1.' })
    .default(1)
    .optional(),
  perPage: z
    .number()
    .int({ message: 'O número de itens por página deve ser um inteiro.' })
    .min(1, {
      message: 'O número de itens por página deve ser maior ou igual a 1.',
    })
    .default(10)
    .optional(),
})
