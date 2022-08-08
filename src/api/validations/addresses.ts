import { Context } from 'koa'

export const validate = async (ctx: Context, next: () => Promise<void>) => {
    // TODO: check if token is valid
    // TODO: check if body has necessary data
    await next()
}