import sessionsRepository from '../database/repositories/sessions'
import type { User, AuthenticatedUser, DbUser } from '../@types/index'
import { hashPassword, comparePassword, generateAccessToken } from '../utils/crypto'
import * as appErrors from '../utils/errors'

export const signup = async (credentials: User) => {
    const user: DbUser = await sessionsRepository.findByEmail(credentials.email)

    if (user) {
        throw new appErrors.ConflictError('User already exists')
    }

    const hashedCredentials = {
        email: credentials.email,
        password: await hashPassword(credentials.password)
    }
    const newUser: DbUser = await sessionsRepository.createUser(hashedCredentials)

    const token = generateAccessToken(newUser.id)
    const result: AuthenticatedUser = {
        email: newUser.email,
        accessToken: token
    }

    return result
}

export const login = async (credentials: User) => {
    const user: DbUser = await sessionsRepository.findByEmail(credentials.email)

    if (!user) {
        throw new appErrors.NotFoundError('Email not found')
    }
    
    const isCorrect = await comparePassword(credentials.password, user.password)
    if (!isCorrect) {
        throw new appErrors.NotFoundError('Password is wrong')
    }

    const token = generateAccessToken(user.id)
    const result: AuthenticatedUser = {
        email: user.email,
        accessToken: token
    }

    return result
}