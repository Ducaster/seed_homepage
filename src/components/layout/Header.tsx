"use client";

import { useState } from "react";
import { Menu, X, Sprout } from "lucide-react";
import Container from "./Container";
import Button from "../ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-seed-earth-100">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <a href="#" className="flex items-center gap-2">
            <Sprout className="w-7 h-7 text-seed-green-600" />
            <span className="text-xl font-bold text-seed-earth-900">
              SEED
            </span>
          </a>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-seed-earth-700 hover:text-seed-green-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA 버튼 */}
          <div className="hidden md:block">
            <Button size="sm">
              시작하기
            </Button>
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-seed-earth-900" />
            ) : (
              <Menu className="w-6 h-6 text-seed-earth-900" />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-seed-earth-100 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-seed-earth-700 hover:text-seed-green-600 transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" className="mt-2 w-full">
                시작하기
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
