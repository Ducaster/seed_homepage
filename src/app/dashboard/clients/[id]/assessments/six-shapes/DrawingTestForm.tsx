"use client";

import { useState } from "react";
import DrawingCanvas from "@/components/assessments/DrawingCanvas";
import { submitDrawingTest } from "../actions";

interface DrawingTestFormProps {
  clientId: string;
  slug: string;
  template?: "six-shapes" | "life-graph";
}

export default function DrawingTestForm({ clientId, slug, template }: DrawingTestFormProps) {
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleExport(dataUrl: string) {
    if (submitting) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.set("clientId", clientId);
    formData.set("slug", slug);
    formData.set("imageData", dataUrl);
    formData.set("notes", notes);

    await submitDrawingTest(formData);
  }

  return (
    <div className="space-y-4">
      <DrawingCanvas template={template} onExport={handleExport} />

      {submitting && (
        <div className="text-center py-4">
          <p className="text-sm text-text-muted animate-pulse">저장 중...</p>
        </div>
      )}

      <div>
        <label className="block text-xs text-text-muted mb-1">메모 (선택)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="관찰 소견이나 메모를 남겨주세요"
          className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary resize-none"
        />
      </div>
    </div>
  );
}
