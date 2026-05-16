export const programs = [
  {
    id: "seed-coaching",
    name: "SEED-코칭",
    theme: "1:1 성장 코칭",
    icon: "Sprout",
    description:
      "검사와 대화를 바탕으로 자기 이해를 깊게 하고, 내담자의 다음 성장을 함께 설계하는 SEED의 기본 코칭 프로그램입니다.",
    duration: "60분",
    frequency: "주 1회 · 맞춤 진행",
    participantType: "개인",
    color: "var(--color-seed-green-600)",
    gradientTo: "#285C45",
  },
] as const;

export const DEFAULT_PROGRAM_NAME = "SEED-코칭";

const programNameAliases: Record<string, string> = {
  "마음 탕후루": DEFAULT_PROGRAM_NAME,
  "너와나의 주파수": DEFAULT_PROGRAM_NAME,
  "인간관계 먼지떨이": DEFAULT_PROGRAM_NAME,
  "둥글둥글 행성": DEFAULT_PROGRAM_NAME,
  "아리스토텔레스의 도토리": DEFAULT_PROGRAM_NAME,
  "아리스토텔레스의 씨앗": DEFAULT_PROGRAM_NAME,
};

export function normalizeProgramName(programName: string): string {
  const trimmed = programName.trim();
  if (!trimmed) return "";
  if (programs.some((program) => program.name === trimmed)) return trimmed;
  return programNameAliases[trimmed] ?? DEFAULT_PROGRAM_NAME;
}
