export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string | null;
  gender: string;
  program: string;
  registeredAt: string;
  notes: string;
  deletedAt?: string | null;
  sessions: CoachingSession[];
  assessments: Assessment[];
}

export interface CoachingSession {
  id: string;
  date: string;
  sessionNumber: number;
  duration: number;
  content: string;
  notes: string;
}

export interface Assessment {
  id: string;
  toolName: string;
  date: string;
  result: string;
  notes: string;
}

export type GrowthStage = "acorn" | "seedling" | "oak" | "mature-oak";

export const GROWTH_STAGES: {
  key: GrowthStage;
  label: string;
  description: string;
  minSessions: number;
  color: string;
}[] = [
  {
    key: "acorn",
    label: "도토리",
    description: "가능성을 단단히 품은 시작점",
    minSessions: 0,
    color: "#A46A3F",
  },
  {
    key: "seedling",
    label: "어린 묘목",
    description: "새싹이 방향을 잡는 시기",
    minSessions: 6,
    color: "#16A34A",
  },
  {
    key: "oak",
    label: "참나무",
    description: "뿌리와 줄기가 단단해지는 성장기",
    minSessions: 10,
    color: "#15803D",
  },
  {
    key: "mature-oak",
    label: "성숙한 참나무",
    description: "자기 이해가 깊게 자리잡은 단계",
    minSessions: 13,
    color: "#36583A",
  },
];

export function getGrowthStage(sessionCount: number): GrowthStage {
  if (sessionCount >= 13) return "mature-oak";
  if (sessionCount >= 10) return "oak";
  if (sessionCount >= 6) return "seedling";
  return "acorn";
}

export function getGrowthStageInfo(sessionCount: number) {
  const stage = getGrowthStage(sessionCount);
  return GROWTH_STAGES.find((s) => s.key === stage)!;
}

export function getNextStageInfo(sessionCount: number) {
  const currentStage = getGrowthStage(sessionCount);
  const currentIndex = GROWTH_STAGES.findIndex((s) => s.key === currentStage);
  if (currentIndex >= GROWTH_STAGES.length - 1) return null;
  return GROWTH_STAGES[currentIndex + 1];
}
