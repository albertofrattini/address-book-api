export type User = {
    email: string,
    password: string
}

export type DbUser = {
    id: number,
    email: string,
    password: string
}

export type AuthenticatedUser = {
    email: string,
    accessToken: string
}

export type Contact = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string
}