import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Contact } from '../../@types/index'
import * as appErrors from '../../utils/errors'

const createRecord = async (contact: Contact) => {
    try {
        await addDoc(collection(db, 'contacts'), contact)
    } catch (e) {
        throw new appErrors.InternalServerError()
    }
}

export default {
    createRecord
}