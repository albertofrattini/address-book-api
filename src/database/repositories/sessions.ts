import { prisma } from '../prisma'
import type { DbUser, User } from '../../@types/index'
import * as appErrors from '../../utils/errors'
import logger from '../../utils/logger'

const findByEmail = async (email: string): Promise<DbUser> => {
    let user: DbUser | undefined
    logger.info('Finding user by email: ' + email)
    try {
        user = await prisma.user.findFirst({
            where: {
                email
            }
        })
    } catch(e) {
        throw new appErrors.InternalServerError()
    }

    return user
}

const createUser = async (credentials: User): Promise<DbUser> => {
    let user: DbUser | undefined
    logger.info('Creating new user')
    try {
        user = await prisma.user.create({
            data: {
                email: credentials.email,
                password: credentials.password
            }
        })
    } catch(e) {
        throw new appErrors.InternalServerError()
    }

    return user
}

const deleteAllEntries = async (): Promise<void> => {
    logger.info('Delete all available users')
    await prisma.user.deleteMany({})
}

export default {
    findByEmail,
    createUser,
    deleteAllEntries,
}