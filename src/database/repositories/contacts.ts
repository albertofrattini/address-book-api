import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Contact } from '../../@types/index'

const createRecord = async (contact: Contact) => {
    try {
        await addDoc(collection(db, 'contacts'), contact)
    } catch (e) {
        throw new Error('Firebase error')
    }
}

export default {
    createRecord
}