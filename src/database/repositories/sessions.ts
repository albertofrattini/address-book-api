import { PrismaClient } from '@prisma/client'
import type { DbUser, User } from '../../@types/index'

const prisma = new PrismaClient()

const findByEmail = async (email: string): Promise<DbUser> => {
    let user: DbUser | undefined
    try {
        user = await prisma.user.findFirst({
            where: {
                email
            }
        })
    } catch(e) {
        throw new Error('Prisma error')
    }

    return user
}

const createUser = async (credentials: User): Promise<DbUser> => {
    let user: DbUser | undefined
    try {
        user = await prisma.user.create({
            data: {
                email: credentials.email,
                password: credentials.password
            }
        })
    } catch(e) {
        throw new Error('Prisma error')
    }

    return user
}

const deleteAllEntries = async (): Promise<void> => {
    await prisma.user.deleteMany({})
}

export default {
    findByEmail,
    createUser,
    deleteAllEntries,
}