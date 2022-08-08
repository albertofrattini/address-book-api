import type { Context } from 'koa'

export const handleErrors = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    try {
      await next()
    } catch (err) {
        ctx.status = 400
        ctx.body = {
            message: err.message,
        }
    }
}