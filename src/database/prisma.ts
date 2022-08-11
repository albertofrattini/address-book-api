import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export default {
    terminate: async () => {
        await prisma.$disconnect()
    }
}