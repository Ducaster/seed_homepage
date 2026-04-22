import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CoreEmotionTestForm from "./CoreEmotionTestForm";

export const dynamic = "force-dynamic";

export default async function CoreEmotionPage({
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
          핵심감정 검사
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; 16가지 감정 유형에서 자신에게 해당되는 항목을 모두 체크해주세요.
        </p>
      </div>

      <CoreEmotionTestForm clientId={id} />
    </div>
  );
}
