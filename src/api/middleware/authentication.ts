import type { Context } from 'koa'
import { compareAccessToken } from '../../utils/crypto'
import * as appErrors from '../../utils/errors'
import logger from '../../utils/logger'

export default async (ctx: Context, next: () => Promise<void>) => {
    const token = ctx.request.body.token || ctx.request.headers['x-access-token']

    logger.info('Authenticating token')
    
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
