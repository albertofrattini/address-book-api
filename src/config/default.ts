export const getConfig = (env: string) => ({
    env,
    appName: 'Address Book API',
    server: {
        port: process.env.PORT || 3000,
    },
    auth: {
        secret: process.env.TOKEN_KEY || 'htfq4o3bcyriq4wyvtcbyrwqv3fy53bprogc',
        saltRounds: 10,
        generateOptions: {
            expiresIn: 60 * 60,
            algorithm: 'HS256',
        },
        verifyOptions: {
            algorithm: 'HS256',
        },
    },
    logger: {
        enabled: true,
        level: 'debug',
        pretty: false
    },
    database: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/usersdb',
    },
})