const common = {
    type: 'Object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string', format: 'password' }
    },
    required: ['email', 'password'],
    additionalProperties: false
}

export const signup = common
export const login = common