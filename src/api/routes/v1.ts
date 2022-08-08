import type { Context } from 'koa'
import Router from 'koa-router'
import * as controllers from '../controllers/v1'

const router = new Router<{}, Context>()
router.prefix('/v1')

/* ----- addresses ----- */
router.post('/addresses', controllers.addresses.create)

/* ----- sessions ----- */
router.post('/signup', controllers.sessions.signup)
router.post('/login', controllers.sessions.login)
router.get('/logout', controllers.sessions.logout)

export const v1Routes = router.routes()
