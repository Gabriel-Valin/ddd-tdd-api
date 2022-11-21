import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import { ContactQueryRepositoryInterface } from "@/Domain/Repositories/ContactQueryRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"
import ContactQueryRepo from "@/Infra/Repository/ContactQueryRepo"
import { ApplicationError } from "@/Main/Error/ApplicationError"
import { faker } from "@faker-js/faker"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"

describe("AddCommandContactRepository", () => {
  let command: ContactCommandRepository
  let query: ContactQueryRepositoryInterface
  let validId: ContactId
  let validName: PersonName
  let validNick: Nickname
  let validPhone: PhoneNumber
  let longPersonName: PersonName

  beforeAll(async () => {
    command = new AddContactCommandRepo()
    query = new ContactQueryRepo()
    validId = new ContactId("1")
    validName = new PersonName("Gabriel Valin")
    validNick = new Nickname("gvt3ch")
    validPhone = new PhoneNumber("(14)996820000")
    longPersonName = new PersonName(faker.lorem.words(100))
  })

  afterAll(async () => {
    await prismaConnection.contact.deleteMany()
    await prismaConnection.$disconnect()
  })

  it("should returns Contact if no have error", async () => {
    const createContact = await command.addContact(
      new Contact(validId, validName, validNick, validPhone)
    )
    const findContact = await query.getContact(createContact.getId())
    expect(findContact?.getId()).toEqual(createContact.getId())
  })

  it("should return InfraError if repository failed", async () => {
    const promise = command.addContact(
      new Contact(validId, longPersonName, validNick, validPhone)
    )

    await expect(promise).rejects.toEqual(
      new ApplicationError("Not able to create a new contact", 500)
    )
  })
})
