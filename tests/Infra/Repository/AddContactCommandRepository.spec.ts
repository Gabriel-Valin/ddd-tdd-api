import Contact from "@/Domain/Entities/Contact"
import ContactCommandRepository from "@/Domain/Repositories/ContactCommandRepositoryInterface"
import { ContactQueryRepositoryInterface } from "@/Domain/Repositories/ContactQueryRepositoryInterface"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import AddContactCommandRepo from "@/Infra/Repository/AddContactCommandRepo"
import ContactQueryRepo from "@/Infra/Repository/ContactQueryRepo"

describe("AddCommandContactRepository", () => {
  let command: ContactCommandRepository
  let query: ContactQueryRepositoryInterface
  let validId: ContactId
  let validName: PersonName
  let validNick: Nickname
  let validPhone: PhoneNumber

  beforeAll(() => {
    command = new AddContactCommandRepo()
    query = new ContactQueryRepo()
    validId = new ContactId("889")
    validName = new PersonName("Gabriel Valin")
    validNick = new Nickname("gvt3ch")
    validPhone = new PhoneNumber("(14)996820000")
  })

  it("should returns undefined if no have error", async () => {
    const createContact = await command.addContact(
      new Contact(validId, validName, validNick, validPhone)
    )
    const findContact = await query.getContact(createContact.getId())
    expect(findContact?.getId()).toEqual(createContact.getId())
  })
})
