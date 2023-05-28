import { Meal } from '@prisma/client'

import { UsersRepository } from '@/repositories/UsersRepository'
import { MealsRepository } from '@/repositories/MealsRepository'
import { ResourceNotFoundError } from './errors/ResourceNotFoundError'

interface CreateMealUseCaseRequest {
  userId: string
  name: string
  description: string
  date: Date
  isPartOfDiet: boolean
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
    date,
    isPartOfDiet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.create({
      userId,
      name,
      description,
      date,
      isPartOfDiet,
    })

    return {
      meal,
    }
  }
}
