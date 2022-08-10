import Koa from 'koa'
import koaBody from 'koa-body'
import koaHelmet from 'koa-helmet'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import config from '../config'
import { v1Routes } from './routes/v1'
import logger from '../utils/logger'
import type { Server } from 'net'
import firebaseDb from '../database/firebase'

const app = new Koa();

app.use(koaHelmet())
app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(v1Routes)

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
    services.server.close()
    logger.info('Server stopped')
}

if (require.main === module) {
    start()
}

process.once('SIGINT', async () => stop())
process.once('SIGTERM', async () => stop())

export default app