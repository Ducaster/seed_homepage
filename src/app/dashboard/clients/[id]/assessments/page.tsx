import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Circle, Pencil, FileQuestion, ListChecks } from "lucide-react";
import { ASSESSMENTS } from "@/data/assessments";
import type { AssessmentSlug } from "@/data/assessments";

export const dynamic = "force-dynamic";

const SLUG_TO_TOOL: Record<AssessmentSlug, string> = {
  "six-shapes": "6도형 검사",
  "life-graph": "인생그래프",
  personality: "성격유형 검사",
  attachment: "애착유형 검사",
  "core-emotion": "핵심감정 검사",
};

const TYPE_ICON: Record<string, typeof Pencil> = {
  drawing: Pencil,
  survey: FileQuestion,
  checkbox: ListChecks,
};

export default async function AssessmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);

  if (!client) notFound();

  const completedMap = new Map(
    client.assessments.map((a) => [a.toolName, a])
  );

  return (
    <div>
      <Link
        href={`/dashboard/clients/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {client.name} 상세보기
      </Link>

      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-text mb-1">
          검사 커리큘럼
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님의 코칭 검사 진행 현황
        </p>
      </div>

      <div className="space-y-3">
        {ASSESSMENTS.map((assessment) => {
          const doneAssessment = completedMap.get(SLUG_TO_TOOL[assessment.slug]);
          const isDone = !!doneAssessment;
          const Icon = TYPE_ICON[assessment.type] ?? FileQuestion;
          const href = doneAssessment
            ? `/dashboard/clients/${id}/assessments/${assessment.slug}/result?aid=${doneAssessment.id}`
            : `/dashboard/clients/${id}/assessments/${assessment.slug}`;

          return (
            <Link
              key={assessment.slug}
              href={href}
              className={`group flex items-center gap-4 p-5 rounded-[var(--radius-md)] border transition-all ${
                isDone
                  ? "bg-card border-border-lighter hover:border-primary/30"
                  : "bg-card border-border-light hover:border-primary hover:shadow-[var(--shadow-sm)]"
              }`}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  isDone
                    ? "bg-primary/10 text-primary"
                    : "bg-bg-warm text-text-muted group-hover:bg-primary-pale group-hover:text-primary"
                }`}
              >
                {assessment.order}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-text-light shrink-0" />
                  <h3 className="font-medium text-text truncate">
                    {assessment.title}
                  </h3>
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  {assessment.subtitle}
                </p>
              </div>

              {isDone ? (
                <CheckCircle size={20} className="text-primary shrink-0" />
              ) : (
                <Circle size={20} className="text-border shrink-0 group-hover:text-primary/40" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
