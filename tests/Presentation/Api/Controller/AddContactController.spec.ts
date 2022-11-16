import { DomainError } from "@/Main/Error/DomainError"
import AddContactController from "@/Presentation/Api/Controller/AddContactController"
import { Controller } from "@/Presentation/Api/Controller/Controller"

describe("AddContactController", () => {
  let controller: Controller

  beforeAll(() => {
    controller = new AddContactController()
  })

  it("should returns 201 if contact created", async () => {
    const response = await controller.handle({
      name: "Gabriel Valin",
      nick: "gckad_",
      phone: "(14)992910919",
    })
    expect(response.statusCode).toBe(201)
  })

  it("should returns 400 if contact not created (invalid name)", async () => {
    await expect(
      controller.handle({
        name: "Gab",
        nick: "gckad_",
        phone: "(14)992910919",
      })
    ).rejects.toEqual(new DomainError("InvalidNameLenght"))
  })

  it("should returns 400 if contact not created (invalid nick)", async () => {
    await expect(
      controller.handle({
        name: "Gabriel Valin",
        nick: "gc$$_#ADSAD_",
        phone: "(14)992910919",
      })
    ).rejects.toEqual(new DomainError("NicknameCannotHaveSpecialCharacters"))
  })

  it("should returns 400 if contact not created (invalid phone)", async () => {
    await expect(
      controller.handle({
        name: "Gabriel Valin",
        nick: "gvt3ch_",
        phone: "14992910919",
      })
    ).rejects.toEqual(new DomainError("InvalidPhoneNumberLength"))
  })

  it("should returns 500 if error equals internal server error", async () => {
    jest.spyOn(controller, "handle").mockResolvedValue({ statusCode: 500 })
    const response = await controller.handle({
      name: "Gabriel Valin",
      nick: "gvt3ch_",
      phone: "14992910919",
    })
    expect(response.statusCode).toBe(500)
  })
})
