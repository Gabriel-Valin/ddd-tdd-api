import { DomainError } from "@/Main/Error/DomainError"

export default class Nickname {
  constructor(private readonly nick: string) {
    const validLength = nick.length < 3
    if (validLength) {
      throw new DomainError("NicknameCannotBeLessThan3Characters")
    }

    const maxNicknameSize = nick.length > 16
    if (maxNicknameSize) {
      throw new DomainError("NicknameCannotBeMoreThan16Characters")
    }

    const expectedFormat = new RegExp("^\\w+$")
    const matchValue = expectedFormat.test(nick)

    if (!matchValue) {
      throw new DomainError("NicknameCannotHaveSpecialCharacters")
    }

    this.nick = nick
  }

  public toString(): string {
    return this.nick
  }
}
