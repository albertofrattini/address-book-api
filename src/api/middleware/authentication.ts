import type { Context } from 'koa'
import { compareAccessToken } from '../../utils/crypto'

export default async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.body.token || ctx.request.headers['x-access-token']

    if (!token) {
        throw new Error('No token was provided')
    }

    try {
        compareAccessToken(token)
    } catch(e) {
        throw new Error(e.message)
    }

    await next()
}
