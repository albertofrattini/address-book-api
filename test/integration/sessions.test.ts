import supertest from 'supertest'
import type { SuperTest, Test } from 'supertest'
import { expect } from 'chai'
import app from '../../src/api'
import sessionsRepository from '../../src/database/repositories/sessions'
import { compareAccessToken } from '../../src/utils/crypto'

describe('Sessions requests', () => {
    let request: SuperTest<Test>

    before(async () => {
        request = await supertest(app.listen())
    })

    const mockData = {
        email: 'example@example.com',
        password: 'password'
    }

    describe('POST /signup', () => {

        beforeEach(sessionsRepository.deleteAllEntries)

        it('New user is added', async () => {
            const savedUser = await sessionsRepository.findByEmail(mockData.email)
            expect(savedUser).to.be.null
    
            const response = await request.post('/v1/signup').send(mockData)
    
            expect(response.status).to.equal(201)
            expect(response.body.email).to.not.be.undefined
            expect(response.body.accessToken).to.not.be.undefined
            
            try {
                compareAccessToken(response.body.accessToken)
            } catch(e) {
                throw e
            }
    
            const newUser = await sessionsRepository.findByEmail(mockData.email)
    
            expect(newUser).not.to.be.null
            expect(newUser.email).to.equal(response.body.email)
        })

        it('User already exists', async () => {
            await sessionsRepository.createUser(mockData)

            const savedUser = await sessionsRepository.findByEmail(mockData.email)
            expect(savedUser).not.to.be.null
    
            const response = await request.post('/v1/signup').send(mockData)
    
            expect(response.status).to.equal(404)
            expect(response.body.message).to.not.be.undefined
        })

        it('Missing password from body throws error', async () => {
            const savedUser = await sessionsRepository.findByEmail(mockData.email)
            expect(savedUser).to.be.null
    
            const response = await request.post('/v1/signup').send({ email: mockData.email })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
    
            const newUser = await sessionsRepository.findByEmail(mockData.email)
            expect(newUser).to.be.null
        })

        it('Missing email from body throws error', async () => {
            const savedUser = await sessionsRepository.findByEmail(mockData.email)
            expect(savedUser).to.be.null
    
            const response = await request.post('/v1/signup').send({ password: mockData.password })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
    
            const newUser = await sessionsRepository.findByEmail(mockData.email)
            expect(newUser).to.be.null
        })
    })

    describe('POST /login', () => {

        before(async () => {
            await request.post('/v1/signup').send(mockData)

            const savedUser = await sessionsRepository.findByEmail(mockData.email)
            expect(savedUser).not.to.be.null
        })

        after(async () => {
            await sessionsRepository.deleteAllEntries()
        })

        it('User is found and login successful', async () => {
            const response = await request.post('/v1/login').send(mockData)
            
            expect(response.status).to.equal(200)
            expect(response.body.email).to.not.be.undefined
            expect(response.body.accessToken).to.not.be.undefined
            
            try {
                compareAccessToken(response.body.accessToken)
            } catch(e) {
                throw e
            }
        })

        it('Missing password from body throws error', async () => {
            const response = await request.post('/v1/login').send({ email: mockData.email })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
        })

        it('Wrong password throws error', async () => {
            const response = await request.post('/v1/login').send({ email: mockData.email, password: 'wrong' })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
        })

        it('Inexistent email throws error', async () => {
            const response = await request.post('/v1/login').send({ email: 'other@example.com', password: mockData.password })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
        })

        it('Missing email from body throws error', async () => {
            const response = await request.post('/v1/login').send({ password: mockData.password })
    
            expect(response.status).to.equal(404)
            expect(response.body.message).not.to.be.undefined
        })
    })
})