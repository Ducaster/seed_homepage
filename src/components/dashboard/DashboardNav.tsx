"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, LayoutDashboard, ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 overflow-x-clip border-b border-border-lighter bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-seed-green-600" />
            <span className="text-base font-bold text-seed-earth-900">
              SEED
            </span>
            <span className="ml-0.5 hidden rounded bg-bg-warm px-1.5 py-0.5 text-[0.65rem] text-text-muted min-[390px]:inline">
              Coach
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith("/dashboard/clients");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-sm transition-colors",
                    active
                      ? "bg-seed-green-50 text-seed-green-700 font-medium"
                      : "text-text-muted hover:text-text hover:bg-bg-warm",
                  )}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/"
            aria-label="홈페이지로 이동"
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] p-2 text-sm text-text-muted transition-colors hover:bg-bg-warm hover:text-text sm:px-3 sm:py-1.5"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">홈페이지</span>
          </Link>
          <form action={logout}>
            <button
              type="submit"
              aria-label="로그아웃"
              className="flex items-center gap-1.5 rounded-[var(--radius-sm)] p-2 text-sm text-text-muted transition-colors hover:bg-red-50 hover:text-red-500 sm:px-3 sm:py-1.5 cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
