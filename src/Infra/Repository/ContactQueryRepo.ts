import Contact from "@/Domain/Entities/Contact"
import { ContactQueryRepositoryInterface } from "@/Domain/Repositories/ContactQueryRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "../Utils/Prisma/Connection"

export default class ContactQueryRepo
  implements ContactQueryRepositoryInterface
{
  public async getContact(id: ContactId): Promise<Contact | undefined> {
    const contact = await prismaConnection.contact.findFirst({
      where: {
        id: parseInt(id.toString()),
      },
    })

    if (!contact) {
      return undefined
    }

    const result = new Contact(
      new ContactId(String(contact?.id)),
      new PersonName(contact?.name),
      new Nickname(contact?.nick),
      new PhoneNumber(contact?.phone)
    )
    return result
  }
}
