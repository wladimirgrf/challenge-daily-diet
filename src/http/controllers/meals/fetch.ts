import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchUserMealsUseCase } from '@/useCases/factories/makeFetchUserMealsUseCase'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeFetchUserMealsUseCase()

  const { meals } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ meals })
}
