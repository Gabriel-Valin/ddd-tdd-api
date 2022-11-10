import PersonName from "@/Domain/ValueObject/PersonName"

describe("PersonName Value Object", () => {
  it("should returns throw if blank value", () => {
    expect(() => new PersonName("")).toThrow()
  })

  it("should returns throw if value less than 4 in length", () => {
    expect(() => new PersonName("jao")).toThrow()
  })

  it("should has toString method to get a value", () => {
    const method = new PersonName("Gabriel Valin")
    expect(method.toString()).toBe("Gabriel Valin")
  })
})
