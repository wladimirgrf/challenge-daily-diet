import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { RemoveMealUseCase } from '../removeMeal'

export function makeRemoveMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new RemoveMealUseCase(mealsRepository)

  return useCase
}
