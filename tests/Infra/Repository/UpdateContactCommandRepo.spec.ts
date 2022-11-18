import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"
import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"

export type IUpdateContact = {
  contactId: ContactId
  name: PersonName
  nick: Nickname
  phone: PhoneNumber
}

export interface UpdateContactRepository {
  updateContact({
    contactId,
    name,
    nick,
    phone,
  }: IUpdateContact): Promise<Contact>
}

export default class UpdateContactCommandRepo {
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

const makeSut = (): UpdateContactRepository => {
  const sut = new UpdateContactCommandRepo()
  return sut
}

describe("QueryContactRepository", () => {
  let command: ContactCommandRepository
  let contactId: ContactId
  let name: PersonName
  let nick: Nickname
  let phone: PhoneNumber
  let prismaContact: Contact
  let contact: Contact

  beforeAll(async () => {
    command = new AddContactCommandRepo()
    contactId = new ContactId("399")
    name = new PersonName("Thais Fernandes")
    nick = new Nickname("tha1s")
    phone = new PhoneNumber("(14)199990000")
    contact = new Contact(contactId, name, nick, phone)
    prismaContact = await command.addContact(contact)
  })

  afterAll(async () => {
    await prismaConnection.contact.deleteMany()
  })

  it("should returns Contact if record has been changed with succesfull", async () => {
    const id = new ContactId(prismaContact.getId().toString())
    const sut = makeSut()
    const contact = await sut.updateContact({
      contactId: id,
      name,
      nick,
      phone,
    })

    expect(contact).toBeInstanceOf(Contact)
    expect(contact).toHaveProperty("id")
    expect(contact).toHaveProperty("name")
  })
})
