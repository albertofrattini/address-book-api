import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/sessions'

export const signup = compose([
    async (ctx: Context, next: () => Promise<void>) => {
        const { email, password } = ctx.request.body
        if (!(email && password)) {
            console.log('Throw an error')
        }
        await next()
    },
    async (ctx: Context): Promise<void> => {
        const credentials = { 
            email: ctx.request.body.email,
            password: ctx.request.body.password
        }
        // TODO: logger
        ctx.body = await operations.signup(credentials)
        ctx.status = 200
    }
])

export const login = compose([
    async (ctx: Context) => {
        // TODO
    },
    async (ctx: Context): Promise<void> => {
        // TODO
    }
])

export const logout = compose([
    async (ctx: Context) => {
        // TODO
    },
    async (ctx: Context): Promise<void> => {
        // TODO
    }
])