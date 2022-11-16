import { DomainError } from "@/Main/Error/DomainError"

export default class PhoneNumber {
  constructor(private readonly phone: string) {
    const validLength = phone.length < 13
    if (validLength) {
      throw new DomainError("InvalidPhoneNumberLength")
    }

    const expectedFormat = new RegExp(
      "^\\((14|15|17|18|16)\\)(\\s\\d{9}|\\d{9}|(\\s|)\\d{5}-\\d{4})$"
    )

    const matchValue = expectedFormat.test(phone)
    if (!matchValue) {
      throw new DomainError("InvalidPhoneNumberLength")
    }

    this.phone = phone
  }

  public toString(): string {
    return this.phone
  }
}
