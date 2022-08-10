import R from 'ramda'
import { getConfig } from './default'

const env: string = process.env.NODE_ENV || 'local'

if (env === 'local') {
  require('dotenv').config({ silent: false })
}

const { config: envConfig } = require(`./environments/${env}`)
const defaultConfig = getConfig(env)

const resultConfig = R.mergeDeepRight(defaultConfig, envConfig)

export default resultConfig
