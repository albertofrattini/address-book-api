import type { Context } from 'koa'

export const validate = async (ctx: Context, next: () => Promise<void>) => {
    const { email, password } = ctx.request.body
    if (!(email && password)) {
        throw new Error('email and password are required')
    }
    await next()
}