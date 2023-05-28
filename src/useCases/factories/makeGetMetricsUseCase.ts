import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { GetMetricsUseCase } from '../getMetrics'

export function makeGetMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMetricsUseCase(mealsRepository)

  return useCase
}
