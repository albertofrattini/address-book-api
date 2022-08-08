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
        console.log('Deal with this error')
    }

    if (!user) {
        console.log('Throw new error')
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
        console.log('Deal with this error')
    }

    if (!user) {
        console.log('Throw new error')
    }

    return user
}

export default {
    findByEmail,
    createUser
}