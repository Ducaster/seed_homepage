import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const metadata = {
  title: "코치 대시보드 — SEED",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNav />
      <div className="max-w-[1200px] mx-auto px-6 py-8">{children}</div>
    </>
  );
}
