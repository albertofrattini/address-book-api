import type { Context } from 'koa'
import { compareAccessToken } from '../../utils/crypto'
import * as appErrors from '../../utils/errors'

export default async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.body.token || ctx.request.headers['x-access-token']

    if (!token) {
        throw new appErrors.ValidationError('Token missing')
    }

    try {
        compareAccessToken(token)
    } catch(e) {
        throw new appErrors.UnauthorizedError()
    }

    await next()
}
