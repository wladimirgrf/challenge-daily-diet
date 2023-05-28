import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/MealsRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

interface UpdateMealUseCaseRequest {
  userId: string
  mealId: string
  name?: string
  description?: string
  date?: Date
  isPartOfDiet?: boolean
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    mealId,
    name,
    description,
    date,
    isPartOfDiet,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    if (name) {
      meal.name = name
    }

    if (description) {
      meal.description = description
    }

    if (date) {
      meal.date = date
    }

    if (isPartOfDiet) {
      meal.isPartOfDiet = isPartOfDiet
    }

    await this.mealsRepository.save(meal)

    return {
      meal,
    }
  }
}
