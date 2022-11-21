import { UpdateContactCommandRepo } from "@/Infra/Repository/UpdateContactCommandRepo"
import { prismaConnection } from "@/Infra/Utils/Prisma/Connection"
import { ApplicationError } from "@/Main/Error/ApplicationError"
import { DomainError } from "@/Main/Error/DomainError"
import UpdateContactController from "@/Presentation/Api/Controller/Contact/UpdateContactController"
import { faker } from "@faker-js/faker"
import { Contact as prismaContact } from "@prisma/client"

const makeSut = (): UpdateContactController => {
  const sut = new UpdateContactController()
  return sut
}

describe("UpdateContactController", () => {
  let newContact: prismaContact

  beforeEach(async () => {
    newContact = await prismaConnection.contact.create({
      data: {
        name: "Gabriel Valin",
        nick: "gvt3ch",
        phone: "(14)986770900"
      }
    })
  })

  it("should not able to handle controller if no params is invalid", async () => {
    const sut = makeSut()
    const promise = sut.handle({
      contactId: "1",
      name: "Gabriel Valin",
      nick: "gv",
      phone: "14996980000"
    })

    await expect(promise).rejects.toEqual(
      new DomainError("NicknameCannotBeLessThan3Characters")
    )
  })

  it("should return 500 if have infra error", async () => {
    const sut = makeSut()

    const response = sut.handle({
      contactId: String(newContact.id),
      name: faker.lorem.words(100),
      nick: "gvt3ch",
      phone: "(14)996928602"
    })

    expect(response).rejects.toEqual(
      new ApplicationError("Not able to update the contact", 500)
    )
  })

  it("should return 204 if contact has been updated", async () => {
    const sut = makeSut()
    const updatedContact = await sut.handle({
      contactId: String(newContact.id),
      name: "Thais FernandeS GV",
      nick: "Thais1gv_",
      phone: "(14)998820000"
    })

    expect(updatedContact.statusCode).toBe(204)
    expect(updatedContact.data).toEqual({
      id: String(newContact.id),
      name: "Thais FernandeS GV",
      nick: "Thais1gv_",
      phone: "(14)998820000"
    })
  })
})
