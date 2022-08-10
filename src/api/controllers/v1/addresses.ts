import type { Context } from 'koa'
import compose from 'koa-compose'
import * as operations from '../../../operations/addresses'
import { validate } from '../../middleware/controller-validations'
import * as schemas from '../../validations/schemas/addresses'
import isAuthorized from '../../middleware/authentication'
import type { Contact } from '../../../@types/index'
import logger from '../../../utils/logger'

export const create = compose([
    validate({ body: schemas.create }),
    isAuthorized,
    async (ctx: Context): Promise<void> => {
        const body = ctx.request.body
        const contact = {
            firstName: body.firstName,
            lastName: body.lastName,
            phoneNumber: body.phoneNumber,
            address: body.address
        } as Contact

        logger.info('POST /addresses')
        await operations.create(contact)
        ctx.body = contact
        ctx.status = 201
    }
])