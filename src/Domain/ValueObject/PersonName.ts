export default class PersonName {
  constructor(private readonly personName: string) {
    const validLength = personName.length < 4
    if (validLength) {
      throw new Error("Invalid length person name")
    }

    this.personName = personName
  }

  public toString(): string {
    return this.personName
  }
}
