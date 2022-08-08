import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/sessions'
import { validate } from '../../validations/sessions'
import type { User } from '../../../@types/index'

export const signup = compose([
    validate,
    async (ctx: Context): Promise<void> => {
        const credentials = { 
            email: ctx.request.body.email,
            password: ctx.request.body.password
        } as User

        // TODO: logger
        ctx.body = await operations.signup(credentials)
        ctx.status = 201
    }
])

export const login = compose([
    validate,
    async (ctx: Context): Promise<void> => {
        const credentials = {
            email: ctx.request.body.email,
            password: ctx.request.body.password
        } as User

        ctx.body = await operations.login(credentials)
        ctx.status = 200
    }
])
