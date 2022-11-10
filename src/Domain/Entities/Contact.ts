import Nickname from "@/Domain/ValueObject/Nickname"
import PersonName from "@/Domain/ValueObject/PersonName"
import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"
import ContactId from "@/Domain/ValueObject/ContactId"

export default class Contact {
  constructor(
    private readonly id: ContactId,
    private readonly name: PersonName,
    private readonly nick: Nickname,
    private readonly phone: PhoneNumber
  ) {}

  public getId(): ContactId {
    return this.id
  }

  public getName(): PersonName {
    return this.name
  }

  public getNick(): Nickname {
    return this.nick
  }

  public getPhone(): PhoneNumber {
    return this.phone
  }
}
