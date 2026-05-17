"use client";

import { useState } from "react";
import { addClient } from "@/app/dashboard/actions";
import { programs } from "@/data/programs";
import { PHONE_FORMAT_MESSAGE, PHONE_INPUT_PATTERN } from "@/lib/phone";
import { PendingSubmitButton } from "@/components/ui/PendingSubmitButton";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

const NDA_CONTENT = [
  {
    title: "1. 비밀유지 의무",
    body: "프로그램 참여 중 또는 참여 후 알게 된 운영 정보, 교육 자료, 결과물, 내부 문서, 계정 정보, 참여자 정보 등 일체의 비공개 정보를 외부에 공개·누설·공유하지 않습니다.",
  },
  {
    title: "2. 정보 사용 제한",
    body: "프로그램을 통해 제공받은 자료 및 정보는 참여 목적 범위 내에서만 사용하며, 임의로 외부에 유출하거나 다른 목적으로 활용하지 않습니다. 내담자 연구 시에는 참여 거부나 중단 시 해로운 결과가 없도록 보호합니다.",
  },
  {
    title: "3. 저작권 보호",
    body: "프로그램 내 제공되는 강의자료, 문서, 영상, 이미지, 산출물 등 모든 저작물에 대해 저작권을 침해하는 행위를 하지 않으며, 무단 활용 및 2차 배포를 하지 않습니다.",
  },
  {
    title: "4. 보안 준수",
    body: "본 프로그램의 내용을 외부에 유출 및 누설하지 않으며, 위 사항을 위반할 경우 관련 규정 및 법적 책임을 부담할 수 있음을 확인합니다.",
  },
];

const PRIVACY_CONTENT = [
  {
    title: "1. 수집하는 개인정보",
    body: "이름, 연락처, 이메일, 생년월일, 성별 등 코칭 서비스 제공에 필요한 최소한의 정보를 수집합니다.",
  },
  {
    title: "2. 수집 및 이용 목적",
    body: "코칭 프로그램 운영, 내담자 관리, 코칭 기록 관리, 검사 결과 분석 등 서비스 제공 목적으로만 이용합니다.",
  },
  {
    title: "3. 보유 및 이용 기간",
    body: "코칭 종료 후 관련 법령에 따른 보관 기간 동안 보유하며, 이후 지체 없이 파기합니다.",
  },
  {
    title: "4. 제3자 제공",
    body: "수집된 개인정보는 본인의 동의 없이 제3자에게 제공하지 않습니다. 단, 법령에 의한 경우는 예외로 합니다.",
  },
  {
    title: "5. 정보주체의 권리",
    body: "내담자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.",
  },
];

export function NewClientForm({ error }: { error?: string }) {
  const [agreed, setAgreed] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const canProceed = ndaChecked && privacyChecked;

  if (!agreed) {
    return (
      <div className="max-w-[640px] mx-auto">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          내담자 목록
        </Link>

        <h1 className="font-heading text-xl font-bold text-text mb-2 sm:text-2xl">
          새 내담자 등록
        </h1>
        <p className="text-sm text-text-muted mb-8">
          등록 전 아래 서약서 및 방침에 동의해 주세요.
        </p>

        <div className="space-y-5">
          {/* 비밀유지서약서 */}
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-border-lighter bg-bg-warm/50 px-4 py-4 sm:px-6">
              <ShieldCheck size={18} className="text-primary shrink-0" />
              <h2 className="font-heading text-[1.02rem] font-bold text-text">
                비밀유지서약서
              </h2>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <p className="text-[0.85rem] text-text-secondary leading-[1.85] mb-5 break-keep">
                본인은 프로그램 참여 과정에서 알게 된 정보 및 제공받은 자료의
                중요성을 이해하고, 아래 사항을 준수할 것을 서약합니다.
              </p>
              <div className="space-y-4">
                {NDA_CONTENT.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-[0.84rem] font-semibold text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[0.82rem] text-text-muted leading-[1.8] break-keep">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 border-t border-border-lighter px-4 py-4 transition-colors hover:bg-bg-warm/30 cursor-pointer sm:px-6">
              <input
                type="checkbox"
                checked={ndaChecked}
                onChange={(e) => setNdaChecked(e.target.checked)}
                className="w-4.5 h-4.5 rounded accent-primary cursor-pointer"
              />
              <span className="text-sm text-text font-medium select-none">
                비밀유지서약서에 동의합니다
              </span>
            </label>
          </div>

          {/* 개인정보처리방침 */}
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-border-lighter bg-bg-warm/50 px-4 py-4 sm:px-6">
              <FileText size={18} className="text-primary shrink-0" />
              <h2 className="font-heading text-[1.02rem] font-bold text-text">
                개인정보 수집 및 이용 동의
              </h2>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="space-y-4">
                {PRIVACY_CONTENT.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-[0.84rem] font-semibold text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[0.82rem] text-text-muted leading-[1.8] break-keep">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 border-t border-border-lighter px-4 py-4 transition-colors hover:bg-bg-warm/30 cursor-pointer sm:px-6">
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="w-4.5 h-4.5 rounded accent-primary cursor-pointer"
              />
              <span className="text-sm text-text font-medium select-none">
                개인정보 수집 및 이용에 동의합니다
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Link
            href="/dashboard/clients"
            className="flex-1 py-3 text-center rounded-[var(--radius-sm)] border border-border-light text-text-muted text-sm hover:bg-bg transition-colors"
          >
            취소
          </Link>
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => setAgreed(true)}
            className="flex-1 py-3 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            동의하고 등록하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto">
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        내담자 목록
      </Link>

      <h1 className="font-heading text-xl font-bold text-text mb-6 sm:mb-8 sm:text-2xl">
        새 내담자 등록
      </h1>

      {error === "invalid-phone" && (
        <div className="mb-4 rounded-[var(--radius-sm)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {PHONE_FORMAT_MESSAGE}
        </div>
      )}

      <form
        data-testid="new-client-form-card"
        action={addClient}
        className="space-y-5 rounded-[var(--radius-lg)] bg-card p-5 shadow-[var(--shadow-sm)] sm:p-8"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            이름 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
            placeholder="내담자 이름"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            연락처 <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            inputMode="tel"
            pattern={PHONE_INPUT_PATTERN}
            title={PHONE_FORMAT_MESSAGE}
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
            placeholder="010-0000-0000"
          />
          <p className="mt-1.5 text-xs text-text-light">
            010-0000-0000 또는 01000000000 형식으로 입력해주세요.
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
            placeholder="email@example.com"
          />
        </div>

        <div
          data-testid="new-client-demographics-grid"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              생년월일
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              min="1950-01-01"
              max="2010-12-31"
              className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              성별
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
            >
              <option value="">선택</option>
              <option value="여">여</option>
              <option value="남">남</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="program"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            코칭 프로그램
          </label>
          <select
            id="program"
            name="program"
            defaultValue={programs[0].name}
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors"
          >
            {programs.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            메모
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-border-light bg-bg text-text placeholder:text-text-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-pale transition-colors resize-none"
            placeholder="특이사항이나 메모"
          />
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Link
            href="/dashboard/clients"
            className="flex h-12 flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-border-light text-sm text-text-muted transition-colors hover:bg-bg"
          >
            취소
          </Link>
          <div className="flex-1">
            <PendingSubmitButton
              pendingLabel="등록 중입니다..."
              statusText="내담자 정보를 저장 중입니다. 잠시만 기다려주세요."
              className="h-12 w-full rounded-[var(--radius-sm)] bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-dark cursor-pointer disabled:opacity-50"
            >
              등록하기
            </PendingSubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
