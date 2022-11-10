export default class PersonName {
  constructor(private readonly person: string) {
    const validLength = person.length < 4
    if (validLength) {
      throw new Error("Invalid length person name")
    }

    this.person = person
  }

  public toString(): string {
    return this.person
  }
}
