import { MealsRepository } from '@/repositories/MealsRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

interface RemoveMealUseCaseRequest {
  userId: string
  mealId: string
}

type RemoveMealUseCaseResponse = void

export class RemoveMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    mealId,
  }: RemoveMealUseCaseRequest): Promise<RemoveMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(mealId)
  }
}
