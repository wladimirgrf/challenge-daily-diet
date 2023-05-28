import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUpdateMealUseCase } from '@/useCases/factories/makeUpdateMealUseCase'
import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const bodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    isPartOfDiet: z.union([z.literal(true), z.literal(false)]).optional(),
  })

  const { name, description, date, isPartOfDiet } = bodySchema.parse(
    request.body,
  )

  try {
    const useCase = makeUpdateMealUseCase()

    const { meal } = await useCase.execute({
      userId: request.user.sub,
      mealId: id,
      name,
      description,
      date,
      isPartOfDiet,
    })

    return reply.status(200).send({ meal })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
