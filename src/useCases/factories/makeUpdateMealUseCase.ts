import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { UpdateMealUseCase } from '../updateMeal'

export function makeUpdateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new UpdateMealUseCase(mealsRepository)

  return useCase
}
