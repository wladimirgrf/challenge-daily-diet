import { prisma } from '@/lib/prisma'
import { Prisma, Meal } from '@prisma/client'

import { Replace } from '@/helpers/Replace'
import { MealsRepository } from '../MealsRepository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async save(
    data: Replace<Prisma.MealUncheckedUpdateInput, { id: string }>,
  ): Promise<Meal> {
    const { id, ...props } = data

    const meal = await prisma.meal.update({
      where: { id },
      data: props,
    })

    return meal
  }
}
