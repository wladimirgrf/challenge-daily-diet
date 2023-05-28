import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchMealsUseCase } from '@/useCases/factories/makeFetchMealsUseCase'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFetchMealsUseCase()

  const { meals } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ meals })
}
