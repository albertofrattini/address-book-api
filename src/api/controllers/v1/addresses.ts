import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/addresses'
import { validate } from '../../validations/addresses'
import type { Contact } from '../../../@types/index'

export const create = compose([
    validate,
    async (ctx: Context): Promise<void> => {
        const body = ctx.request.body
        const contact = {
            firstName: body.firstName,
            lastName: body.lastName,
            phoneNumber: body.phoneNumber,
            address: body.address
        } as Contact
        // TODO: logger
        await operations.create(contact)
        ctx.body = contact
        ctx.status = 201
    }
])