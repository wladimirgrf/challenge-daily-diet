import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/MealsRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

interface GetMealUseCaseRequest {
  userId: string
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    return {
      meal,
    }
  }
}
