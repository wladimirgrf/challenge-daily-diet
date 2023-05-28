import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/MealsRepository'

interface FetchUserMealsUseCaseRequest {
  userId: string
}

interface FetchUserMealsUseCaseResponse {
  meals: Meal[]
}

export class FetchUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchUserMealsUseCaseRequest): Promise<FetchUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyFromUser(userId)

    return {
      meals,
    }
  }
}
