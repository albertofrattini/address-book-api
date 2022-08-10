import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Contact } from '../../@types/index'
import * as appErrors from '../../utils/errors'
import logger from '../../utils/logger'

const createRecord = async (contact: Contact) => {
    logger.info('Creating new contact')
    try {
        await addDoc(collection(db, 'contacts'), contact)
    } catch (e) {
        throw new appErrors.InternalServerError()
    }
}

export default {
    createRecord
}