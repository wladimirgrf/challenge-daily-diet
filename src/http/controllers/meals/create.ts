import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreateMealUseCase } from '@/useCases/factories/makeCreateMealUseCase'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    isPartOfDiet: z.union([z.literal(true), z.literal(false)]),
  })

  const { name, description, date, isPartOfDiet } = createMealBodySchema.parse(
    request.body,
  )

  const useCase = makeCreateMealUseCase()

  const { meal } = await useCase.execute({
    userId: request.user.sub,
    name,
    description,
    date,
    isPartOfDiet,
  })

  return reply.status(201).send({ meal })
}
