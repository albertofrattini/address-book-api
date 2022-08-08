import Koa from 'koa'
import koaBody from 'koa-body'
import koaHelmet from 'koa-helmet'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import { v1Routes } from './routes/v1'

const app = new Koa();

app.use(koaHelmet())
app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(v1Routes)

app.listen(3000, () => console.log('Listening on PORT 3000'))

export default app