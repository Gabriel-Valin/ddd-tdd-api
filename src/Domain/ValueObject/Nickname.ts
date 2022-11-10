export default class Nickname {
  constructor(private readonly nickname: string) {
    const validLength = nickname.length < 3
    if (validLength) {
      throw new Error("Nickname must be less than 3 characters")
    }

    const maxNicknameSize = nickname.length > 16
    if (maxNicknameSize) {
      throw new Error("Nickname cannot must be more than 16 characters")
    }

    const expectedFormat = new RegExp("^\\w+$")
    const matchValue = expectedFormat.test(nickname)

    if (!matchValue) {
      throw new Error("Nickname cannot have special characters")
    }

    this.nickname = nickname
  }

  public toString(): string {
    return this.nickname
  }
}
