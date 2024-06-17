import { useLoaderData } from 'react-router-dom'
import type { z } from 'zod'

export function useSafeDataLoader<T>(dto: z.ZodType<T>) {
  const data = useLoaderData()
  return dto.parse(data)
}
