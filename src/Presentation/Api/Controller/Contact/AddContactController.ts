import Contact from "@/Domain/Entities/Contact"
import AddContactCommandInteractor from "@/Domain/Usecases/AddContact"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { AddContactCommandRepo } from "@/Infra/Repository/AddContactCommandRepo"
import { Controller, Response } from "@/Presentation/Api/Controller/Controller"

type IRequest = {
  name: string
  nick: string
  phone: string
}

export default class AddContactController implements Controller {
  public async handle({ name, nick, phone }: IRequest): Promise<Response> {
    const contact = this.validateContact({ name, nick, phone })
    const contactCommandRepo = new AddContactCommandRepo()
    const createContactCommandInteractor = new AddContactCommandInteractor(
      contactCommandRepo
    )
    await createContactCommandInteractor.action(contact)
    return {
      statusCode: 201
    }
  }

  private validateContact({ name, nick, phone }: IRequest): Contact {
    const contact = new Contact(
      new ContactId("999"),
      new PersonName(name),
      new Nickname(nick),
      new PhoneNumber(phone)
    )
    return contact
  }
}
