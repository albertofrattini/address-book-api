import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const createRecord = async () => {
    try {
        const newDoc = await addDoc(collection(db, 'records'), {
            name: 'Name',
            street: 'Some street, 7'
        })
        return newDoc
    } catch (e) {
        throw new Error('Firebase error')
    }
}

export default {
    createRecord
}