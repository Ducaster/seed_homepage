import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, Shapes, Palette, Move } from "lucide-react";

export const dynamic = "force-dynamic";

const INTERPRETATION_POINTS = [
  {
    icon: Shapes,
    title: "도형의 크기와 비율",
    desc: "각 도형의 상대적 크기, 전체 그림에서 차지하는 비율을 통해 심리적 에너지의 분배와 관심 영역을 파악합니다.",
  },
  {
    icon: Move,
    title: "배치와 공간 활용",
    desc: "도형들이 캔버스 안에서 어떻게 배치되었는지, 중앙/주변/상단/하단 선호를 통해 자기 인식과 대인관계 패턴을 살펴봅니다.",
  },
  {
    icon: Eye,
    title: "연결성과 통합",
    desc: "도형들이 서로 연결되어 있는지, 독립적인지, 하나의 이야기를 이루는지를 통해 사고의 통합 수준을 확인합니다.",
  },
  {
    icon: Palette,
    title: "색상과 필압",
    desc: "사용한 색상의 수와 종류, 선의 굵기와 힘의 정도를 통해 감정 표현의 방식과 현재 심리 상태를 이해합니다.",
  },
];

export default async function SixShapesResultPage({
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
    : client.assessments.findLast((a) => a.toolName === "6도형 검사");

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
          6도형 검사 결과
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
              alt="6도형 검사 그림"
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
            6도형 검사는 원, 사각형, 삼각형, 마름모, 십자, 물결 등 6개의 기본 도형을 활용하여
            자유롭게 그림을 그리는 투사적 그림 검사입니다. 그림의 구성, 도형의 배치, 크기, 필압
            등을 통해 내담자의 심리적 특성과 대인관계 패턴을 이해하는 데 도움을 줍니다.
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
