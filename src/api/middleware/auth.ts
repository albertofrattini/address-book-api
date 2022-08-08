import type { Context } from 'koa'
import jwt from 'jsonwebtoken'

export const verifyToken = async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.body.token || ctx.request.headers['x-access-token']

    if (!token) {
        console.log('Throw new error')
    }

    try {
        const isAuthenticated = jwt.verify(token, 'TODO:makethissecret')
    } catch(e) {
        console.log('Throw new error')
    }

    await next()
}