import { MealsRepository } from '@/repositories/MealsRepository'

interface GetMetricsUseCaseRequest {
  userId: string
}

interface GetMetricsUseCaseResponse {
  total: number
  totalOnDiet: number
  totalOffDiet: number
  totalOfBestDay: number
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

    const totalOfBestDay = await this.mealsRepository.countUserMealsOfBestDay(
      userId,
    )

    return {
      total,
      totalOnDiet,
      totalOffDiet,
      totalOfBestDay,
    }
  }
}
