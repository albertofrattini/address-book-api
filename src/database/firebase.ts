import { initializeApp } from 'firebase/app'
import { getFirestore, terminate } from 'firebase/firestore'
import logger from '../utils/logger'
import config from '../config'

logger.info('Initializing firebase database')
const app = initializeApp(config.firebase.config)

export const db = getFirestore(app)
export default {
    terminate: async (): Promise<void> => {
        await terminate(db)
    }
}
