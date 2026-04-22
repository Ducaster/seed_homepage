import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoreEmotionResultPage({
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
    : client.assessments.findLast((a) => a.toolName === "핵심감정 검사");

  if (!assessment) notFound();

  let resultData: {
    dominantTypes: { typeId: number; title: string; count: number }[];
    totalSelected: number;
  };

  try {
    resultData = JSON.parse(assessment.result);
  } catch {
    notFound();
  }

  const maxCount = resultData.dominantTypes[0]?.count ?? 1;

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
          핵심감정 검사 결과
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; {assessment.date}
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-6 border border-primary/20">
          <h2 className="font-heading text-lg font-bold text-text mb-3">
            주요 감정 유형
          </h2>
          <p className="text-sm text-text-muted mb-4">
            총 {resultData.totalSelected}개 항목을 선택하셨습니다.
            아래는 가장 많이 선택된 감정 유형입니다.
          </p>
          <div className="space-y-3">
            {resultData.dominantTypes.map((t, i) => (
              <div key={t.typeId} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text">
                      {t.title}
                    </span>
                    <span className="text-xs text-text-muted">{t.count}개 선택</span>
                  </div>
                  <div className="h-2.5 bg-bg-warm rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(t.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {resultData.dominantTypes.length === 0 && (
          <p className="text-sm text-text-light text-center py-8">
            선택된 항목이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
