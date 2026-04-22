import { getClient } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DrawingTestForm from "../six-shapes/DrawingTestForm";

export const dynamic = "force-dynamic";

export default async function LifeGraphPage({
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
          인생그래프
        </h1>
        <p className="text-sm text-text-muted">
          {client.name}님 &mdash; 지금까지의 삶을 그래프로 그려주세요. 가로축은 시간, 세로축은 감정의 높낮이입니다.
        </p>
      </div>

      <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
        <DrawingTestForm clientId={id} slug="life-graph" template="life-graph" />
      </div>
    </div>
  );
}
