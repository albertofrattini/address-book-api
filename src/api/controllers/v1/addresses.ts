import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/addresses'

export const create = compose([
    (ctx: Context) => {
        // TODO: validate input data
    },
    async (ctx: Context): Promise<void> => {
        // TODO
        // TODO: logger
        ctx.body = await operations.create()
        ctx.status = 200
    }
])