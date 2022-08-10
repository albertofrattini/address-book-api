import contactsRepository from '../database/repositories/contacts'
import type { Contact } from '../@types/index'

export const create = async (contact: Contact) => {
    return contactsRepository.createRecord(contact)
}