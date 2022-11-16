import { DomainError } from "@/Main/Error/DomainError"

export default class ContactId {
  constructor(private readonly id: string) {
    const expectedFormat = new RegExp("^\\d{1,}$")
    const matchValue = expectedFormat.test(id)

    if (!matchValue) {
      throw new DomainError("InvalidContactId")
    }

    this.id = id
  }

  public toString(): string {
    return this.id
  }
}
