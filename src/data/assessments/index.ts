/**
 * 검사 커리큘럼 정의
 */

export type AssessmentSlug =
  | "six-shapes"
  | "life-graph"
  | "personality"
  | "attachment"
  | "core-emotion";

export interface AssessmentInfo {
  slug: AssessmentSlug;
  order: number;
  title: string;
  subtitle: string;
  type: "drawing" | "survey" | "checkbox";
}

export const ASSESSMENTS: AssessmentInfo[] = [
  {
    slug: "six-shapes",
    order: 1,
    title: "6도형 검사",
    subtitle: "심층 성향 파악",
    type: "drawing",
  },
  {
    slug: "life-graph",
    order: 2,
    title: "인생그래프",
    subtitle: "삶의 궤적 시각화",
    type: "drawing",
  },
  {
    slug: "personality",
    order: 3,
    title: "성격유형 검사",
    subtitle: "에니어그램 성격 유형 분석",
    type: "survey",
  },
  {
    slug: "attachment",
    order: 4,
    title: "애착유형 검사",
    subtitle: "대인관계 패턴 및 정서적 유대 분석",
    type: "survey",
  },
  {
    slug: "core-emotion",
    order: 5,
    title: "핵심감정 검사",
    subtitle: "내면 감정 파악",
    type: "checkbox",
  },
];
