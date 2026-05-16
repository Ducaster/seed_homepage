"use server";

import { saveContactInquiry, savePlanApplication } from "@/lib/store";

export interface SiteSubmissionResult {
  ok: boolean;
  receiptId?: string;
  error?: string;
}

function requiredText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitPlanApplication(
  formData: FormData,
): Promise<SiteSubmissionResult> {
  const planName = requiredText(formData, "planName") || "SEED 프로그램";
  const name = requiredText(formData, "name");
  const phone = requiredText(formData, "phone");

  if (!name || !phone) {
    return {
      ok: false,
      error: "이름과 전화번호를 모두 입력해주세요.",
    };
  }

  try {
    const result = await savePlanApplication({ planName, name, phone });
    return { ok: true, receiptId: result.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "신청 접수에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

export async function submitContactInquiry(
  formData: FormData,
): Promise<SiteSubmissionResult> {
  const name = requiredText(formData, "name");
  const contact = requiredText(formData, "contact");
  const message = requiredText(formData, "message");

  if (!name || !contact || !message) {
    return {
      ok: false,
      error: "이름, 연락처, 문의 내용을 모두 입력해주세요.",
    };
  }

  try {
    const result = await saveContactInquiry({ name, contact, message });
    return { ok: true, receiptId: result.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
