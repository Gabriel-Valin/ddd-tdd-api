import Contact from "@/Domain/Entities/Contact"
import UpdateContactInteractor from "@/Domain/Usecases/UpdateContact"
import ContactId from "@/Domain/ValueObject/ContactId"
import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import { UpdateContactCommandRepo } from "@/Infra/Repository/UpdateContactCommandRepo"
import { Controller, Response } from "@/Presentation/Api/Controller/Controller"

type IRequest = {
  contactId: string
  name: string
  nick: string
  phone: string
}

export default class UpdateContactController implements Controller {
  public async handle({
    contactId,
    name,
    nick,
    phone
  }: IRequest): Promise<Response> {
    const contact = this.validateContact({ contactId, name, nick, phone })
    const updateRepo = new UpdateContactCommandRepo()
    const updateInteractor = new UpdateContactInteractor(updateRepo)
    await updateInteractor.action(contact)
    return {
      statusCode: 204
    }
  }
  private validateContact({ contactId, name, nick, phone }: IRequest): Contact {
    const contact = new Contact(
      new ContactId(contactId),
      new PersonName(name),
      new Nickname(nick),
      new PhoneNumber(phone)
    )
    return contact
  }
}
