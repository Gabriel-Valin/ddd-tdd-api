import Nickname from "@/Domain/ValueObject/Nickname"

describe("Nickname Value Object", () => {
  it("should returns throw if blank value", () => {
    expect(() => new Nickname("")).toThrow()
  })

  it("should returns throw if value less than 3 in length", () => {
    expect(() => new Nickname("xo")).toThrow()
  })

  it("should returns throw if value more than 16 in length", () => {
    expect(() => new Nickname("morethan16characters")).toThrow()
  })

  it("should returns throw if value have special characters", () => {
    expect(() => new Nickname("!Special#%Cha_r*")).toThrow()
  })
})
