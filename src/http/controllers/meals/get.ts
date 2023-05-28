import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeGetMealUseCase } from '@/useCases/factories/makeGetMealUseCase'
import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const useCase = makeGetMealUseCase()

    const { meal } = await useCase.execute({
      userId: request.user.sub,
      mealId: id,
    })

    return reply.status(200).send({ meal })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
