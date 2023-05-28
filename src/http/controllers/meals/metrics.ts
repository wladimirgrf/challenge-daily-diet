import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetMetricsUseCase } from '@/useCases/factories/makeGetMetricsUseCase'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetMetricsUseCase()

  const { total, totalOffDiet, totalOnDiet, totalOfBestDay } =
    await useCase.execute({
      userId: request.user.sub,
    })

  return reply.status(200).send({
    total,
    totalOffDiet,
    totalOnDiet,
    totalOfBestDay,
  })
}
