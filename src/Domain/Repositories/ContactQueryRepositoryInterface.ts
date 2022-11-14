import ContactId from "@/Domain/ValueObject/ContactId"
import Contact from "@/Domain/Entities/Contact"

export interface ContactQueryRepositoryInterface {
  getContact(id: ContactId): Promise<Contact | undefined>
}
