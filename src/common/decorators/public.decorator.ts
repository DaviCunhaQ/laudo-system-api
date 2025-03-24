import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

/**
 * Used to set a route as public
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
