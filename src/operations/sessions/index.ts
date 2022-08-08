import jwt from 'jsonwebtoken'
import sessionsRepository from '../../database/repositories/sessions'
import type { User, AuthenticatedUser } from '../../@types/index'

export const signup = async (credentials: User) => {
    try {
        const user = await sessionsRepository.findByEmail(credentials.email)
    
        if (user) {
            console.log('User already exists')
        }
    } catch (e) {
        console.log('Throw new error')
    }

    // TODO: hash the password
    const newUser = await sessionsRepository.createUser(credentials)

    const token = jwt.sign(newUser, 'TODO:makethissecret', {expiresIn: '2h'})
    const result: AuthenticatedUser = {
        email: newUser.email,
        accessToken: token
    }

    return result
}






// TODO: implement this
export const login = async (credentials: User) => {
    try {
        const user = await sessionsRepository.findByEmail(credentials.email)
    
        if (user) {
            console.log('User already exists')
        }
    } catch (e) {
        console.log('Throw new error')
    }

    // TODO: hash the password
    const newUser = await sessionsRepository.createUser(credentials)

    const token = jwt.sign(newUser, 'TODO:makethissecret', {expiresIn: '2h'})
    const result: AuthenticatedUser = {
        email: newUser.email,
        accessToken: token
    }

    return result
}

// TODO: implement this
export const logout = async (credentials: User) => {
    try {
        const user = await sessionsRepository.findByEmail(credentials.email)
    
        if (user) {
            console.log('User already exists')
        }
    } catch (e) {
        console.log('Throw new error')
    }

    // TODO: hash the password
    const newUser = await sessionsRepository.createUser(credentials)

    const token = jwt.sign(newUser, 'TODO:makethissecret', {expiresIn: '2h'})
    const result: AuthenticatedUser = {
        email: newUser.email,
        accessToken: token
    }

    return result
}