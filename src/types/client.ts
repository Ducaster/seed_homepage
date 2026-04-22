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
    description: "코칭 여정의 시작",
    minSessions: 0,
    color: "#C9A07A",
  },
  {
    key: "seedling",
    label: "어린 묘목",
    description: "성장의 싹이 트다",
    minSessions: 6,
    color: "#7BA380",
  },
  {
    key: "oak",
    label: "참나무",
    description: "단단한 뿌리를 내리다",
    minSessions: 10,
    color: "#547E68",
  },
  {
    key: "mature-oak",
    label: "성숙한 참나무",
    description: "깊은 성찰과 변화",
    minSessions: 13,
    color: "#9C5030",
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
  const currentIndex = GROWTH_STAGES.findIndex(
    (s) => s.key === currentStage
  );
  if (currentIndex >= GROWTH_STAGES.length - 1) return null;
  return GROWTH_STAGES[currentIndex + 1];
}
