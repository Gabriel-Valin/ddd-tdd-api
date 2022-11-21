import Contact from "@/Domain/Entities/Contact"
import {
  IUpdateContact,
  UpdateContactRepository
} from "@/Domain/Repositories/UpdateContactRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"
import { ApplicationError } from "@/Main/Error/ApplicationError"

export class UpdateContactCommandRepo implements UpdateContactRepository {
  public async updateContact(contact: Contact): Promise<Contact> {
    try {
      const updateContact = await prismaConnection.contact.update({
        data: {
          name: contact.getName().toString(),
          nick: contact.getNick().toString(),
          phone: contact.getPhone().toString()
        },
        where: {
          id: parseInt(contact.getId().toString())
        }
      })

      return new Contact(
        new ContactId(updateContact?.id.toString()),
        new PersonName(updateContact?.name),
        new Nickname(updateContact?.nick),
        new PhoneNumber(updateContact?.phone)
      )
    } catch (error) {
      throw new ApplicationError("Not able to update the contact", 500)
    }
  }
}
