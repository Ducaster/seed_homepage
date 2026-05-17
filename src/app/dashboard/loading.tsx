import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[var(--radius-lg)] bg-card px-6 py-14 text-center shadow-[var(--shadow-sm)]"
    >
      <Loader2 className="mb-4 h-7 w-7 animate-spin text-primary" />
      <p className="font-heading text-lg font-bold text-text">
        구글시트 데이터를 불러오는 중입니다
      </p>
      <p className="mt-2 text-sm text-text-muted">잠시만 기다려주세요.</p>
    </div>
  );
}
