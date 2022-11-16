import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import Contact from "@/Domain/Entities/Contact"

export default class AddContactCommandInteractor {
  constructor(private readonly commandRepo: ContactCommandRepository) {}

  public async action(contact: Contact): Promise<void> {
    await this.commandRepo.addContact(contact)
  }
}
