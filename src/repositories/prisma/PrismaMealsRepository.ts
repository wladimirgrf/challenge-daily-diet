import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { Replace } from '@/helpers/Replace'
import { CountByUserIdProps, MealsRepository } from '../MealsRepository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyFromUser(userId: string) {
    const meals = await prisma.meal.findMany({
      where: { userId },
    })

    return meals
  }

  async countByUserId({ userId, isPartOfDiet }: CountByUserIdProps) {
    const count = await prisma.meal.count({
      where: {
        userId,
        isPartOfDiet,
      },
    })

    return count
  }

  async countUserMealsOfBestDay(userId: string) {
    const bestDay = await prisma.meal.groupBy({
      by: ['date'],
      where: {
        userId,
        isPartOfDiet: true,
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    })

    const totalMeals = bestDay.length > 0 ? bestDay[0]._count.id : 0

    return totalMeals
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async save(data: Replace<Prisma.MealUncheckedUpdateInput, { id: string }>) {
    const { id, ...props } = data

    const meal = await prisma.meal.update({
      where: { id },
      data: props,
    })

    return meal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: { id },
    })
  }
}
