"use client";

import { useState, type ReactNode } from "react";
import { CheckCircle2, FileText, Mail, ShieldCheck, X } from "lucide-react";

type DemoActionKind = "plan" | "terms" | "privacy" | "contact";

interface DemoActionProps {
  kind: DemoActionKind;
  label: string;
  title?: string;
  description?: string;
  className?: string;
}

const contentByKind: Record<
  DemoActionKind,
  {
    title: string;
    eyebrow: string;
    description: string;
    icon: ReactNode;
    body: ReactNode;
  }
> = {
  plan: {
    title: "플랜 선택 데모",
    eyebrow: "신청 준비 완료",
    description:
      "실제 결제 연동 전 데모 화면입니다. 선택한 플랜 기준으로 상담 신청이 이어지는 흐름을 확인할 수 있습니다.",
    icon: <CheckCircle2 className="w-5 h-5" />,
    body: (
      <div className="space-y-3 text-sm text-seed-earth-700">
        <p>선택한 플랜 정보가 상담 신청서에 자동 반영됩니다.</p>
        <p>운영 버전에서는 결제 또는 상담 예약 페이지로 연결할 수 있습니다.</p>
      </div>
    ),
  },
  terms: {
    title: "이용약관",
    eyebrow: "데모 문서",
    description:
      "SEED 서비스 이용 조건을 안내하는 약관 예시입니다. 정식 배포 전 법무 검토를 거쳐 확정할 수 있습니다.",
    icon: <FileText className="w-5 h-5" />,
    body: (
      <ul className="space-y-2 text-sm text-seed-earth-700">
        <li>서비스는 자기 이해와 코칭 기록 관리를 돕기 위해 제공됩니다.</li>
        <li>사용자는 타인의 개인정보와 비공개 자료를 무단으로 공유할 수 없습니다.</li>
        <li>회사는 안정적인 운영을 위해 기능을 개선하거나 일시 중단할 수 있습니다.</li>
      </ul>
    ),
  },
  privacy: {
    title: "개인정보처리방침",
    eyebrow: "데모 문서",
    description:
      "코칭 서비스 제공에 필요한 개인정보 수집·이용 방침 예시입니다.",
    icon: <ShieldCheck className="w-5 h-5" />,
    body: (
      <ul className="space-y-2 text-sm text-seed-earth-700">
        <li>수집 항목: 이름, 연락처, 이메일, 상담 및 검사 기록</li>
        <li>이용 목적: 상담 진행, 검사 결과 관리, 서비스 안내</li>
        <li>보관 기간: 서비스 제공 기간 및 관련 법령상 보관 의무 기간</li>
        <li>이용자는 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.</li>
      </ul>
    ),
  },
  contact: {
    title: "문의하기",
    eyebrow: "데모 접수",
    description:
      "현재는 데모 화면입니다. 정식 버전에서는 메일 발송 또는 문의 폼 저장으로 연결할 수 있습니다.",
    icon: <Mail className="w-5 h-5" />,
    body: (
      <div className="space-y-3 text-sm text-seed-earth-700">
        <p>문의 유형, 연락처, 메시지를 받는 간단한 폼으로 확장할 수 있습니다.</p>
        <div className="rounded-lg bg-seed-earth-50 p-3 text-seed-earth-900">
          contact@seed.example
        </div>
      </div>
    ),
  },
};

export default function DemoAction({
  kind,
  label,
  title,
  description,
  className = "",
}: DemoActionProps) {
  const [open, setOpen] = useState(false);
  const content = contentByKind[kind];

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-seed-earth-900/55 px-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${kind}-demo-title`}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-seed-earth-900/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-seed-green-50 text-seed-green-700">
                  {content.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-seed-green-700">
                    {content.eyebrow}
                  </p>
                  <h2
                    id={`${kind}-demo-title`}
                    className="text-xl font-bold text-seed-earth-900"
                  >
                    {title ?? content.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                aria-label="닫기"
                className="rounded-full p-1.5 text-seed-earth-700 transition-colors hover:bg-seed-earth-100"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-seed-earth-700">
              {description ?? content.description}
            </p>

            <div className="mt-5 rounded-xl border border-seed-earth-100 bg-white p-4">
              {content.body}
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-seed-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-seed-green-700"
              onClick={() => setOpen(false)}
            >
              확인
            </button>
          </section>
        </div>
      )}
    </>
  );
}
