"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  CheckCircle2,
  FileText,
  Mail,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  submitContactInquiry,
  submitPlanApplication,
} from "@/app/site-actions";

type SiteActionKind = "plan" | "terms" | "privacy" | "contact";

interface SiteActionProps {
  kind: SiteActionKind;
  label: string;
  title?: string;
  detailLabel?: string;
  description?: string;
  className?: string;
}

interface ActionContent {
  title: string;
  eyebrow: string;
  description: string;
  icon: ReactNode;
  body: ReactNode;
  actionLabel?: string;
}

type SubmissionKind = "plan" | "contact";

interface SubmissionState {
  kind: SubmissionKind | null;
  status: "idle" | "submitting" | "success" | "error";
  receiptId?: string;
  error?: string;
}

const initialSubmission: SubmissionState = {
  kind: null,
  status: "idle",
};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-5 text-sm font-bold text-seed-earth-900 first:mt-0">
      {children}
    </h3>
  );
}

function LegalParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-sm leading-6 text-seed-earth-700">{children}</p>
  );
}

export default function SiteAction({
  kind,
  label,
  title,
  detailLabel,
  description,
  className = "",
}: SiteActionProps) {
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] =
    useState<SubmissionState>(initialSubmission);

  const isPlanSuccess =
    submission.kind === "plan" && submission.status === "success";
  const isContactSuccess =
    submission.kind === "contact" && submission.status === "success";
  const isPlanSubmitting =
    submission.kind === "plan" && submission.status === "submitting";
  const isContactSubmitting =
    submission.kind === "contact" && submission.status === "submitting";

  async function handlePlanSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSubmission({ kind: "plan", status: "submitting" });
    const result = await submitPlanApplication(formData);

    if (result.ok) {
      setSubmission({
        kind: "plan",
        status: "success",
        receiptId: result.receiptId,
      });
      return;
    }

    setSubmission({
      kind: "plan",
      status: "error",
      error: result.error ?? "신청 접수에 실패했습니다.",
    });
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSubmission({ kind: "contact", status: "submitting" });
    const result = await submitContactInquiry(formData);

    if (result.ok) {
      setSubmission({
        kind: "contact",
        status: "success",
        receiptId: result.receiptId,
      });
      return;
    }

    setSubmission({
      kind: "contact",
      status: "error",
      error: result.error ?? "문의 접수에 실패했습니다.",
    });
  }

  const contentByKind: Record<SiteActionKind, ActionContent> = {
    plan: {
      title: isPlanSuccess ? "상담 신청이 접수되었습니다" : "플랜 신청",
      eyebrow: isPlanSuccess ? "신청 완료" : "신청자 정보",
      description: isPlanSuccess
        ? "신청 내용이 접수되었습니다. 담당자가 확인한 뒤 순차적으로 연락드립니다."
        : `${detailLabel ?? "SEED 프로그램"} 신청을 위해 이름과 전화번호를 남겨주세요. 담당자가 확인 후 영업일 기준 1-2일 내 연락드립니다.`,
      icon: isPlanSuccess ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <Send className="w-5 h-5" />
      ),
      body: isPlanSuccess ? (
        <div className="space-y-3 text-sm text-seed-earth-700">
          <div className="rounded-xl bg-seed-green-50 p-4">
            <p className="font-semibold text-seed-green-800">
              선택 플랜: {detailLabel ?? "SEED 프로그램"}
            </p>
            <p className="mt-1 text-seed-green-700">
              접수번호 {submission.receiptId ?? "SEED"}
            </p>
          </div>
          <p>신청자 정보와 선택 플랜이 접수되었습니다.</p>
          <p>
            담당자가 접수 내용을 확인한 뒤 영업일 기준 1-2일 내 입력하신
            전화번호로 연락드립니다.
          </p>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handlePlanSubmit}>
          <input
            type="hidden"
            name="planName"
            value={detailLabel ?? "SEED 프로그램"}
          />
          <input
            required
            name="name"
            placeholder="이름"
            className="w-full rounded-lg border border-seed-earth-200 px-3 py-2 text-sm text-seed-earth-900 outline-none transition-colors focus:border-seed-green-600"
          />
          <input
            required
            name="phone"
            type="tel"
            placeholder="전화번호"
            className="w-full rounded-lg border border-seed-earth-200 px-3 py-2 text-sm text-seed-earth-900 outline-none transition-colors focus:border-seed-green-600"
          />
          {submission.kind === "plan" && submission.status === "error" && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {submission.error}
            </p>
          )}
          <button
            type="submit"
            disabled={isPlanSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-seed-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-seed-green-700 disabled:cursor-not-allowed disabled:bg-seed-earth-300"
          >
            <Send className="h-4 w-4" />
            {isPlanSubmitting ? "접수 중..." : "신청 접수하기"}
          </button>
        </form>
      ),
      actionLabel: isPlanSuccess ? "확인" : undefined,
    },
    terms: {
      title: "이용약관",
      eyebrow: "SEED 서비스 약관",
      description:
        "본 약관은 SEED가 제공하는 자기이해 프로그램, 검사, 코칭 및 관련 온라인 서비스 이용에 관한 기준을 정합니다.",
      icon: <FileText className="w-5 h-5" />,
      body: (
        <div>
          <LegalParagraph>시행일: 2026년 5월 16일</LegalParagraph>

          <SectionTitle>제1조 목적</SectionTitle>
          <LegalParagraph>
            이 약관은 SEED 서비스의 이용 조건, 절차, 회사와 이용자의 권리 및
            의무, 책임사항을 규정함을 목적으로 합니다.
          </LegalParagraph>

          <SectionTitle>제2조 서비스의 내용</SectionTitle>
          <LegalParagraph>
            SEED는 성격유형검사, 핵심 감정 검사, 인생그래프, 상담 및 코칭 기록
            관리 등 자기 이해와 성장 지원을 위한 프로그램을 제공합니다.
          </LegalParagraph>

          <SectionTitle>제3조 이용 신청 및 계약 성립</SectionTitle>
          <LegalParagraph>
            이용자는 서비스 화면에서 안내하는 절차에 따라 상담 또는 프로그램을
            신청할 수 있으며, 회사가 신청 내용을 확인하고 안내를 제공함으로써
            이용 절차가 진행됩니다.
          </LegalParagraph>

          <SectionTitle>제4조 이용자의 의무</SectionTitle>
          <LegalParagraph>
            이용자는 정확한 정보를 제공해야 하며, 타인의 개인정보를 무단으로
            사용하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.
          </LegalParagraph>

          <SectionTitle>제5조 서비스 변경 및 중단</SectionTitle>
          <LegalParagraph>
            회사는 안정적인 서비스 제공을 위해 기능을 개선, 변경 또는 일시
            중단할 수 있으며, 중요한 변경 사항은 서비스 화면 또는 별도 안내를
            통해 고지합니다.
          </LegalParagraph>

          <SectionTitle>제6조 지식재산권</SectionTitle>
          <LegalParagraph>
            서비스에 포함된 문서, 검사 문항, 이미지, 디자인, 콘텐츠의 저작권은
            회사 또는 정당한 권리자에게 있으며, 사전 동의 없이 복제, 배포,
            전송할 수 없습니다.
          </LegalParagraph>

          <SectionTitle>제7조 책임의 제한</SectionTitle>
          <LegalParagraph>
            SEED의 검사와 코칭 자료는 자기 이해와 성찰을 돕는 참고 자료이며,
            의학적 진단, 법률 자문, 투자 자문 등을 대체하지 않습니다.
          </LegalParagraph>
        </div>
      ),
    },
    privacy: {
      title: "개인정보처리방침",
      eyebrow: "개인정보 보호 안내",
      description:
        "SEED는 상담과 코칭 서비스 제공에 필요한 개인정보를 최소한으로 수집하고 안전하게 관리합니다.",
      icon: <ShieldCheck className="w-5 h-5" />,
      body: (
        <div>
          <LegalParagraph>시행일: 2026년 5월 16일</LegalParagraph>

          <SectionTitle>1. 수집하는 개인정보 항목</SectionTitle>
          <LegalParagraph>
            이름, 연락처, 이메일, 생년월일, 성별, 신청 플랜, 상담 메모, 코칭
            기록, 검사 응답 및 결과, 문의 내용, 서비스 이용 과정에서 생성되는
            접속 기록을 수집할 수 있습니다.
          </LegalParagraph>

          <SectionTitle>2. 개인정보의 이용 목적</SectionTitle>
          <LegalParagraph>
            수집한 정보는 상담 일정 안내, 프로그램 운영, 검사 결과 제공, 코칭
            이력 관리, 문의 응대, 서비스 품질 개선, 고지사항 전달을 위해
            사용됩니다.
          </LegalParagraph>

          <SectionTitle>3. 보유 및 이용 기간</SectionTitle>
          <LegalParagraph>
            개인정보는 서비스 제공 및 관련 분쟁 대응에 필요한 기간 동안
            보관하며, 이용자가 삭제를 요청하거나 보유 목적이 달성된 경우 지체
            없이 파기합니다. 단, 관련 법령에 따라 보관이 필요한 정보는 법령에서
            정한 기간 동안 보관할 수 있습니다.
          </LegalParagraph>

          <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
          <LegalParagraph>
            SEED는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만
            법령에 근거한 요청이 있는 경우에는 예외적으로 제공될 수 있습니다.
          </LegalParagraph>

          <SectionTitle>5. 개인정보 처리 위탁</SectionTitle>
          <LegalParagraph>
            서비스 운영을 위해 클라우드 인프라, 데이터 저장, 알림 발송 등 일부
            업무를 외부 서비스에 위탁할 수 있으며, 이 경우 개인정보가 안전하게
            처리되도록 필요한 조치를 취합니다.
          </LegalParagraph>

          <SectionTitle>6. 이용자의 권리</SectionTitle>
          <LegalParagraph>
            이용자는 본인의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할
            수 있습니다. 요청은 문의 채널을 통해 접수할 수 있으며, SEED는 관련
            법령에 따라 지체 없이 처리합니다.
          </LegalParagraph>

          <SectionTitle>7. 개인정보 보호책임자</SectionTitle>
          <LegalParagraph>
            개인정보 보호 관련 문의는 SEED 운영팀으로 접수할 수 있습니다. 문의
            접수 후 필요한 확인 절차를 거쳐 안내드립니다.
          </LegalParagraph>
        </div>
      ),
    },
    contact: {
      title: isContactSuccess ? "문의가 접수되었습니다" : "문의하기",
      eyebrow: isContactSuccess ? "접수 완료" : "SEED 운영팀",
      description: isContactSuccess
        ? "남겨주신 내용을 확인한 뒤 순차적으로 연락드리겠습니다."
        : "프로그램 신청, 검사 진행, 코칭 일정과 관련해 궁금한 점을 남겨주세요.",
      icon: isContactSuccess ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <Mail className="w-5 h-5" />
      ),
      body: isContactSuccess ? (
        <div className="space-y-3 text-sm text-seed-earth-700">
          <p>접수번호 {submission.receiptId ?? "INQ"}</p>
          <p>영업일 기준 1-2일 내 입력하신 연락처로 답변드립니다.</p>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handleContactSubmit}>
          <input
            required
            name="name"
            placeholder="이름"
            className="w-full rounded-lg border border-seed-earth-200 px-3 py-2 text-sm text-seed-earth-900 outline-none transition-colors focus:border-seed-green-600"
          />
          <input
            required
            name="contact"
            placeholder="연락처 또는 이메일"
            className="w-full rounded-lg border border-seed-earth-200 px-3 py-2 text-sm text-seed-earth-900 outline-none transition-colors focus:border-seed-green-600"
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="문의 내용을 입력해주세요"
            className="w-full resize-none rounded-lg border border-seed-earth-200 px-3 py-2 text-sm text-seed-earth-900 outline-none transition-colors focus:border-seed-green-600"
          />
          {submission.kind === "contact" && submission.status === "error" && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {submission.error}
            </p>
          )}
          <button
            type="submit"
            disabled={isContactSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-seed-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-seed-green-700 disabled:cursor-not-allowed disabled:bg-seed-earth-300"
          >
            <Send className="h-4 w-4" />
            {isContactSubmitting ? "접수 중..." : "문의 접수하기"}
          </button>
        </form>
      ),
      actionLabel: isContactSuccess ? "확인" : undefined,
    },
  };

  const content = contentByKind[kind];
  const dialogId = `${kind}-action-title`;

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setSubmission(initialSubmission);
          setOpen(true);
        }}
      >
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
            aria-labelledby={dialogId}
            className="max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-seed-earth-900/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-seed-earth-100 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-seed-green-50 text-seed-green-700">
                  {content.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-seed-green-700">
                    {content.eyebrow}
                  </p>
                  <h2
                    id={dialogId}
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

            <div className="max-h-[calc(86vh-96px)] overflow-y-auto p-6">
              <p className="text-sm leading-6 text-seed-earth-700">
                {description ?? content.description}
              </p>

              <div className="mt-5 rounded-xl border border-seed-earth-100 bg-white p-4">
                {content.body}
              </div>

              {content.actionLabel && (
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-seed-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-seed-green-700"
                  onClick={() => setOpen(false)}
                >
                  {content.actionLabel}
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
