import sessionsRepository from '../database/repositories/sessions'
import type { User, AuthenticatedUser } from '../@types/index'
import { hashPassword, comparePassword, generateAccessToken } from '../utils/crypto'

export const signup = async (credentials: User) => {
    const user = await sessionsRepository.findByEmail(credentials.email)

    if (user) {
        throw new Error('User already exists')
    }

    const hashedCredentials = {
        email: credentials.email,
        password: await hashPassword(credentials.password)
    }
    const newUser = await sessionsRepository.createUser(hashedCredentials)

    const token = generateAccessToken(newUser)
    const result: AuthenticatedUser = {
        email: newUser.email,
        accessToken: token
    }

    return result
}

export const login = async (credentials: User) => {
    const user = await sessionsRepository.findByEmail(credentials.email)

    if (!user) {
        throw new Error('No user with this email')
    }

    const isCorrect = await comparePassword(credentials.password, user.password)
    if (!isCorrect) {
        throw new Error('Wrong password')
    }

    const token = generateAccessToken(user)
    const result: AuthenticatedUser = {
        email: user.email,
        accessToken: token
    }

    return result
}