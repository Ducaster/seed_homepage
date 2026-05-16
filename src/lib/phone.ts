export const PHONE_INPUT_PATTERN = "010-?[0-9]{4}-?[0-9]{4}";
export const PHONE_FORMAT_MESSAGE =
  "연락처는 010-0000-0000 형식으로 입력해주세요.";

const mobilePhonePattern = /^010-?\d{4}-?\d{4}$/;

export function normalizePhoneNumber(value: string): string | null {
  const compact = value.trim().replace(/\s/g, "");
  if (!mobilePhonePattern.test(compact)) return null;

  const digits = compact.replace(/\D/g, "");
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
