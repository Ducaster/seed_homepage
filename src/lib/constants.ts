import type {
  Program,
  Stat,
  ValueProposition,
  Testimonial,
  PricingPlan,
} from "@/types";

export const SITE_CONFIG = {
  name: "SEED",
  tagline: "당신이라는 씨앗이 제대로 싹틔울 수 있도록",
  description:
    "나를 발견하는 가장 명확한 단서, SEED. 막연했던 당신의 잠재력을 구체적인 가능성으로 바꾸는 탐색의 시간을 제안합니다.",
  url: "https://seed.reframepoint.com",
} as const;

export const NAV_LINKS = [
  { label: "프로그램", href: "#programs" },
  { label: "Why SEED?", href: "#why-seed" },
  { label: "후기", href: "#testimonials" },
  { label: "요금제", href: "#pricing" },
] as const;

export const PROGRAMS: Program[] = [
  {
    id: "seed-coaching",
    title: "SEED-코칭",
    subtitle: "씨앗에서 느티나무까지",
    description:
      "성격유형, 핵심 감정, 인생그래프 등 SEED의 검사와 1:1 대화를 연결해 지금의 나를 이해하고 다음 성장을 설계합니다.",
    icon: "Sprout",
  },
];

export const STATS: Stat[] = [
  { value: "5,000+", label: "누적 멘토 참여자 수" },
  { value: "200+", label: "개설된 멘토링 프로그램" },
  { value: "1,000+", label: "멘토링 및 재능기부 활동 시간" },
];

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    title: "엄선된 고품질 콘텐츠",
    description:
      "각 분야 전문가들이 제작한 깊이 있는 콘텐츠를 무제한으로 이용하세요.",
    icon: "BookOpen",
  },
  {
    title: "성장을 돕는 커뮤니티",
    description:
      "같은 목표를 가진 사람들과 교류하며 동기부여를 얻고 함께 성장하세요.",
    icon: "Users",
  },
  {
    title: "개인 맞춤형 성장 계획",
    description:
      "나의 현재 상태를 진단하고, 목표 달성을 위한 최적의 로드맵을 제공받으세요.",
    icon: "Target",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    content:
      "나중에 후회하지 않기 위해 나에 대해 알아보려고 SEED의 프로그램을 선택했어요.",
    name: "최○린",
    age: 26,
  },
  {
    content:
      "5년 뒤, 10년 뒤의 내 모습이 상상이 안 돼서 막막했는데, 우연히 알게된 SEED의 프로그램을 통해 나를 돌아보고, 미래를 조금이나마 계획해볼 수 있었어요.",
    name: "유○진",
    age: 24,
  },
  {
    content:
      "요새 번아웃과 스트레스로 고민이 많아 시작했어요. 다들 갓생 살면서 앞서가는 것 같은데, 이제는 나만의 속도를 찾고 마음이 편안해졌어요.",
    name: "박○희",
    age: 28,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "monthly",
    name: "월간 구독",
    tagline: "부담없이 시작하고 싶다면",
    price: 79000,
    period: "월",
    features: [
      { text: "전체 콘텐츠 무제한 이용", included: true },
      { text: "커뮤니티 참여 가능", included: true },
      { text: "월간 성장 리포트 제공", included: true },
      { text: "프리미엄 워크숍 초대권", included: false },
      { text: "전문가 1:1 코칭 세션", included: false },
    ],
    cta: "월간 플랜으로 시작",
    popular: false,
  },
  {
    id: "annual",
    name: "연간 구독",
    tagline: "가장 합리적인 선택",
    price: 59000,
    period: "월",
    annualTotal: "연 708,000원",
    discount: "25% 이상 할인",
    features: [
      { text: "전체 콘텐츠 무제한 이용", included: true },
      { text: "커뮤니티 참여 가능", included: true },
      { text: "월간 성장 리포트 제공", included: true },
      { text: "프리미엄 워크숍 초대권", included: true },
      { text: "전문가 1:1 코칭 세션 (연 1회)", included: true },
    ],
    cta: "25% 이상 할인받고 시작하기",
    popular: true,
  },
];
