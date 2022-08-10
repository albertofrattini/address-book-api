import crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import type { User } from '../@types/index'
import config from '../config'

const pepperify = (password: string) => {
    return crypto.createHmac('sha1', config.auth.secret).update(password).digest('hex')
}

export const hashPassword = async (password: string) => {
    const spicyPassword = pepperify(password)
    const hash = await bcrypt.hash(spicyPassword, config.auth.saltRounds)
    return hash
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const spicyPassword = pepperify(password)
    const isCorrect = await bcrypt.compare(spicyPassword, hashedPassword)
    return isCorrect
}

export const generateAccessToken = (user: User) => {
    const token = jwt.sign(user, config.auth.secret, config.auth.generateOptions)
    return token
}

export const compareAccessToken = (token: string) => {
    try {
        const result = jwt.verify(token, config.auth.secret, config.auth.verifyOptions)
        return result
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError || e instanceof SyntaxError) {
            throw new Error('JSONWebToken error')
        }
        throw new Error('Token does not exist or expired')
    }
}
