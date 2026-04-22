/**
 * 검사 채점/분석 로직
 *
 * - 에니어그램 성격유형 (99문항)
 * - 성인애착유형 ECR-R (36문항)
 * - 핵심감정 (16유형 체크박스)
 */

import { TYPE_ORDER, QUESTIONS_PER_GROUP } from "@/data/assessments/personality-test";
import type { EnneagramTypeInfo } from "@/data/assessments/enneagram-types";
import { ENNEAGRAM_TYPES } from "@/data/assessments/enneagram-types";
import { ATTACHMENT_QUESTIONS } from "@/data/assessments/attachment-test";
import type { AttachmentType } from "@/data/assessments/attachment-test";
import { ATTACHMENT_TYPE_INFO } from "@/data/assessments/attachment-test";

// ─── 에니어그램 채점 ────────────────────────────────────

export interface EnneagramResult {
  /** 유형별 원점수 (1~9) */
  scores: Record<number, number>;
  /** 주 유형 번호 */
  mainType: number;
  /** 주 유형 상세 정보 */
  mainTypeInfo: EnneagramTypeInfo;
  /** 날개 유형 번호 */
  wing: number;
  /** 날개 유형 상세 정보 */
  wingInfo: EnneagramTypeInfo;
  /** 통합 방향 유형 */
  integrationTo: number;
  /** 분열 방향 유형 */
  disintegrationTo: number;
  /** 유형별 백분율 (시각화용) */
  percentages: Record<number, number>;
}

/**
 * 에니어그램 99문항 채점
 *
 * @param answers 99개 응답 (1~5 리커트 척도), 인덱스 0~98
 *   - 그룹 0(문항 0~10) → 유형 8
 *   - 그룹 1(문항 11~21) → 유형 9
 *   - ...
 *   - 각 그룹의 마지막(index 10) = ※ 역채점
 */
export function scoreEnneagram(answers: number[]): EnneagramResult {
  const scores: Record<number, number> = {};

  for (let groupIdx = 0; groupIdx < 9; groupIdx++) {
    const enneagramType = TYPE_ORDER[groupIdx]; // 8, 9, 1, 2, 3, 4, 5, 6, 7
    let total = 0;

    for (let qIdx = 0; qIdx < QUESTIONS_PER_GROUP; qIdx++) {
      const answerIdx = groupIdx * QUESTIONS_PER_GROUP + qIdx;
      const raw = answers[answerIdx] ?? 3; // 미응답은 중간값 3

      // 마지막 문항(qIdx === 10)은 역채점
      const value = qIdx === 10 ? (6 - raw) : raw;
      total += value;
    }

    scores[enneagramType] = total;
  }

  // 최대 가능 점수: 11문항 × 5점 = 55점
  const maxScore = QUESTIONS_PER_GROUP * 5;

  // 백분율 계산
  const percentages: Record<number, number> = {};
  for (let t = 1; t <= 9; t++) {
    percentages[t] = Math.round((scores[t] / maxScore) * 100);
  }

  // 주 유형: 최고 점수
  const mainType = findHighestType(scores);
  const mainTypeInfo = ENNEAGRAM_TYPES[mainType];

  // 날개: 인접 유형 중 더 높은 점수
  const wing = findWing(mainType, scores);
  const wingInfo = ENNEAGRAM_TYPES[wing];

  return {
    scores,
    mainType,
    mainTypeInfo,
    wing,
    wingInfo,
    integrationTo: mainTypeInfo.integrationTo,
    disintegrationTo: mainTypeInfo.disintegrationTo,
    percentages,
  };
}

function findHighestType(scores: Record<number, number>): number {
  let maxType = 1;
  let maxScore = 0;
  for (let t = 1; t <= 9; t++) {
    if (scores[t] > maxScore) {
      maxScore = scores[t];
      maxType = t;
    }
  }
  return maxType;
}

function findWing(mainType: number, scores: Record<number, number>): number {
  // 에니어그램 원형: 1-2-3-4-5-6-7-8-9-1...
  const left = mainType === 1 ? 9 : mainType - 1;
  const right = mainType === 9 ? 1 : mainType + 1;
  return scores[left] >= scores[right] ? left : right;
}

// ─── 애착유형 채점 ──────────────────────────────────────

export interface AttachmentResult {
  /** 회피 차원 평균 (1~5) */
  avoidanceMean: number;
  /** 불안 차원 평균 (1~5) */
  anxietyMean: number;
  /** 분류된 애착유형 */
  type: AttachmentType;
  /** 유형 한국어 라벨 */
  label: string;
  /** 유형 설명 */
  description: string;
  /** 개별 문항 점수 (디버깅/상세보기용) */
  itemScores: { number: number; raw: number; scored: number; dimension: string }[];
}

/**
 * 애착유형 36문항 채점 (ECR-R 기반)
 *
 * @param answers 36개 응답 (1~5 리커트 척도), 인덱스 0~35
 *
 * 홀수 문항(1,3,5,...) → 회피 차원
 * 짝수 문항(2,4,6,...) → 불안 차원
 * 역채점 문항: 3,15,19,25,27,29,33,35 (회피), 22 (불안)
 *
 * 분류 기준 (중앙값 3.0):
 *   불안 ≤ 3 & 회피 ≤ 3 → 안정형 (secure)
 *   불안 > 3 & 회피 ≤ 3 → 불안형 (anxious)
 *   불안 ≤ 3 & 회피 > 3 → 회피형 (avoidant)
 *   불안 > 3 & 회피 > 3 → 공포형 (fearful)
 */
export function scoreAttachment(answers: number[]): AttachmentResult {
  const avoidanceScores: number[] = [];
  const anxietyScores: number[] = [];
  const itemScores: AttachmentResult["itemScores"] = [];

  for (const q of ATTACHMENT_QUESTIONS) {
    const raw = answers[q.number - 1] ?? 3;
    const scored = q.isReverse ? (6 - raw) : raw;

    itemScores.push({
      number: q.number,
      raw,
      scored,
      dimension: q.dimension,
    });

    if (q.dimension === "avoidance") {
      avoidanceScores.push(scored);
    } else {
      anxietyScores.push(scored);
    }
  }

  const avoidanceMean = mean(avoidanceScores);
  const anxietyMean = mean(anxietyScores);

  const CUTOFF = 3.0;
  let type: AttachmentType;

  if (anxietyMean <= CUTOFF && avoidanceMean <= CUTOFF) {
    type = "secure";
  } else if (anxietyMean > CUTOFF && avoidanceMean <= CUTOFF) {
    type = "anxious";
  } else if (anxietyMean <= CUTOFF && avoidanceMean > CUTOFF) {
    type = "avoidant";
  } else {
    type = "fearful";
  }

  const info = ATTACHMENT_TYPE_INFO[type];

  return {
    avoidanceMean: round2(avoidanceMean),
    anxietyMean: round2(anxietyMean),
    type,
    label: info.label,
    description: info.description,
    itemScores,
  };
}

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ─── 핵심감정 분석 ──────────────────────────────────────

export interface CoreEmotionResult {
  /** 유형별 선택 개수 */
  typeCounts: { typeId: number; title: string; count: number }[];
  /** 가장 많이 선택된 유형들 (상위 3개) */
  dominantTypes: { typeId: number; title: string; count: number }[];
  /** 총 선택 항목 수 */
  totalSelected: number;
  /** 카테고리별 선택 분포 */
  categoryBreakdown: Record<string, number>;
}

/**
 * 핵심감정 검사 분석
 *
 * @param selections 유형별 선택된 항목 맵 { [typeId]: string[] }
 *
 * 16개 유형 각각에서 체크된 항목 수를 기반으로
 * 가장 두드러진 감정 유형을 파악
 */
export function scoreCoreEmotion(
  selections: Record<number, string[]>
): CoreEmotionResult {
  const typeCounts: CoreEmotionResult["typeCounts"] = [];
  let totalSelected = 0;
  const categoryBreakdown: Record<string, number> = {
    "대인관계": 0,
    "가족관계": 0,
    "일과 공부": 0,
    "나의 감정": 0,
  };

  for (let typeId = 1; typeId <= 16; typeId++) {
    const selected = selections[typeId] ?? [];
    typeCounts.push({
      typeId,
      title: `감정 유형 ${typeId}`,
      count: selected.length,
    });
    totalSelected += selected.length;
  }

  // 카테고리별 분포는 selection에 카테고리 정보가 포함된 경우 계산
  // 단순 집계: 선택된 항목 문자열로 매칭
  // (실제 카테고리 매핑은 UI에서 처리하거나, 별도 데이터로 전달)

  // 상위 3개 유형 추출
  const sorted = [...typeCounts].sort((a, b) => b.count - a.count);
  const dominantTypes = sorted
    .filter((t) => t.count > 0)
    .slice(0, 3);

  return {
    typeCounts,
    dominantTypes,
    totalSelected,
    categoryBreakdown,
  };
}

// ─── 결과 직렬화 (Google Sheets 저장용) ─────────────────

/**
 * 에니어그램 결과를 JSON 문자열로 직렬화
 */
export function serializeEnneagramResult(result: EnneagramResult): string {
  return JSON.stringify({
    mainType: result.mainType,
    wing: result.wing,
    integrationTo: result.integrationTo,
    disintegrationTo: result.disintegrationTo,
    scores: result.scores,
    percentages: result.percentages,
  });
}

/**
 * 애착유형 결과를 JSON 문자열로 직렬화
 */
export function serializeAttachmentResult(result: AttachmentResult): string {
  return JSON.stringify({
    type: result.type,
    label: result.label,
    avoidanceMean: result.avoidanceMean,
    anxietyMean: result.anxietyMean,
  });
}

/**
 * 핵심감정 결과를 JSON 문자열로 직렬화
 */
export function serializeCoreEmotionResult(result: CoreEmotionResult): string {
  return JSON.stringify({
    dominantTypes: result.dominantTypes,
    totalSelected: result.totalSelected,
  });
}
