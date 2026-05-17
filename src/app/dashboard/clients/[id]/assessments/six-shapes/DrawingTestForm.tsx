"use client";

import { useRef, useState } from "react";
import DrawingCanvas from "@/components/assessments/DrawingCanvas";
import { submitDrawingTest } from "../actions";

interface DrawingTestFormProps {
  clientId: string;
  slug: string;
  template?: "six-shapes" | "life-graph";
}

export default function DrawingTestForm({
  clientId,
  slug,
  template,
}: DrawingTestFormProps) {
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  async function handleExport(dataUrl: string) {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);

    const formData = new FormData();
    formData.set("clientId", clientId);
    formData.set("slug", slug);
    formData.set("imageData", dataUrl);
    formData.set("notes", notes);

    try {
      await submitDrawingTest(formData);
    } catch (error) {
      submittingRef.current = false;
      setSubmitting(false);
      throw error;
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">
      <DrawingCanvas
        template={template}
        onExport={handleExport}
        isExporting={submitting}
      />

      {submitting && (
        <div className="py-4 text-center">
          <p role="status" className="text-sm text-text-muted animate-pulse">
            그림 검사 결과를 저장 중입니다. 잠시만 기다려주세요.
          </p>
        </div>
      )}

      <div>
        <label className="block text-xs text-text-muted mb-1">
          메모 (선택)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={submitting}
          rows={2}
          placeholder="관찰 소견이나 메모를 남겨주세요"
          className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary resize-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}
