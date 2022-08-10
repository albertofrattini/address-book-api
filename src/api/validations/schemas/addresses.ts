export const create = {
    type: 'Object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        phoneNumber: { type: 'string' },
        address: { type: 'string' },
    },
    required: ['firstName', 'lastName', 'phoneNumber', 'address'],
    additionalProperties: false
}