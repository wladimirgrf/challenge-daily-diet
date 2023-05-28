import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { PrismaMealsRepository } from '@/repositories/prisma/PrismaMealsRepository'
import { CreateMealUseCase } from '../createMeal'

export function makeCreateMealUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CreateMealUseCase(usersRepository, mealsRepository)

  return useCase
}
