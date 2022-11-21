import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"
import { ApplicationError } from "@/Main/Error/ApplicationError"
import { DomainError } from "@/Main/Error/DomainError"
import AddContactController from "@/Presentation/Api/Controller/Contact/AddContactController"

jest.mock("@/Infra/Repository/AddContactCommandRepo")

const makeSut = (): AddContactController => {
  const sut = new AddContactController()
  return sut
}

describe("AddContactController", () => {
  it("should return 201 if correct params is provided", async () => {
    const sut = makeSut()
    const response = await sut.handle({
      name: "Gabriel Valin",
      nick: "gvt3ch",
      phone: "(14)996928602"
    })

    expect(response.statusCode).toBe(201)
  })

  it("should not able to handle controller if no params is invalid", async () => {
    const sut = makeSut()
    const promise = sut.handle({
      name: "Gabriel Valin",
      nick: "gv",
      phone: "14996980000"
    })

    await expect(promise).rejects.toEqual(
      new DomainError("NicknameCannotBeLessThan3Characters")
    )
  })

  it("should return 500 if have infra error", async () => {
    jest
      .spyOn(AddContactCommandRepo.prototype, "addContact")
      .mockImplementationOnce(() => {
        throw new ApplicationError("Not able to create a new contact", 500)
      })

    const sut = makeSut()

    const response = sut.handle({
      name: "Gabriel Valin",
      nick: "gvt3ch",
      phone: "(14)996928602"
    })

    expect(response).rejects.toEqual(
      new ApplicationError("Not able to create a new contact", 500)
    )
  })
})
