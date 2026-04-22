import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ATTACHMENT_TYPE_INFO } from "@/data/assessments/attachment-test";
import type { AttachmentType } from "@/data/assessments/attachment-test";

export const dynamic = "force-dynamic";

export default async function AttachmentResultPage({
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
    : client.assessments.findLast((a) => a.toolName === "애착유형 검사");

  if (!assessment) notFound();

  let resultData: {
    type: AttachmentType;
    label: string;
    avoidanceMean: number;
    anxietyMean: number;
  };

  try {
    resultData = JSON.parse(assessment.result);
  } catch {
    notFound();
  }

  const typeInfo = ATTACHMENT_TYPE_INFO[resultData.type];
  const CUTOFF = 3.0;

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
          애착유형 검사 결과
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; {assessment.date}
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Result */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-6 border border-primary/20">
          <h2 className="font-heading text-xl font-bold text-text mb-2">
            {typeInfo.label}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {typeInfo.description}
          </p>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
            <h3 className="text-xs font-medium text-text-muted mb-3">회피 차원 (Avoidance)</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-text">{resultData.avoidanceMean}</span>
              <span className="text-sm text-text-muted mb-1">/ 5.00</span>
            </div>
            <div className="mt-3 h-3 bg-bg-warm rounded-full overflow-hidden">
              <div
                className="h-full bg-[#506E8E] rounded-full transition-all"
                style={{ width: `${(resultData.avoidanceMean / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-text-light mt-2">
              {resultData.avoidanceMean > CUTOFF
                ? "친밀감을 불편해하고 독립을 우선시하는 경향"
                : "친밀감에 비교적 편안함을 느끼는 경향"}
            </p>
          </div>

          <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
            <h3 className="text-xs font-medium text-text-muted mb-3">불안 차원 (Anxiety)</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-text">{resultData.anxietyMean}</span>
              <span className="text-sm text-text-muted mb-1">/ 5.00</span>
            </div>
            <div className="mt-3 h-3 bg-bg-warm rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9C5030] rounded-full transition-all"
                style={{ width: `${(resultData.anxietyMean / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-text-light mt-2">
              {resultData.anxietyMean > CUTOFF
                ? "관계에서 불안감이 높고 확인을 필요로 하는 경향"
                : "관계에서 비교적 안정감을 느끼는 경향"}
            </p>
          </div>
        </div>

        {/* 2x2 Matrix Visual */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
          <h3 className="font-heading font-bold text-text mb-4">애착유형 매트릭스</h3>
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Axes */}
            <div className="absolute inset-0 border border-border-light rounded-[var(--radius-sm)]">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-lighter" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-border-lighter" />
            </div>

            {/* Labels */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-text-muted">
              불안 낮음
            </span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-muted">
              불안 높음
            </span>
            <span className="absolute top-1/2 -left-12 -translate-y-1/2 text-xs text-text-muted">
              회피 낮음
            </span>
            <span className="absolute top-1/2 -right-12 -translate-y-1/2 text-xs text-text-muted">
              회피 높음
            </span>

            {/* Quadrant labels */}
            <span className="absolute top-4 left-4 text-xs text-[#547E68] font-medium">안정형</span>
            <span className="absolute top-4 right-4 text-xs text-[#506E8E] font-medium">회피형</span>
            <span className="absolute bottom-4 left-4 text-xs text-[#9C5030] font-medium">불안형</span>
            <span className="absolute bottom-4 right-4 text-xs text-[#7E5E78] font-medium">공포형</span>

            {/* Dot */}
            <div
              className="absolute w-5 h-5 rounded-full bg-primary border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${Math.min(95, Math.max(5, (resultData.avoidanceMean / 5) * 100))}%`,
                top: `${100 - Math.min(95, Math.max(5, (resultData.anxietyMean / 5) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* All Types Info */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
          <h3 className="font-heading font-bold text-text mb-4">4가지 애착유형 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.entries(ATTACHMENT_TYPE_INFO) as [AttachmentType, typeof typeInfo][]).map(
              ([key, info]) => (
                <div
                  key={key}
                  className={`p-4 rounded-[var(--radius-sm)] border ${
                    key === resultData.type
                      ? "border-primary/30 bg-primary-pale"
                      : "border-border-lighter bg-bg"
                  }`}
                >
                  <h4 className={`text-sm font-medium mb-1 ${
                    key === resultData.type ? "text-primary" : "text-text"
                  }`}>
                    {info.label}
                    {key === resultData.type && (
                      <span className="text-xs ml-1.5 font-normal text-primary/70">
                        (나의 유형)
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">{info.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
