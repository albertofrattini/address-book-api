import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/addresses'
import { validate } from '../../validations/addresses'

export const create = compose([
    validate,
    async (ctx: Context): Promise<void> => {
        // TODO
        // TODO: logger
        ctx.body = await operations.create()
        ctx.status = 200
    }
])