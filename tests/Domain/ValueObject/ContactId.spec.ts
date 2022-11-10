import ContactId from "@/Domain/ValueObject/ContactId"

describe("Nickname Value Object", () => {
  it("should returns throw if blank value", () => {
    expect(() => new ContactId("")).toThrow()
  })

  it("should returns throw if invalid value", () => {
    expect(() => new ContactId("invalidId")).toThrow()
  })

  it("should has toString method to get a value", () => {
    const method = new ContactId("10")
    expect(method.toString()).toBe("10")
  })
})
