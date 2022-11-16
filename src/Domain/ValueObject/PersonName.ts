import { DomainError } from "@/Main/Error/DomainError"

export default class PersonName {
  constructor(private readonly person: string) {
    if (!person) {
      throw new DomainError("NameIsRequired")
    }

    const validLength = person.length < 4
    if (validLength) {
      throw new DomainError("InvalidNameLenght")
    }

    this.person = person
  }

  public toString(): string {
    return this.person
  }
}
