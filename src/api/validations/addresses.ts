import { Context } from 'koa'

export const validate = async (ctx: Context, next: () => Promise<void>) => {
    // TODO: check if token is valid
    const { firstName, lastName, phoneNumber, address } = ctx.request.body
    if (!(firstName && lastName && phoneNumber && address)) {
        throw new Error('Missing properties from body')
    }

    await next()
}