import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeCreateMealUseCase } from '@/useCases/factories/makeCreateMealUseCase'
import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    isPartOfDiet: z.union([z.literal(true), z.literal(false)]),
  })

  const { name, description, date, isPartOfDiet } = bodySchema.parse(
    request.body,
  )

  try {
    const useCase = makeCreateMealUseCase()

    const { meal } = await useCase.execute({
      userId: request.user.sub,
      name,
      description,
      date,
      isPartOfDiet,
    })

    return reply.status(201).send({ meal })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
