import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AttachmentTestForm from "./AttachmentTestForm";

export const dynamic = "force-dynamic";

export default async function AttachmentPage({
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
          애착유형 검사
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; ECR-R 기반 36문항 검사입니다. 평소 대인관계에서 느끼는 것을 솔직하게 응답해주세요.
        </p>
      </div>

      <AttachmentTestForm clientId={id} />
    </div>
  );
}
