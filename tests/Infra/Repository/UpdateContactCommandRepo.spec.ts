import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"
import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"
import { UpdateContactRepository } from "@/Domain/Repositories/UpdateContactRepositoryInterface"
import UpdateContactCommandRepo from "@/Infra/Repository/UpdateContactCommandRepo"

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
