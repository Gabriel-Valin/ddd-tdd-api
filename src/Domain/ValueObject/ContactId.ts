export default class ContactId {
  constructor(private readonly id: string) {
    const expectedFormat = new RegExp("^\\d{1,}$")
    const matchValue = expectedFormat.test(id)

    if (!matchValue) {
      throw new Error("ContactId must be a valid value")
    }

    this.id = id
  }

  public toString(): string {
    return this.id
  }
}
