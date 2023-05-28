import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { FetchUserMealsUseCase } from '../fetchUserMeals'

export function makeFetchUserMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new FetchUserMealsUseCase(mealsRepository)

  return useCase
}
