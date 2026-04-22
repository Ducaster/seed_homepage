"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Sprout } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <Sprout className="w-8 h-8 text-seed-green-600" />
            <span className="text-xl font-bold text-seed-earth-900">SEED</span>
          </Link>
          <p className="text-sm text-text-muted">코치 전용 관리 페이지</p>
        </div>

        <form action={formAction} className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-8 space-y-5">
          {state?.error && (
            <div className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-[var(--radius-sm)]">
              {state.error}
            </div>
          )}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-text-secondary mb-2">아이디</label>
            <input type="text" id="id" name="id" required autoComplete="username"
              className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
              placeholder="아이디를 입력하세요" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">비밀번호</label>
            <input type="password" id="password" name="password" required autoComplete="current-password"
              className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
              placeholder="비밀번호를 입력하세요" />
          </div>
          <button type="submit" disabled={pending}
            className="w-full py-3 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50">
            {pending ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-text-muted hover:text-text transition-colors">&larr; 홈으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}
