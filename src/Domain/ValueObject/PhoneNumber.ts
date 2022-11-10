export default class PhoneNumber {
  constructor(private readonly phone: string) {
    const validLength = phone.length < 13
    if (validLength) {
      throw new Error("PhoneNumber length invalid")
    }

    const expectedFormat = new RegExp(
      "^\\((14|15|17|18|16)\\)(\\s\\d{9}|\\d{9}|(\\s|)\\d{5}-\\d{4})$"
    )

    const matchValue = expectedFormat.test(phone)
    if (!matchValue) {
      throw new Error("PhoneNumber must follow PT-BR format")
    }

    this.phone = phone
  }

  public toString(): string {
    return this.phone
  }
}
