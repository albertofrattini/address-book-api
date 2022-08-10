import jsonschema from 'jsonschema'
import { Context } from 'koa'
import logger from '../../utils/logger'
import * as appErrors from '../../utils/errors'

export const validate = ({ body }: { body: jsonschema.Schema }) => {
    return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
        logger.info('Validating request body')
        const validator = new jsonschema.Validator()

        const validationErrors = validator.validate(ctx.request.body, body).errors
        if (validationErrors.length > 0) {
            logger.info(validationErrors)
            throw new appErrors.ValidationError(undefined, validationErrors)
        }
        
        await next()
    }
}