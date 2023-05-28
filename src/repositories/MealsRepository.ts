import { Prisma, Meal } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Meal | null>
}
