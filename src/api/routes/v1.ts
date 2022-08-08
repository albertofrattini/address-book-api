import type { Context } from 'koa'
import Router from 'koa-router'
import * as controllers from '../controllers/v1'
import { handleErrors } from '../middleware/error-handling'
// TODO: import and use the error handling middleware

const router = new Router<{}, Context>()
router.prefix('/v1')
router.use(handleErrors)

/* ----- addresses ----- */
router.post('/addresses', controllers.addresses.create)

/* ----- sessions ----- */
router.post('/signup', controllers.sessions.signup)
router.post('/login', controllers.sessions.login)

export const v1Routes = router.routes()
