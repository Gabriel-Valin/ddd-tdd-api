import PhoneNumber from "@/Domain/ValueObject/PhoneNumber"

describe("PhoneNumber Value Object", () => {
  it("should returns throw if invalid value", async () => {
    expect(() => new PhoneNumber("013ad0-5ja-g9s2ksd")).toThrow()
  })

  it("should returns throw if blank value", async () => {
    expect(() => new PhoneNumber("")).toThrow()
  })

  it("should has toString method to get a value", async () => {
    const phoneNumber = new PhoneNumber("(14)99692-8608")
    expect(phoneNumber.toString()).toBe("(14)99692-8608")
  })
})
