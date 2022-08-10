import type { Context } from 'koa'
import jwt from 'jsonwebtoken'

export const verifyToken = async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.body.token || ctx.request.headers['x-access-token']

    if (!token) {
        throw new Error('No token was provided')
    }

    try {
        jwt.verify(token, 'TODO:makethissecret')
    } catch(e) {
        throw new Error('Wrong provided token')
    }

    await next()
}