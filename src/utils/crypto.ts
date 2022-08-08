import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import type { User } from '../@types/index'

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const isCorrect = await bcrypt.compare(password, hashedPassword)
    return isCorrect
}

export const generateAccessToken = (user: User) => {
    const token = jwt.sign(user, 'TODO:makethissecret', {expiresIn: '2h'})
    return token
}

export const compareAccessToken = (token: string) => {
    try {
        const result = jwt.verify(token, 'TODO:makethissecret')
        return result
    } catch (e) {
        throw new Error('Token does not exist or expired')
    }
}
