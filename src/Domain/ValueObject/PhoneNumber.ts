export default class PhoneNumber {
  constructor(private readonly phoneNumber: string) {
    const validLength = phoneNumber.length < 13
    if (validLength) {
      throw new Error("PhoneNumber length invalid")
    }

    const expectedFormat = new RegExp(
      "^\\((14|15|17|18|16)\\)(\\s\\d{9}|\\d{9}|(\\s|)\\d{5}-\\d{4})$"
    )

    const matchValue = expectedFormat.test(phoneNumber)
    if (!matchValue) {
      throw new Error("PhoneNumber must follow PT-BR format")
    }

    this.phoneNumber = phoneNumber
  }

  public toString(): string {
    return this.phoneNumber
  }
}
