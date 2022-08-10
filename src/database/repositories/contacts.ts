import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Contact } from '../../@types/index'

const createRecord = async (contact: Contact) => {
    try {
        const newDoc = await addDoc(collection(db, 'records'), contact)
        return newDoc
    } catch (e) {
        throw new Error('Firebase error')
    }
}

export default {
    createRecord
}