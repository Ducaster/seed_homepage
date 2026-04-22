"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, LayoutDashboard, Users, ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "내담자 관리", href: "/dashboard/clients", icon: Users },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-lighter">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-seed-green-600" />
            <span className="text-base font-bold text-seed-earth-900">SEED</span>
            <span className="text-[0.65rem] text-text-muted bg-bg-warm px-1.5 py-0.5 rounded ml-0.5">Coach</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
              return (
                <Link key={href} href={href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-sm transition-colors",
                    active ? "bg-seed-green-50 text-seed-green-700 font-medium" : "text-text-muted hover:text-text hover:bg-bg-warm"
                  )}>
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted hover:text-text transition-colors">
            <ExternalLink size={14} />
            <span className="hidden sm:inline">홈페이지</span>
          </Link>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted hover:text-red-500 transition-colors cursor-pointer">
              <LogOut size={14} />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
