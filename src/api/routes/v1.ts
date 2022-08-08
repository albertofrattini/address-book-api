import type { Context } from 'koa'
import Router from 'koa-router'
import * as controllers from '../controllers/v1'

const router = new Router<{}, Context>()
router.prefix('/v1')

/* ----- users ----- */
router.post('/users', controllers.users.getAll)
router.get('/users/me', controllers.users.getAll)

/* ----- addresses ----- */
router.post('/addresses', controllers.addresses.getAll)

/* ----- sessions ----- */
router.get('/sessions', controllers.sessions.getAll)

export const v1Routes = router.routes()
