import supertest from 'supertest'
import type { SuperTest, Test } from 'supertest'
import { expect } from 'chai'
import sinon from 'sinon'
import app from '../../src/api'
import contactsRepository from '../../src/database/repositories/contacts'

describe('Contacts requests', () => {
    let request: SuperTest<Test>

    before(async () => {
        request = await supertest(app.listen())
    })

    const mockData = {
        firstName: 'pippo',
        lastName: 'paolo',
        phoneNumber: '123456789',
        address: 'strv street, 20'
    }

    describe('POST /contacts', async () => {
        // eslint-disable-next-line
        let stub: any, 
            token: string

        before(async () => {
            stub = sinon.stub(contactsRepository, 'createRecord').resolves()
            const response = await request.post('/v1/signup').send({ email: 'example@example.com', password: 'password' })
            token = response.body.accessToken
        })

        afterEach(() => {
            stub.resetHistory()
        })

        it('Contact is added to the db', async () => {
            const response = await request.post('/v1/contacts').send(mockData).set({ 'x-access-token': token })
    
            expect(response.status).to.equal(201)
            expect(stub.calledOnce).to.be.true
            expect(response.body.firstName).to.equal(mockData.firstName)
            expect(response.body.lastName).to.equal(mockData.lastName)
            expect(response.body.phoneNumber).to.equal(mockData.phoneNumber)
            expect(response.body.address).to.equal(mockData.address)
        })

        it('Token is necessary for authorization', async () => {
            const response = await request.post('/v1/contacts').send(mockData)
    
            expect(response.status).to.equal(400)
            expect(stub.notCalled).to.be.true
            expect(response.body.message).not.to.be.undefined  
        })

        it('firstName is mandatory', async () => {
            const response = await request.post('/v1/contacts').send({
                lastName: mockData.lastName,
                phoneNumber: mockData.phoneNumber,
                address: mockData.address
            }).set({ 'x-access-token': token })
    
            expect(response.status).to.equal(400)
            expect(stub.notCalled).to.be.true
            expect(response.body.message).not.to.be.undefined        
        })

        it('lastName is mandatory', async () => {
            const response = await request.post('/v1/contacts').send({
                firstName: mockData.firstName,
                phoneNumber: mockData.phoneNumber,
                address: mockData.address
            }).set({ 'x-access-token': token })
    
            expect(response.status).to.equal(400)
            expect(stub.notCalled).to.be.true
            expect(response.body.message).not.to.be.undefined        
        })

        it('phoneNumber is mandatory', async () => {
            const response = await request.post('/v1/contacts').send({
                firstName: mockData.firstName,
                lastName: mockData.lastName,
                address: mockData.address
            }).set({ 'x-access-token': token })
    
            expect(response.status).to.equal(400)
            expect(stub.notCalled).to.be.true
            expect(response.body.message).not.to.be.undefined        
        })

        it('address is mandatory', async () => {
            const response = await request.post('/v1/contacts').send({
                firstName: mockData.firstName,
                lastName: mockData.lastName,
                phoneNumber: mockData.phoneNumber
            }).set({ 'x-access-token': token })
    
            expect(response.status).to.equal(400)
            expect(stub.notCalled).to.be.true
            expect(response.body.message).not.to.be.undefined        
        })

    })
})