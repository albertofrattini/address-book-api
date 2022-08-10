import pino from 'pino'
import config from '../config'

export default pino({
    name: config.appName,
    level: config.logger.level,
    enabled: config.logger.enabled,
    prettyPrint: config.logger.pretty
})