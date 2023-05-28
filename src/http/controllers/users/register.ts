import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/useCases/errors/UserAlreadyExistsError'
import { makeRegisterUseCase } from '@/useCases/factories/makeRegisterUseCase'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const useCase = makeRegisterUseCase()

    const { user } = await useCase.execute({ email, password })

    const { passwordHash, ...safeInfo } = user

    return reply.status(201).send({
      user: safeInfo,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
