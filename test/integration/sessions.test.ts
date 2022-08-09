import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../src/api'
import sessionsRepository from '../../src/database/repositories/sessions'

describe('/sessions requests', () => {
    before(sessionsRepository.deleteAllEntries)

    const mockData = {
        email: 'example@example.com',
        password: 'password'
    }

    it('POST /sessions', async () => {
        const request = await supertest(app.listen())
        const response = await request.post('/v1/signup').send(mockData)

        expect(response.status).to.equal(201)
        expect(response.body.email).to.not.be.undefined
        expect(response.body.accessToken).to.not.be.undefined
        // TODO: compare accessToken
    })
})