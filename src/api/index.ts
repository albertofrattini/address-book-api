import Koa from 'koa'
import koaBody from 'koa-body'
import koaHelmet from 'koa-helmet'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import config from '../config'
import { v1Routes } from './routes/v1'
import { handleErrors, handleNotFound } from './middleware/error-handling'
import logger from '../utils/logger'
import type { Server } from 'net'
import firebaseDb from '../database/firebase'
import prismaDb from '../database/prisma'


const app = new Koa();

app.use(koaHelmet())
app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(handleErrors)
app.use(v1Routes)
app.use(handleNotFound)


const services: { server: Server | null } = {
    server: null
}

const start = async (): Promise<void> => {
    logger.info('Starting server...')
    services.server = await app.listen(config.server.port)
    logger.info('Listening on port ' + config.server.port)
}

const stop = async () => {
    logger.info('Stopping server...')
    await firebaseDb.terminate()
    await prismaDb.terminate()
    services.server.close()
    logger.info('Server stopped')
}

if (require.main === module) {
    start()
}

process.once('SIGINT', async () => stop())
process.once('SIGTERM', async () => stop())

export default app