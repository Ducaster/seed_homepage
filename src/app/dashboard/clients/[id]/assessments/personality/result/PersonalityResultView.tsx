"use client";

import type { EnneagramTypeInfo } from "@/data/assessments/enneagram-types";
import { ENNEAGRAM_TYPES } from "@/data/assessments/enneagram-types";

interface PersonalityResultViewProps {
  mainType: number;
  mainTypeInfo: EnneagramTypeInfo;
  wing: number;
  wingInfo: EnneagramTypeInfo;
  scores: Record<string, number>;
  percentages: Record<string, number>;
  integrationTo: number;
  disintegrationTo: number;
}

export default function PersonalityResultView({
  mainType,
  mainTypeInfo,
  wing,
  wingInfo,
  scores,
  percentages,
  integrationTo,
  disintegrationTo,
}: PersonalityResultViewProps) {
  const integrationInfo = ENNEAGRAM_TYPES[integrationTo];
  const disintegrationInfo = ENNEAGRAM_TYPES[disintegrationTo];

  return (
    <div className="space-y-6">
      {/* Main Type Card */}
      <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] p-6 border border-primary/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-white">{mainType}</span>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-text">
              {mainType}유형: {mainTypeInfo.name}
            </h2>
            <p className="text-sm text-text-muted">
              {mainTypeInfo.englishName} &middot; {mainTypeInfo.alias}
            </p>
          </div>
        </div>
        <p className="text-sm text-text leading-relaxed mb-4">
          {mainTypeInfo.summary}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-bg-warm rounded-[var(--radius-sm)]">
            <span className="text-xs text-text-muted block mb-1">핵심 욕구</span>
            <p className="text-text font-medium">{mainTypeInfo.coreDesire}</p>
          </div>
          <div className="p-3 bg-bg-warm rounded-[var(--radius-sm)]">
            <span className="text-xs text-text-muted block mb-1">핵심 두려움</span>
            <p className="text-text font-medium">{mainTypeInfo.coreFear}</p>
          </div>
        </div>
      </div>

      {/* Wing + Direction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="text-xs font-medium text-text-muted mb-2">날개 유형</h3>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-bold text-primary">
              {wing}
            </span>
            <div>
              <p className="text-sm font-medium text-text">{wingInfo.name}</p>
              <p className="text-xs text-text-muted">{wingInfo.alias}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="text-xs font-medium text-text-muted mb-2">통합 방향 (성장)</h3>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#547E68]/15 flex items-center justify-center text-sm font-bold text-[#547E68]">
              {integrationTo}
            </span>
            <div>
              <p className="text-sm font-medium text-text">{integrationInfo.name}</p>
              <p className="text-xs text-text-muted">{integrationInfo.alias}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="text-xs font-medium text-text-muted mb-2">분열 방향 (스트레스)</h3>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-sm font-bold text-red-400">
              {disintegrationTo}
            </span>
            <div>
              <p className="text-sm font-medium text-text">{disintegrationInfo.name}</p>
              <p className="text-xs text-text-muted">{disintegrationInfo.alias}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score Chart */}
      <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
        <h3 className="font-heading font-bold text-text mb-4">유형별 점수</h3>
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => {
            const pct = percentages[t] ?? 0;
            const score = scores[t] ?? 0;
            const isMain = t === mainType;
            const info = ENNEAGRAM_TYPES[t];

            return (
              <div key={t} className="flex items-center gap-3">
                <span className={`w-6 text-right text-xs font-bold ${isMain ? "text-primary" : "text-text-muted"}`}>
                  {t}
                </span>
                <span className={`w-16 text-xs truncate ${isMain ? "text-primary font-medium" : "text-text-muted"}`}>
                  {info.name}
                </span>
                <div className="flex-1 h-6 bg-bg-warm rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMain ? "bg-primary" : "bg-secondary/60"
                    }`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
                <span className={`w-12 text-right text-xs ${isMain ? "text-primary font-bold" : "text-text-muted"}`}>
                  {score}점
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="font-heading font-bold text-text mb-3">긍정적 특성</h3>
          <ul className="space-y-1.5">
            {mainTypeInfo.positiveTraits.map((trait) => (
              <li key={trait} className="text-sm text-text flex items-start gap-2">
                <span className="text-[#547E68] mt-1 shrink-0">+</span>
                {trait}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="font-heading font-bold text-text mb-3">주의할 특성</h3>
          <ul className="space-y-1.5">
            {mainTypeInfo.negativeTraits.map((trait) => (
              <li key={trait} className="text-sm text-text flex items-start gap-2">
                <span className="text-red-400 mt-1 shrink-0">-</span>
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="font-heading font-bold text-text mb-3">강점</h3>
          <ul className="space-y-1.5">
            {mainTypeInfo.strengths.map((s) => (
              <li key={s} className="text-sm text-text flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">&bull;</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-5">
          <h3 className="font-heading font-bold text-text mb-3">성장 포인트</h3>
          <ul className="space-y-1.5">
            {mainTypeInfo.weaknesses.map((w) => (
              <li key={w} className="text-sm text-text flex items-start gap-2">
                <span className="text-secondary mt-1 shrink-0">&bull;</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Values + Motivation */}
      <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
        <h3 className="font-heading font-bold text-text mb-3">핵심 가치와 동기</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {mainTypeInfo.coreValues.map((v) => (
            <span
              key={v}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-pale text-primary border border-primary/10"
            >
              {v}
            </span>
          ))}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          <strong>성장 동기:</strong> {mainTypeInfo.motivation}
        </p>
      </div>
    </div>
  );
}
