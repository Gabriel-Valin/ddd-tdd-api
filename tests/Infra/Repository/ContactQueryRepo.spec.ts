import Contact from "@/Domain/Entities/Contact"
import ContactId from "@/Domain/ValueObject/ContactId"
import ContactQueryRepo from "@/Infra/Repository/ContactQueryRepo"

const makeSut = (): ContactQueryRepo => {
  const sut = new ContactQueryRepo()
  return sut
}

describe("QueryContactRepository", () => {
  let validId: ContactId
  let invalidId: ContactId

  beforeAll(() => {
    validId = new ContactId("399")
    invalidId = new ContactId("1")
  })

  it("should returns Contact if found contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(validId)

    expect(contact).toHaveProperty("id")
    expect(contact).toHaveProperty("name")
  })

  it("should returns instanceof Contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(validId)

    expect(contact).toBeInstanceOf(Contact)
  })

  it("should returns undefined if not found contact", async () => {
    const sut = makeSut()
    const contact = await sut.getContact(invalidId)

    expect(contact).toBeUndefined()
  })
})
