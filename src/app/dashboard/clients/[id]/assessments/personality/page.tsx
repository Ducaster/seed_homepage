import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PersonalityTestForm from "./PersonalityTestForm";

export const dynamic = "force-dynamic";

export default async function PersonalityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  return (
    <div>
      <Link
        href={`/dashboard/clients/${id}/assessments`}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        검사 커리큘럼
      </Link>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-text mb-1">
          성격유형 검사
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; 에니어그램 기반 99문항 검사입니다. 각 문항에 솔직하게 응답해주세요.
        </p>
      </div>

      <PersonalityTestForm clientId={id} />
    </div>
  );
}
