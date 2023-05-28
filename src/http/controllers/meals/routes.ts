import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', create)
}
