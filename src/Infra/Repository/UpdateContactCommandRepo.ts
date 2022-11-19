import Contact from "@/Domain/Entities/Contact"
import {
  IUpdateContact,
  UpdateContactRepository,
} from "@/Domain/Repositories/UpdateContactRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"

export default class UpdateContactCommandRepo
  implements UpdateContactRepository
{
  public async updateContact({
    contactId,
    name,
    nick,
    phone,
  }: IUpdateContact): Promise<Contact> {
    const contact = await prismaConnection.contact.update({
      data: {
        name: name.toString(),
        nick: nick.toString(),
        phone: phone.toString(),
      },
      where: {
        id: parseInt(contactId.toString()),
      },
    })

    return new Contact(
      new ContactId(contact?.id.toString()),
      new PersonName(contact?.name),
      new Nickname(contact?.nick),
      new PhoneNumber(contact?.phone)
    )
  }
}
