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
      <div className="mx-auto max-w-[1200px] overflow-x-hidden px-4 py-5 sm:px-6 sm:py-8">
        {children}
      </div>
    </>
  );
}
