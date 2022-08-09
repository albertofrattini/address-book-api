import addressesRepository from '../database/repositories/addresses'
import type { Contact } from '../@types/index'

export const create = async (contact: Contact) => {
    return addressesRepository.createRecord(contact)
}