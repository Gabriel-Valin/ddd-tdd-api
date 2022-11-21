import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import ContactQueryRepo from "@/Infra/Repository/ContactQueryRepo"
import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"

const makeSut = (): ContactQueryRepo => {
  const sut = new ContactQueryRepo()
  return sut
}

describe("QueryContactRepository", () => {
  let command: ContactCommandRepository
  let validId: ContactId
  let invalidId: ContactId
  let validName: PersonName
  let validNick: Nickname
  let validPhone: PhoneNumber
  let prismaContact: Contact
  let contact: Contact

  beforeAll(async () => {
    command = new AddContactCommandRepo()
    invalidId = new ContactId("999999999")
    validName = new PersonName("Gabriel Vali2n")
    validNick = new Nickname("gvt3ch")
    validPhone = new PhoneNumber("(14)996820000")
    contact = new Contact(validId, validName, validNick, validPhone)
    prismaContact = await command.addContact(contact)
  })

  afterAll(async () => {
    await prismaConnection.contact.deleteMany()
    await prismaConnection.$disconnect()
  })

  it("should returns Contact if found contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(
      new ContactId(prismaContact.getId().toString())
    )

    expect(contact).toHaveProperty("id")
    expect(contact).toHaveProperty("name")
  })

  it("should returns instanceof Contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(
      new ContactId(prismaContact.getId().toString())
    )

    expect(contact).toBeInstanceOf(Contact)
  })

  it("should returns undefined if not found contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(invalidId)

    expect(contact).toBeUndefined()
  })
})
