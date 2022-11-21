import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import Contact from "@/Domain/Entities/Contact"

export type IUpdateContact = {
  contactId: ContactId
  name: PersonName
  nick: Nickname
  phone: PhoneNumber
}

export interface UpdateContactRepository {
  updateContact(contact: Contact): Promise<Contact>
}
