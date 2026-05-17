import Link from "next/link";
import { ChevronRight, Plus, Sprout } from "lucide-react";
import type { Client } from "@/types/client";
import { GrowthBadge } from "@/components/dashboard/GrowthStage";

interface ClientListProps {
  clients: Client[];
  title?: string;
  description?: string;
  showHeaderAction?: boolean;
}

export function ClientList({
  clients,
  title = "내담자 관리",
  description,
  showHeaderAction = true,
}: ClientListProps) {
  const resolvedDescription =
    description ??
    (clients.length > 0
      ? `총 ${clients.length}명의 내담자가 코칭 여정을 이어가고 있습니다`
      : "등록된 내담자가 없습니다");

  return (
    <section className="rounded-[var(--radius-lg)] border border-seed-earth-200 bg-white shadow-[var(--shadow-sm)]">
      <div
        data-testid="client-list-header"
        className="flex flex-col items-stretch gap-4 border-b border-seed-earth-100 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6"
      >
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-bold text-seed-earth-900">
            {title}
          </h2>
          <p className="mt-1 break-keep text-sm text-text-muted">
            {resolvedDescription}
          </p>
        </div>
        {showHeaderAction && (
          <Link
            href="/dashboard/clients/new"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-seed-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-seed-green-700 sm:w-auto"
          >
            <Plus size={16} />새 내담자 등록
          </Link>
        )}
      </div>

      {clients.length === 0 ? (
        <div className="px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-seed-green-50 text-seed-green-700">
            <Sprout size={28} />
          </div>
          <h3 className="font-heading text-lg font-bold text-seed-earth-900">
            첫 내담자를 등록해보세요
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-muted">
            SEED의 코칭 기록, 검사 결과, 성장 단계를 한 화면에서 차곡차곡 관리할
            수 있습니다.
          </p>
          <Link
            href="/dashboard/clients/new"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-seed-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-seed-green-700 sm:w-auto"
          >
            <Plus size={16} />
            내담자 등록하기
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="hidden grid-cols-[1.5fr_1fr_0.7fr_1fr_32px] gap-4 border-b border-seed-earth-100 bg-seed-earth-50 px-5 py-3 text-xs font-semibold text-text-muted md:grid">
            <span>내담자</span>
            <span>프로그램</span>
            <span>코칭</span>
            <span>최근 기록</span>
            <span />
          </div>

          <div className="divide-y divide-seed-earth-100">
            {clients.map((client) => {
              const lastSession =
                client.sessions.length > 0
                  ? client.sessions[client.sessions.length - 1]
                  : null;

              return (
                <Link
                  key={client.id}
                  href={`/dashboard/clients/${client.id}`}
                  data-testid={`client-row-${client.id}`}
                  className="group grid grid-cols-1 gap-3 px-4 py-4 transition-colors hover:bg-seed-green-50/40 sm:px-5 md:grid-cols-[1.5fr_1fr_0.7fr_1fr_32px] md:items-center md:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-seed-earth-200 bg-seed-earth-50 text-sm font-bold text-seed-green-700">
                      {client.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-medium text-seed-earth-900">
                          {client.name}
                        </h3>
                        <GrowthBadge sessionCount={client.sessions.length} />
                      </div>
                      <p className="mt-1 text-xs text-text-light">
                        {client.phone || "연락처 미입력"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-text-muted md:block">
                    <span className="text-xs font-medium text-text-light md:hidden">
                      프로그램
                    </span>
                    {client.program || "프로그램 미지정"}
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm font-medium text-seed-earth-900 md:block">
                    <span className="text-xs font-medium text-text-light md:hidden">
                      코칭
                    </span>
                    {client.sessions.length}회
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-text-muted md:block">
                    <span className="text-xs font-medium text-text-light md:hidden">
                      최근 기록
                    </span>
                    {lastSession ? lastSession.date : "기록 없음"}
                  </div>

                  <ChevronRight
                    size={18}
                    className="hidden text-text-light transition-colors group-hover:text-seed-green-700 md:block"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
