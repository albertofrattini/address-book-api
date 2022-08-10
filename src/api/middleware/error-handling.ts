import type { Context } from 'koa'
import logger from '../../utils/logger'
import * as appErrors from '../../utils/errors'
import config from '../../config'

export const handleErrors = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    try {
        await next()
    } catch (err) {
        let responseError = err
        if (!(err instanceof appErrors.AppError)) {
            logger.error(err)
            responseError = new appErrors.InternalServerError()
        }

        const isDevelopment = ['local', 'test'].includes(config.env)
        ctx.status = responseError.status
        ctx.body = {
            type: responseError.type,
            message: responseError.message,
            stack: isDevelopment && responseError.stack,
        }
    }
}

export const handleNotFound = async () => {
    throw new appErrors.NotFoundError()
}