import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, TrendingUp, TrendingDown, RotateCcw, Milestone } from "lucide-react";

export const dynamic = "force-dynamic";

const INTERPRETATION_POINTS = [
  {
    icon: TrendingUp,
    title: "전반적인 흐름",
    desc: "그래프가 전체적으로 상승세인지, 하강세인지, 또는 변동이 큰지를 통해 삶에 대한 전반적인 태도와 자기 인식을 파악합니다.",
  },
  {
    icon: TrendingDown,
    title: "최고점과 최저점",
    desc: "가장 높은 지점과 낮은 지점에서 어떤 사건이 있었는지, 그 경험이 현재에 미치는 영향을 탐색합니다.",
  },
  {
    icon: RotateCcw,
    title: "전환점",
    desc: "그래프가 방향을 바꾸는 지점에서 어떤 변화가 있었는지, 그 변화를 이끈 요인이 무엇인지를 살펴봅니다.",
  },
  {
    icon: Milestone,
    title: "현재와 미래",
    desc: "그래프의 끝부분(현재)이 어떤 방향을 향하고 있는지, 앞으로의 기대와 불안을 함께 이야기합니다.",
  },
];

export default async function LifeGraphResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aid?: string }>;
}) {
  const { id } = await params;
  const { aid } = await searchParams;
  const client = await getClient(id);
  if (!client) notFound();

  const assessment = aid
    ? client.assessments.find((a) => a.id === aid)
    : client.assessments.findLast((a) => a.toolName === "인생그래프");

  if (!assessment) notFound();

  const imageUrl = assessment.result;

  return (
    <div>
      <Link
        href={`/dashboard/clients/${id}/assessments`}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        검사 커리큘럼
      </Link>

      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-text mb-1">
          인생그래프 결과
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; {assessment.date}
        </p>
      </div>

      <div className="space-y-6">
        {/* Drawing Image */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-4 border border-border-lighter">
          <div className="relative w-full aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt="인생그래프"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Notes */}
        {assessment.notes && (
          <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5 border border-border-lighter">
            <h3 className="text-xs font-medium text-text-muted mb-2">코치 메모</h3>
            <p className="text-sm text-text leading-relaxed whitespace-pre-wrap">{assessment.notes}</p>
          </div>
        )}

        {/* About the test */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6 border border-primary/15">
          <h3 className="font-heading font-bold text-text mb-3">검사 안내</h3>
          <p className="text-sm text-text-secondary leading-[1.85]">
            인생그래프는 태어나서 현재까지의 삶에서 중요한 사건들과 그에 따른 감정의 변화를
            시각적으로 표현하는 검사입니다. 가로축은 나이(시간), 세로축은 감정의 높낮이를 나타냅니다.
            삶의 전반적인 흐름과 패턴을 파악하고, 의미 있는 전환점을 발견하여
            현재의 자신을 더 깊이 이해하는 데 도움을 줍니다.
          </p>
        </div>

        {/* Interpretation Guide */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
          <h3 className="font-heading font-bold text-text mb-5">해석 포인트</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERPRETATION_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex gap-3 p-4 rounded-[var(--radius-sm)] bg-bg border border-border-lighter"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text mb-1">{point.title}</h4>
                    <p className="text-xs text-text-muted leading-[1.7]">{point.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
