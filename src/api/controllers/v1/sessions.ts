import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/sessions'
import { validate } from '../../middleware/controller-validations'
import * as schemas from '../../validations/schemas/sessions'
import type { User } from '../../../@types/index'
import logger from '../../../utils/logger'

export const signup = compose([
    validate({ body: schemas.signup }),
    async (ctx: Context): Promise<void> => {
        const credentials = { 
            email: ctx.request.body.email,
            password: ctx.request.body.password
        } as User

        logger.info('POST /signup with email ' + credentials.email)
        ctx.body = await operations.signup(credentials)
        ctx.status = 201
    }
])

export const login = compose([
    validate({ body: schemas.login }),
    async (ctx: Context): Promise<void> => {
        const credentials = {
            email: ctx.request.body.email,
            password: ctx.request.body.password
        } as User

        logger.info('POST /login with email ' + credentials.email)
        ctx.body = await operations.login(credentials)
        ctx.status = 200
    }
])
