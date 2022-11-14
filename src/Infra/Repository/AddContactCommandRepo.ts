import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "../Utils/Prisma/Connection"

export default class AddContactCommandRepo implements ContactCommandRepository {
  public async addContact(contact: Contact): Promise<Contact> {
    try {
      const result = await prismaConnection.contact.create({
        data: {
          name: contact.getName().toString(),
          nick: contact.getNick().toString(),
          phone: contact.getPhone().toString(),
        },
      })
      return new Contact(
        new ContactId(String(result?.id)),
        new PersonName(result?.name),
        new Nickname(result?.nick),
        new PhoneNumber(result?.phone)
      )
    } catch (error) {
      throw new Error("Not able to create a new contact")
    }
  }
}
