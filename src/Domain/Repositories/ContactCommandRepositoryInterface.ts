import Contact from "@/Domain/Entities/Contact"

export default interface ContactCommandRepository {
  addContact(contact: Contact): Promise<Contact>
}
