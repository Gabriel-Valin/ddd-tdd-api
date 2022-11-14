import { DomainError } from "@/Main/Error/DomainError"

export default class Nickname {
  constructor(private readonly nick: string) {
    const validLength = nick.length < 3
    if (validLength) {
      throw new DomainError("Nickname must be less than 3 characters")
    }

    const maxNicknameSize = nick.length > 16
    if (maxNicknameSize) {
      throw new DomainError("Nickname cannot must be more than 16 characters")
    }

    const expectedFormat = new RegExp("^\\w+$")
    const matchValue = expectedFormat.test(nick)

    if (!matchValue) {
      throw new DomainError("Nickname cannot have special characters")
    }

    this.nick = nick
  }

  public toString(): string {
    return this.nick
  }
}
