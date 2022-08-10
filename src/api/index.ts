import Koa from 'koa'
import koaBody from 'koa-body'
import koaHelmet from 'koa-helmet'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import config from '../config'
import { v1Routes } from './routes/v1'

const app = new Koa();

app.use(koaHelmet())
app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(v1Routes)

app.listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on PORT ' + config.server.port)
})

export default app