import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeRemoveMealUseCase } from '@/useCases/factories/makeRemoveMealUseCase'
import { ResourceNotFoundError } from '@/useCases/errors/ResourceNotFoundError'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const useCase = makeRemoveMealUseCase()

    await useCase.execute({
      userId: request.user.sub,
      mealId: id,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
