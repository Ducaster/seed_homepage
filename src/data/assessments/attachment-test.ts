/**
 * 성인애착유형검사 (ECR-R 기반) — 36문항
 *
 * 홀수 문항 → 회피(Avoidance) 차원
 * 짝수 문항 → 불안(Anxiety) 차원
 *
 * 역채점 문항: 3, 15, 19, 25, 27, 29, 33, 35 (회피 역채점)
 *                22 (불안 역채점)
 *
 * 5점 척도: 전혀 그렇지 않다(1) ~ 매우 그렇다(5)
 */

export interface AttachmentQuestion {
  number: number;
  text: string;
  dimension: "avoidance" | "anxiety";
  isReverse: boolean;
}

const rawQuestions: [string, "avoidance" | "anxiety", boolean][] = [
  ["내가 얼마나 호감을 가지고 있는지 상대방에게 보이고 싶지 않다.", "avoidance", false], // 1
  ["나는 버림을 받는 것에 대해 걱정하는 편이다.", "anxiety", false], // 2
  ["나는 다른 사람과 가까워지는 것이 매우 편안하다.", "avoidance", true], // 3 R
  ["나는 다른 사람과의 관계에 대해 많이 걱정하는 편이다.", "anxiety", false], // 4
  ["상대방이 막 나와 친해지려고 할 때 꺼려하는 나를 발견한다.", "avoidance", false], // 5
  ["내가 다른 사람에게 관심을 가지는 만큼 그들이 나에게 관심을 가지지 않을까봐 걱정이다.", "anxiety", false], // 6
  ["나는 다른 사람이 나와 매우 가까워지려할 때 불편하다.", "avoidance", false], // 7
  ["나는 나와 친한 사람을 잃을까봐 걱정이 된다.", "anxiety", false], // 8
  ["나는 다른 사람에게 마음을 여는 것이 편안하지 못하다.", "avoidance", false], // 9
  ["나는 종종 내가 상대방에게 호의를 보이는 만큼 상대방도 그렇게 해주기를 바란다.", "anxiety", false], // 10
  ["나는 상대방과 가까워지기를 원하지만 나는 다시 생각을 바꾸어 그만둔다.", "avoidance", false], // 11
  ["나는 상대방과 하나가 되길 원하기 때문에 사람들이 때때로 나에게서 멀어진다.", "anxiety", false], // 12
  ["나는 다른 사람이 나와 너무 가까워졌을 때 예민해진다.", "avoidance", false], // 13
  ["나는 혼자 남겨질까봐 걱정이다.", "anxiety", false], // 14
  ["나는 다른 사람에게 내 생각과 감정을 이야기 하는 것이 편하다.", "avoidance", true], // 15 R
  ["지나치게 친밀해지고자 하는 욕심 때문에 사람들이 두려워하여 거리를 둔다.", "anxiety", false], // 16
  ["나는 상대방과 너무 가까워지는 것을 피하려고 한다.", "avoidance", false], // 17
  ["나는 상대방으로부터 사랑받고 있다는 것을 자주 확인받고 싶어한다.", "anxiety", false], // 18
  ["나는 다른 사람과 가까워지는 것이 비교적 쉽다.", "avoidance", true], // 19 R
  ["가끔 나는 다른 사람에게 더 많은 애정과 더 많은 헌신을 보여줄 것을 강요한다고 느낀다.", "anxiety", false], // 20
  ["나는 다른 사람을 의지하기가 어렵다.", "avoidance", false], // 21
  ["나는 버림받는 것에 대해 때때로 걱정하지 않는다.", "anxiety", true], // 22 R
  ["나는 다른 사람과 너무 가까워지는 것을 좋아하지 않는다.", "avoidance", false], // 23
  ["만약 상대방이 나에게 관심을 보이지 않는다면 나는 화가 난다.", "anxiety", false], // 24
  ["나는 상대방에게 모든 것을 이야기 한다.", "avoidance", true], // 25 R
  ["상대방이 내가 원하는 만큼 가까워지는 것을 원치 않음을 안다.", "anxiety", false], // 26
  ["나는 대개 다른 사람에게 내 문제와 고민을 상의한다.", "avoidance", true], // 27 R
  ["내가 다른 사람과 교류가 없을 때 나는 다소 걱정스럽고 불안하다.", "anxiety", false], // 28
  ["다른 사람에게 의지하는 것이 편안하다.", "avoidance", true], // 29 R
  ["상대방이 내가 원하는 만큼 가까이에 있지 않을 때 실망하게 된다.", "anxiety", false], // 30
  ["나는 상대방에게 위로, 조언 또는 도움을 청하지 못한다.", "avoidance", false], // 31
  ["내가 필요로 할 때 상대방이 거절한다면 실망하게 된다.", "anxiety", false], // 32
  ["내가 필요로 할 때 상대방에게 의지하면 도움이 된다.", "avoidance", true], // 33 R
  ["상대방이 나에게 불만을 나타낼 때 나 자신이 정말 형편없게 느껴진다.", "anxiety", false], // 34
  ["나는 위로와 확신을 비롯한 많은 일들을 상대방에게 의지한다.", "avoidance", true], // 35 R
  ["상대방이 나를 떠나서 많은 시간을 보냈을 때 나는 불쾌하다.", "anxiety", false], // 36
];

export const ATTACHMENT_QUESTIONS: AttachmentQuestion[] = rawQuestions.map(
  ([text, dimension, isReverse], i) => ({
    number: i + 1,
    text,
    dimension,
    isReverse,
  })
);

/** 애착유형 분류 기준 (중앙값 3.0 기준) */
export type AttachmentType = "secure" | "anxious" | "avoidant" | "fearful";

export const ATTACHMENT_TYPE_INFO: Record<
  AttachmentType,
  { label: string; description: string }
> = {
  secure: {
    label: "안정형",
    description:
      "타인과의 친밀감에 편안함을 느끼고, 관계에서 안정적인 신뢰를 유지합니다. 자신과 타인 모두에 대해 긍정적인 내적 모델을 갖고 있습니다.",
  },
  anxious: {
    label: "불안형 (몰입형)",
    description:
      "관계에서 친밀감을 강하게 원하지만, 상대방이 자신을 떠날까 봐 걱정합니다. 상대의 반응에 민감하고 관계에 과도하게 몰입하는 경향이 있습니다.",
  },
  avoidant: {
    label: "회피형 (무시형)",
    description:
      "독립성과 자기 충족감을 중시하며, 타인과의 지나친 친밀감을 불편해합니다. 감정 표현을 억제하고 거리를 유지하려는 경향이 있습니다.",
  },
  fearful: {
    label: "공포형 (혼란형)",
    description:
      "친밀감을 원하면서도 동시에 두려워합니다. 관계에서 다가가고 싶지만 거부당할 것이 두려워 갈등하며, 불안과 회피가 모두 높게 나타납니다.",
  },
};

export const SCALE_LABELS = [
  "전혀 그렇지 않다",
  "그렇지 않다",
  "보통이다",
  "대체로 그렇다",
  "매우 그렇다",
] as const;
