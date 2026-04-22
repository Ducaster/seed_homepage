import { getClients } from "@/lib/store";
import { GrowthBadge } from "@/components/dashboard/GrowthStage";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">
            내담자 관리
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {clients.length > 0
              ? `총 ${clients.length}명의 내담자`
              : "등록된 내담자가 없습니다"}
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          새 내담자 등록
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-12 text-center">
          <div className="text-5xl mb-4 opacity-60">&#127793;</div>
          <h3 className="font-heading text-lg font-bold text-text mb-2">
            아직 등록된 내담자가 없습니다
          </h3>
          <p className="text-sm text-text-muted mb-6">
            첫 내담자를 등록하고 코칭 여정을 시작하세요
          </p>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            <Plus size={16} />
            내담자 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {clients.map((client) => {
            const lastSession =
              client.sessions.length > 0
                ? client.sessions[client.sessions.length - 1]
                : null;

            return (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-5 flex items-center justify-between hover:shadow-[var(--shadow-sm)] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-bg-warm flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {client.name.slice(0, 1)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-medium text-text">
                        {client.name}
                      </h3>
                      <GrowthBadge
                        sessionCount={client.sessions.length}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-light flex-wrap">
                      {client.program && <span>{client.program}</span>}
                      <span>{client.sessions.length}회 코칭</span>
                      {lastSession && (
                        <span>마지막: {lastSession.date}</span>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-light group-hover:text-primary transition-colors shrink-0"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
