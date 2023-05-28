import { prisma } from '@/lib/prisma'
import { Prisma, Meal } from '@prisma/client'
import { MealsRepository } from '../MealsRepository'

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }
}
