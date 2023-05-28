import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { GetMealUseCase } from '../getMeal'

export function makeGetMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMealUseCase(mealsRepository)

  return useCase
}
