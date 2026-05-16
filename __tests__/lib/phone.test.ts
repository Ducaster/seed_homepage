import { describe, expect, it } from "vitest";
import { normalizePhoneNumber } from "@/lib/phone";

describe("normalizePhoneNumber", () => {
  it("accepts hyphenated mobile phone numbers", () => {
    expect(normalizePhoneNumber("010-1234-5678")).toBe("010-1234-5678");
  });

  it("accepts compact mobile phone numbers and formats them", () => {
    expect(normalizePhoneNumber("01012345678")).toBe("010-1234-5678");
  });

  it("rejects invalid phone number formats", () => {
    expect(normalizePhoneNumber("02-1234-5678")).toBeNull();
    expect(normalizePhoneNumber("010-123-5678")).toBeNull();
    expect(normalizePhoneNumber("010-12345-6789")).toBeNull();
  });
});
