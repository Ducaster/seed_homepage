"use client";

import { useRef, useState, useTransition } from "react";
import { EMOTION_TYPES } from "@/data/assessments/core-emotion-test";
import { submitCoreEmotionTest } from "../actions";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const TYPES_PER_PAGE = 4;

interface CoreEmotionTestFormProps {
  clientId: string;
}

export default function CoreEmotionTestForm({
  clientId,
}: CoreEmotionTestFormProps) {
  const [selections, setSelections] = useState<Record<number, Set<string>>>(
    () => {
      const init: Record<number, Set<string>> = {};
      for (const t of EMOTION_TYPES) {
        init[t.id] = new Set();
      }
      return init;
    },
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const submitLockedRef = useRef(false);

  const totalPages = Math.ceil(EMOTION_TYPES.length / TYPES_PER_PAGE);
  const startIdx = currentPage * TYPES_PER_PAGE;
  const pageTypes = EMOTION_TYPES.slice(startIdx, startIdx + TYPES_PER_PAGE);

  const totalSelected = Object.values(selections).reduce(
    (sum, s) => sum + s.size,
    0,
  );

  function toggleItem(typeId: number, item: string) {
    setSelections((prev) => {
      const next = { ...prev };
      const set = new Set(prev[typeId]);
      if (set.has(item)) {
        set.delete(item);
      } else {
        set.add(item);
      }
      next[typeId] = set;
      return next;
    });
  }

  function handleSubmit() {
    if (totalSelected === 0 || isPending || submitLockedRef.current) return;

    submitLockedRef.current = true;
    startTransition(async () => {
      try {
        const serialized: Record<number, string[]> = {};
        for (const [typeId, items] of Object.entries(selections)) {
          const arr = Array.from(items);
          if (arr.length > 0) {
            serialized[Number(typeId)] = arr;
          }
        }

        const formData = new FormData();
        formData.set("clientId", clientId);
        formData.set("selections", JSON.stringify(serialized));
        await submitCoreEmotionTest(formData);
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
          <span>총 {totalSelected}개 선택</span>
        </div>
        <div className="h-2 bg-bg-warm rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Emotion Types */}
      <div className="space-y-6">
        {pageTypes.map((emotionType) => (
          <div
            key={emotionType.id}
            className="rounded-[var(--radius-md)] border border-border-lighter bg-card p-4 sm:p-5"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary-pale flex items-center justify-center text-xs font-bold text-primary">
                {emotionType.id}
              </span>
              <h3 className="font-medium text-text text-sm">
                {emotionType.title}
              </h3>
              {selections[emotionType.id].size > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {selections[emotionType.id].size}개
                </span>
              )}
            </div>

            <div className="space-y-3">
              {emotionType.categories.map((cat) => (
                <div key={cat.category}>
                  <span className="text-xs text-text-muted font-medium block mb-1.5">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => {
                      const selected = selections[emotionType.id].has(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleItem(emotionType.id, item)}
                          className={`inline-flex min-h-8 items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-all cursor-pointer ${
                            selected
                              ? "bg-primary text-white border-primary"
                              : "bg-bg border-border-lighter hover:border-primary/40 text-text-muted"
                          }`}
                        >
                          {selected && <Check size={12} />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
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
            className="flex w-full items-center justify-center gap-1 rounded-[var(--radius-sm)] bg-primary px-4 py-2.5 text-sm text-white transition-colors hover:bg-primary-dark cursor-pointer min-[420px]:w-auto"
          >
            다음
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={totalSelected === 0 || isPending}
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
