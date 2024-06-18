import { useLoaderData, useRouteLoaderData } from 'react-router-dom'
import type { z } from 'zod'

export function useSafeLoaderData<T>(dto: z.ZodType<T>) {
  const data = useLoaderData()
  return dto.parse(data)
}

export function useSafeRouteLoaderData<T>(route: string, dto: z.ZodType<T>) {
  const data = useRouteLoaderData(route)
  return dto.parse(data)
}
