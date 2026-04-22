import { getClients } from "@/lib/store";
import { getGrowthStageInfo, GROWTH_STAGES } from "@/types/client";
import Link from "next/link";
import { Users, Calendar, TrendingUp, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const clients = await getClients();
  const totalSessions = clients.reduce(
    (sum, c) => sum + c.sessions.length,
    0
  );

  const stageDistribution = GROWTH_STAGES.map((stage) => ({
    ...stage,
    count: clients.filter(
      (c) => getGrowthStageInfo(c.sessions.length).key === stage.key
    ).length,
  }));

  const recentSessions = clients
    .flatMap((c) =>
      c.sessions.map((s) => ({
        ...s,
        clientName: c.name,
        clientId: c.id,
      }))
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">
            대시보드
          </h1>
          <p className="text-sm text-text-muted mt-1">
            코칭 현황을 한눈에 확인하세요
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-[var(--radius-sm)] bg-primary-pale">
              <Users size={18} className="text-primary" />
            </div>
            <span className="text-sm text-text-muted">전체 내담자</span>
          </div>
          <p className="text-2xl font-bold text-text">
            {clients.length}
            <span className="text-sm font-normal text-text-light ml-1">
              명
            </span>
          </p>
        </div>
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-[var(--radius-sm)] bg-primary-pale">
              <Calendar size={18} className="text-primary" />
            </div>
            <span className="text-sm text-text-muted">총 코칭 횟수</span>
          </div>
          <p className="text-2xl font-bold text-text">
            {totalSessions}
            <span className="text-sm font-normal text-text-light ml-1">
              회
            </span>
          </p>
        </div>
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-[var(--radius-sm)] bg-primary-pale">
              <TrendingUp size={18} className="text-primary" />
            </div>
            <span className="text-sm text-text-muted">평균 코칭 횟수</span>
          </div>
          <p className="text-2xl font-bold text-text">
            {clients.length > 0
              ? (totalSessions / clients.length).toFixed(1)
              : "0"}
            <span className="text-sm font-normal text-text-light ml-1">
              회
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Stage Distribution */}
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-6">
          <h2 className="font-heading text-lg font-bold text-text mb-4">
            성장 단계 분포
          </h2>
          {clients.length === 0 ? (
            <p className="text-sm text-text-light py-4">
              등록된 내담자가 없습니다
            </p>
          ) : (
            <div className="space-y-3">
              {stageDistribution.map((stage) => (
                <div key={stage.key} className="flex items-center gap-3">
                  <span className="text-xs text-text-muted w-24 shrink-0">
                    {stage.label}
                  </span>
                  <div className="flex-1 h-6 bg-bg rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width:
                          clients.length > 0
                            ? `${Math.max((stage.count / clients.length) * 100, stage.count > 0 ? 20 : 0)}%`
                            : "0%",
                        backgroundColor: stage.color,
                      }}
                    >
                      {stage.count > 0 && (
                        <span className="text-[10px] font-bold text-white">
                          {stage.count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-xs)] p-6">
          <h2 className="font-heading text-lg font-bold text-text mb-4">
            최근 코칭 기록
          </h2>
          {recentSessions.length === 0 ? (
            <p className="text-sm text-text-light py-4">
              코칭 기록이 없습니다
            </p>
          ) : (
            <div className="space-y-1">
              {recentSessions.map((session) => (
                <Link
                  key={session.id}
                  href={`/dashboard/clients/${session.clientId}`}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] hover:bg-bg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text">
                      {session.clientName}
                    </p>
                    <p className="text-xs text-text-light">
                      {session.sessionNumber}회차 &middot;{" "}
                      {session.content?.slice(0, 30)}
                    </p>
                  </div>
                  <span className="text-xs text-text-light shrink-0 ml-3">
                    {session.date}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
