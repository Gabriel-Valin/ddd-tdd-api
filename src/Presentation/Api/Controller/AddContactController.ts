import Contact from "@/Domain/Entities/Contact"
import AddContactCommandInteractor from "@/Domain/Usecases/AddContact"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import AddContactCommandRepo from "@/Infra/Repository/AddContactCommandRepo"
import { Request, Response } from "express"

export default class AddContactController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const contact = this.validateContact(req.body)
    const contactCommandRepo = new AddContactCommandRepo()
    const createContactCommandInteractor = new AddContactCommandInteractor(
      contactCommandRepo
    )

    const result = await createContactCommandInteractor.action(contact)

    return res.status(201).json(result)
  }

  private validateContact(body: any): Contact {
    const { name, nick, phone } = body
    return new Contact(
      new ContactId("999"),
      new PersonName(name),
      new Nickname(nick),
      new PhoneNumber(phone)
    )
  }
}
