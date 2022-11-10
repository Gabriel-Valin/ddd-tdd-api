export default class Nickname {
  constructor(private readonly nick: string) {
    const validLength = nick.length < 3
    if (validLength) {
      throw new Error("Nickname must be less than 3 characters")
    }

    const maxNicknameSize = nick.length > 16
    if (maxNicknameSize) {
      throw new Error("Nickname cannot must be more than 16 characters")
    }

    const expectedFormat = new RegExp("^\\w+$")
    const matchValue = expectedFormat.test(nick)

    if (!matchValue) {
      throw new Error("Nickname cannot have special characters")
    }

    this.nick = nick
  }

  public toString(): string {
    return this.nick
  }
}
