import { initializeApp } from 'firebase/app'
import { getFirestore, terminate } from 'firebase/firestore'
import logger from '../utils/logger'

// TODO: hide this
const firebaseConfig = {
    apiKey: "AIzaSyCHjwurxdKN08l3MmYk6kr3Vr5Df5rvWUg",
    authDomain: "addressbook-api-66db9.firebaseapp.com",
    projectId: "addressbook-api-66db9",
    storageBucket: "addressbook-api-66db9.appspot.com",
    messagingSenderId: "836382248322",
    appId: "1:836382248322:web:68fcd3551cf4b05b1f539b",
    measurementId: "G-22XG8MT6BB"
}

logger.info('Initializing firebase database')
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export default {
    terminate: async (): Promise<void> => {
        await terminate(db)
    }
}
