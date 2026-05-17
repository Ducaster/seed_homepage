"use client";

import { useRef, useState, useTransition } from "react";
import {
  ATTACHMENT_QUESTIONS,
  SCALE_LABELS,
} from "@/data/assessments/attachment-test";
import { submitAttachmentTest } from "../actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

const QUESTIONS_PER_PAGE = 9;

interface AttachmentTestFormProps {
  clientId: string;
}

export default function AttachmentTestForm({
  clientId,
}: AttachmentTestFormProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(ATTACHMENT_QUESTIONS.length).fill(null),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const submitLockedRef = useRef(false);

  const totalPages = Math.ceil(
    ATTACHMENT_QUESTIONS.length / QUESTIONS_PER_PAGE,
  );
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = ATTACHMENT_QUESTIONS.slice(
    startIdx,
    startIdx + QUESTIONS_PER_PAGE,
  );

  const answeredOnPage = pageQuestions.filter(
    (q) => answers[q.number - 1] !== null,
  ).length;
  const pageComplete = answeredOnPage === pageQuestions.length;

  const totalAnswered = answers.filter((a) => a !== null).length;
  const allComplete = totalAnswered === ATTACHMENT_QUESTIONS.length;
  const progress = Math.round(
    (totalAnswered / ATTACHMENT_QUESTIONS.length) * 100,
  );

  function setAnswer(qNumber: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qNumber - 1] = value;
      return next;
    });
  }

  function handleSubmit() {
    if (!allComplete || isPending || submitLockedRef.current) return;

    submitLockedRef.current = true;
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("clientId", clientId);
        formData.set("answers", JSON.stringify(answers));
        await submitAttachmentTest(formData);
      } catch (error) {
        submitLockedRef.current = false;
        throw error;
      }
    });
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex flex-col gap-1 text-xs text-text-muted min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <span>
            {currentPage + 1} / {totalPages} 페이지
          </span>
          <span>
            {totalAnswered} / {ATTACHMENT_QUESTIONS.length} 문항 ({progress}%)
          </span>
        </div>
        <div className="h-2 bg-bg-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {pageQuestions.map((q) => (
          <div
            key={q.number}
            className="bg-card rounded-[var(--radius-md)] border border-border-lighter p-4"
          >
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-bold text-primary shrink-0 mt-0.5">
                {q.number}.
              </span>
              <p className="text-sm text-text leading-relaxed">{q.text}</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 min-[520px]:grid-cols-5">
              {SCALE_LABELS.map((label, idx) => {
                const value = idx + 1;
                const selected = answers[q.number - 1] === value;
                return (
                  <button
                    key={idx}
                    onClick={() => setAnswer(q.number, value)}
                    className={`min-h-10 px-2 py-2 text-xs rounded-[var(--radius-sm)] border transition-all cursor-pointer ${
                      selected
                        ? "bg-primary text-white border-primary"
                        : "bg-bg border-border-lighter hover:border-primary/40 text-text-muted"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col-reverse gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="flex w-full items-center justify-center gap-1 rounded-[var(--radius-sm)] border border-border-light px-4 py-2.5 text-sm transition-colors hover:bg-bg-warm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer min-[420px]:w-auto"
        >
          <ChevronLeft size={16} />
          이전
        </button>

        {currentPage < totalPages - 1 ? (
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
            className={`flex w-full items-center justify-center gap-1 rounded-[var(--radius-sm)] px-4 py-2.5 text-sm transition-colors cursor-pointer min-[420px]:w-auto ${
              pageComplete
                ? "bg-primary text-white hover:bg-primary-dark"
                : "border border-border-light hover:bg-bg-warm"
            }`}
          >
            다음
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allComplete || isPending}
            className="w-full rounded-[var(--radius-sm)] bg-primary px-6 py-2.5 text-sm text-white transition-colors hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-[420px]:w-auto"
          >
            {isPending ? "결과 저장 중입니다..." : "검사 완료"}
          </button>
        )}
      </div>
      {isPending && (
        <p role="status" className="mt-3 text-center text-xs text-text-muted">
          검사 결과를 저장 중입니다. 잠시만 기다려주세요.
        </p>
      )}
    </div>
  );
}
