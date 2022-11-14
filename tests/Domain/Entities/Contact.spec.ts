import Contact from "@/Domain/Entities/Contact"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"

describe("Contact Entity", () => {
  let validContactObject: Contact

  beforeAll(() => {
    validContactObject = new Contact(
      new ContactId("1"),
      new PersonName("Gabriel Valin"),
      new Nickname("gvt3ch"),
      new PhoneNumber("(14)999999999")
    )
  })

  it("should returns throw if ContactId returns error", () => {
    expect(
      () =>
        new Contact(
          new ContactId("notvalidId"),
          new PersonName("Gabriel Valin"),
          new Nickname("gvt3ch"),
          new PhoneNumber("(14)999999999")
        )
    ).toThrow()
  })

  it("should returns throw if PersonName returns error", () => {
    expect(
      () =>
        new Contact(
          new ContactId("1"),
          new PersonName("jao"),
          new Nickname("gvt3ch"),
          new PhoneNumber("(14)999999999")
        )
    ).toThrow()
  })

  it("should returns throw if Nickname returns error", () => {
    expect(
      () =>
        new Contact(
          new ContactId("1"),
          new PersonName("Gabriel Valin"),
          new Nickname("$peci4l_char$"),
          new PhoneNumber("(14)999999999")
        )
    ).toThrow()
  })

  it("should returns throw if PhoneNumber returns error", () => {
    expect(
      () =>
        new Contact(
          new ContactId("1"),
          new PersonName("Gabriel Valin"),
          new Nickname("gvt3ch"),
          new PhoneNumber("invalidNumber")
        )
    ).toThrow()
  })

  it("should returns an object of Contact kind", () => {
    expect(
      new Contact(
        new ContactId("1"),
        new PersonName("Gabriel Valin"),
        new Nickname("gvt3ch"),
        new PhoneNumber("(14)999999999")
      )
    ).toEqual(validContactObject)
  })

  it("should have an public method toJson to called", () => {
    const method = new Contact(
      new ContactId("1"),
      new PersonName("Gabriel Valin"),
      new Nickname("gvt3ch"),
      new PhoneNumber("(14)999999999")
    )

    expect(method.toJson).toBeDefined()
  })

  it("should have an public method toJson to called", () => {
    const method = new Contact(
      new ContactId("1"),
      new PersonName("Gabriel Valin"),
      new Nickname("gvt3ch"),
      new PhoneNumber("(14)999999999")
    )

    expect(method.toJson()).toEqual({
      id: "1",
      name: "Gabriel Valin",
      nick: "gvt3ch",
      phone: "(14)999999999",
    })
  })
})
