"use client";

import { useState, useTransition } from "react";
import { EMOTION_TYPES } from "@/data/assessments/core-emotion-test";
import { submitCoreEmotionTest } from "../actions";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const TYPES_PER_PAGE = 4;

interface CoreEmotionTestFormProps {
  clientId: string;
}

export default function CoreEmotionTestForm({ clientId }: CoreEmotionTestFormProps) {
  const [selections, setSelections] = useState<Record<number, Set<string>>>(
    () => {
      const init: Record<number, Set<string>> = {};
      for (const t of EMOTION_TYPES) {
        init[t.id] = new Set();
      }
      return init;
    }
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(EMOTION_TYPES.length / TYPES_PER_PAGE);
  const startIdx = currentPage * TYPES_PER_PAGE;
  const pageTypes = EMOTION_TYPES.slice(startIdx, startIdx + TYPES_PER_PAGE);

  const totalSelected = Object.values(selections).reduce(
    (sum, s) => sum + s.size, 0
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
    startTransition(async () => {
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
    });
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-text-muted mb-2">
          <span>{currentPage + 1} / {totalPages} 페이지</span>
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
            className="bg-card rounded-[var(--radius-md)] border border-border-lighter p-5"
          >
            <div className="flex items-center gap-2 mb-4">
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
                          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
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
      <div className="flex items-center justify-between mt-6 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="flex items-center gap-1 px-4 py-2.5 text-sm rounded-[var(--radius-sm)] border border-border-light hover:bg-bg-warm transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={16} />
          이전
        </button>

        {currentPage < totalPages - 1 ? (
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            className="flex items-center gap-1 px-4 py-2.5 text-sm rounded-[var(--radius-sm)] bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
          >
            다음
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={totalSelected === 0 || isPending}
            className="px-6 py-2.5 text-sm rounded-[var(--radius-sm)] bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? "분석 중..." : "검사 완료"}
          </button>
        )}
      </div>
    </div>
  );
}
