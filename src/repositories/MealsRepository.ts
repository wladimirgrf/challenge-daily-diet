import { Prisma, Meal } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
}
