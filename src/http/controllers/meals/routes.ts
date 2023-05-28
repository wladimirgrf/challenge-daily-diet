import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'
import { update } from './update'
import { remove } from './remove'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', create)

  app.put('/meals/:id', update)
  app.delete('/meals/:id', remove)
}
