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

export type GrowthStage = "seed" | "sprout" | "young-zelkova" | "zelkova";

export const GROWTH_STAGES: {
  key: GrowthStage;
  label: string;
  description: string;
  minSessions: number;
  color: string;
}[] = [
  {
    key: "seed",
    label: "씨앗",
    description: "가능성을 품고 조용히 준비하는 시작점",
    minSessions: 0,
    color: "#9A6A3A",
  },
  {
    key: "sprout",
    label: "새싹",
    description: "자기 이해가 고개를 내미는 시기",
    minSessions: 6,
    color: "#4F9F63",
  },
  {
    key: "young-zelkova",
    label: "어린 느티나무",
    description: "방향을 잡고 뿌리를 깊게 내리는 성장기",
    minSessions: 10,
    color: "#2F7D52",
  },
  {
    key: "zelkova",
    label: "느티나무",
    description: "스스로 그늘을 만들 만큼 단단해진 단계",
    minSessions: 13,
    color: "#285C45",
  },
];

export function getGrowthStage(sessionCount: number): GrowthStage {
  if (sessionCount >= 13) return "zelkova";
  if (sessionCount >= 10) return "young-zelkova";
  if (sessionCount >= 6) return "sprout";
  return "seed";
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
