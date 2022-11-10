export default class ContactId {
  constructor(private readonly contactId: string) {
    const expectedFormat = new RegExp("^\\d{1,}$")
    const matchValue = expectedFormat.test(contactId)

    if (!matchValue) {
      throw new Error("ContactId must be a valid value")
    }

    this.contactId = contactId
  }

  public toString(): string {
    return this.contactId
  }
}
