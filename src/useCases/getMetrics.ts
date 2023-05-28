import { MealsRepository } from '@/repositories/MealsRepository'

interface GetMetricsUseCaseRequest {
  userId: string
}

interface GetMetricsUseCaseResponse {
  total: number
  totalOnDiet: number
  totalOffDiet: number
}

export class GetMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetMetricsUseCaseRequest): Promise<GetMetricsUseCaseResponse> {
    const total = await this.mealsRepository.countByUserId({ userId })

    const totalOnDiet = await this.mealsRepository.countByUserId({
      userId,
      isPartOfDiet: true,
    })

    const totalOffDiet = await this.mealsRepository.countByUserId({
      userId,
      isPartOfDiet: false,
    })

    return {
      total,
      totalOnDiet,
      totalOffDiet,
    }
  }
}
