import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'
import { update } from './update'
import { remove } from './remove'
import { fetch } from './fetch'
import { get } from './get'
import { metrics } from './metrics'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/meals', fetch)
  app.get('/meals/:id', get)
  app.get('/meals/metrics', metrics)

  app.post('/meals', create)
  app.put('/meals/:id', update)
  app.delete('/meals/:id', remove)
}
