import { getClient, getAssessmentDetail } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ENNEAGRAM_TYPES } from "@/data/assessments/enneagram-types";
import PersonalityResultView from "./PersonalityResultView";

export const dynamic = "force-dynamic";

export default async function PersonalityResultPage({
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

  // 검사 결과 찾기
  const assessment = aid
    ? client.assessments.find((a) => a.id === aid)
    : client.assessments.findLast((a) => a.toolName === "성격유형 검사");

  if (!assessment) notFound();

  let resultData: {
    mainType: number;
    wing: number;
    integrationTo: number;
    disintegrationTo: number;
    scores: Record<string, number>;
    percentages: Record<string, number>;
  };

  try {
    resultData = JSON.parse(assessment.result);
  } catch {
    notFound();
  }

  const mainTypeInfo = ENNEAGRAM_TYPES[resultData.mainType];
  const wingInfo = ENNEAGRAM_TYPES[resultData.wing];

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
          성격유형 검사 결과
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; {assessment.date}
        </p>
      </div>

      <PersonalityResultView
        mainType={resultData.mainType}
        mainTypeInfo={mainTypeInfo}
        wing={resultData.wing}
        wingInfo={wingInfo}
        scores={resultData.scores}
        percentages={resultData.percentages}
        integrationTo={resultData.integrationTo}
        disintegrationTo={resultData.disintegrationTo}
      />
    </div>
  );
}
