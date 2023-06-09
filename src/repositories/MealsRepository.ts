import { Prisma, Meal } from '@prisma/client'

export interface CountByUserIdProps {
  userId: string
  isPartOfDiet?: boolean
}

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Meal | null>
  findManyFromUser(userId: string): Promise<Meal[]>
  countByUserId(props: CountByUserIdProps): Promise<number>
  countUserMealsOfBestDay(userId: string): Promise<number>
}
