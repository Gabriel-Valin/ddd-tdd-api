import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import Contact from "@/Domain/Entities/Contact"

export default class AddContactCommandInteractor {
  constructor(private readonly commandRepo: ContactCommandRepository) {}

  public async action(contact: Contact) {
    try {
      await this.commandRepo.addContact(contact)
    } catch (error) {
      throw new Error("Contact not created, try later soon")
    }
  }
}
