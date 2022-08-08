import { PrismaClient } from '@prisma/client'
import type { User } from '../../@types/index'

const prisma = new PrismaClient()

const findByEmail = async (email: string): Promise<User> => {
    let user: User | undefined
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

const createUser = async (credentials: User): Promise<User> => {
    let user: User | undefined
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

export default {
    findByEmail,
    createUser
}