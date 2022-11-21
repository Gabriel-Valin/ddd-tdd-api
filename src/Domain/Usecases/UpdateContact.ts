import { UpdateContactRepository } from "@/Domain/Repositories/UpdateContactRepositoryInterface"
import Contact from "@/Domain/Entities/Contact"

export default class UpdateContactInteractor {
  constructor(private readonly commandRepo: UpdateContactRepository) {}

  public async action(contact: Contact): Promise<Contact> {
    const result = await this.commandRepo.updateContact(contact)
    return result
  }
}
