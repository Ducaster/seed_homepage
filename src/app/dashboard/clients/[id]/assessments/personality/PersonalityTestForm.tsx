"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  PERSONALITY_QUESTIONS,
  QUESTIONS_PER_GROUP,
  TOTAL_GROUPS,
} from "@/data/assessments/personality-test";
import { submitPersonalityTest } from "../actions";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const QUESTIONS_PER_PAGE = QUESTIONS_PER_GROUP; // 11문항씩 (그룹 단위)
const SCALE_LABELS = [
  "전혀 아니다",
  "아니다",
  "보통이다",
  "그렇다",
  "매우 그렇다",
];

interface PersonalityTestFormProps {
  clientId: string;
}

export default function PersonalityTestForm({
  clientId,
}: PersonalityTestFormProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(PERSONALITY_QUESTIONS.length).fill(null),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [missingQuestionIndex, setMissingQuestionIndex] = useState<
    number | null
  >(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const submitLockedRef = useRef(false);

  const totalPages = TOTAL_GROUPS;
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const pageQuestions = PERSONALITY_QUESTIONS.slice(
    startIdx,
    startIdx + QUESTIONS_PER_PAGE,
  );

  const answeredOnPage = pageQuestions.filter(
    (_, i) => answers[startIdx + i] !== null,
  ).length;
  const pageComplete = answeredOnPage === pageQuestions.length;

  const totalAnswered = answers.filter((a) => a !== null).length;
  const allComplete = totalAnswered === PERSONALITY_QUESTIONS.length;
  const progress = Math.round(
    (totalAnswered / PERSONALITY_QUESTIONS.length) * 100,
  );

  useEffect(() => {
    if (pendingScrollIndex === null) return;
    if (Math.floor(pendingScrollIndex / QUESTIONS_PER_PAGE) !== currentPage) {
      return;
    }

    window.setTimeout(() => {
      const target = questionRefs.current[pendingScrollIndex];
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus({ preventScroll: true });
      setPendingScrollIndex(null);
    }, 0);
  }, [currentPage, pendingScrollIndex]);

  function setAnswer(qIndex: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = value;
      return next;
    });

    if (missingQuestionIndex === qIndex) {
      setMissingQuestionIndex(null);
      setValidationMessage("");
    }
  }

  function findFirstMissingOnPage(page: number) {
    const pageStart = page * QUESTIONS_PER_PAGE;
    const pageEnd = Math.min(
      pageStart + QUESTIONS_PER_PAGE,
      PERSONALITY_QUESTIONS.length,
    );

    for (let index = pageStart; index < pageEnd; index += 1) {
      if (answers[index] === null) return index;
    }

    return null;
  }

  function showMissingQuestion(questionIndex: number) {
    setCurrentPage(Math.floor(questionIndex / QUESTIONS_PER_PAGE));
    setMissingQuestionIndex(questionIndex);
    setValidationMessage(`${questionIndex + 1}번 문항을 체크해주세요.`);
    setPendingScrollIndex(questionIndex);
  }

  function handleNextPage() {
    const firstMissing = findFirstMissingOnPage(currentPage);
    if (firstMissing !== null) {
      showMissingQuestion(firstMissing);
      return;
    }

    setValidationMessage("");
    setMissingQuestionIndex(null);
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  }

  function handleSubmit() {
    if (isPending || submitLockedRef.current) return;

    if (!allComplete) {
      const firstMissing = answers.findIndex((answer) => answer === null);
      if (firstMissing >= 0) showMissingQuestion(firstMissing);
      return;
    }

    submitLockedRef.current = true;
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("clientId", clientId);
        formData.set("answers", JSON.stringify(answers));
        await submitPersonalityTest(formData);
      } catch (error) {
        submitLockedRef.current = false;
        throw error;
      }
    });
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex flex-col gap-1 text-xs text-text-muted min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <span>
            {currentPage + 1} / {totalPages} 그룹
          </span>
          <span>
            {totalAnswered} / {PERSONALITY_QUESTIONS.length} 문항 ({progress}
            %)
          </span>
        </div>
        <div className="h-2 bg-bg-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {validationMessage && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-[var(--radius-sm)] border border-amber-200 bg-seed-warm-50 px-4 py-3 text-sm text-seed-earth-900"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-700" />
          <p>{validationMessage}</p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {pageQuestions.map((q, i) => {
          const globalIdx = startIdx + i;
          const isReverse = q.isReverse;
          const hasValidationError = missingQuestionIndex === globalIdx;

          return (
            <div
              key={globalIdx}
              ref={(element) => {
                questionRefs.current[globalIdx] = element;
              }}
              tabIndex={-1}
              className={`rounded-[var(--radius-md)] border bg-card p-4 outline-none transition-colors ${
                hasValidationError
                  ? "border-amber-300 bg-seed-warm-50"
                  : "border-border-lighter focus:border-seed-green-500"
              }`}
            >
              <div className="flex gap-2 mb-3">
                <span className="text-xs font-bold text-primary shrink-0 mt-0.5">
                  {globalIdx + 1}.
                </span>
                <p className="text-sm text-text leading-relaxed">
                  {q.text}
                  {isReverse && (
                    <span className="text-xs text-text-light ml-1">※</span>
                  )}
                </p>
              </div>

              <div
                data-testid="scale-options"
                className="grid grid-cols-2 gap-1.5 min-[520px]:grid-cols-5"
              >
                {SCALE_LABELS.map((label, scaleIdx) => {
                  const value = scaleIdx + 1;
                  const selected = answers[globalIdx] === value;
                  return (
                    <button
                      key={scaleIdx}
                      onClick={() => setAnswer(globalIdx, value)}
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
          );
        })}
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
            onClick={handleNextPage}
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
            disabled={isPending}
            className={`w-full rounded-[var(--radius-sm)] px-6 py-2.5 text-sm transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 min-[420px]:w-auto ${
              allComplete
                ? "bg-primary text-white hover:bg-primary-dark"
                : "border border-border-light hover:bg-bg-warm"
            }`}
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
