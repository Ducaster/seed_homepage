"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getClients,
  saveClients,
  generateId,
  savePersonalityResponse,
  saveAttachmentResponse,
  saveCoreEmotionResponse,
  saveDrawingResponse,
} from "@/lib/store";
import { uploadDrawingImage } from "@/lib/blob";
import { scoreEnneagram, serializeEnneagramResult } from "@/lib/scoring";
import { scoreAttachment, serializeAttachmentResult } from "@/lib/scoring";
import { scoreCoreEmotion, serializeCoreEmotionResult } from "@/lib/scoring";

/**
 * 성격유형(에니어그램) 검사 제출
 */
export async function submitPersonalityTest(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const answersJson = formData.get("answers") as string;
  const answers: number[] = JSON.parse(answersJson);

  const result = scoreEnneagram(answers);
  const assessmentId = generateId();
  const today = new Date().toISOString().split("T")[0];

  // 요약 결과를 검사결과 탭에 저장
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);
  if (!client) redirect("/dashboard/clients");

  client!.assessments.push({
    id: assessmentId,
    toolName: "성격유형 검사",
    date: today,
    result: serializeEnneagramResult(result),
    notes: `${result.mainType}유형(${result.mainTypeInfo.name}) / 날개: ${result.wing}유형`,
  });

  await saveClients(clients);

  // 상세 응답을 별도 탭에 저장
  await savePersonalityResponse({
    assessmentId,
    clientId,
    date: today,
    answers,
    mainType: result.mainType,
    wing: result.wing,
    scores: result.scores,
  });

  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}/assessments/personality/result?aid=${assessmentId}`);
}

/**
 * 애착유형 검사 제출
 */
export async function submitAttachmentTest(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const answersJson = formData.get("answers") as string;
  const answers: number[] = JSON.parse(answersJson);

  const result = scoreAttachment(answers);
  const assessmentId = generateId();
  const today = new Date().toISOString().split("T")[0];

  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);
  if (!client) redirect("/dashboard/clients");

  client!.assessments.push({
    id: assessmentId,
    toolName: "애착유형 검사",
    date: today,
    result: serializeAttachmentResult(result),
    notes: `${result.label} (회피: ${result.avoidanceMean}, 불안: ${result.anxietyMean})`,
  });

  await saveClients(clients);

  await saveAttachmentResponse({
    assessmentId,
    clientId,
    date: today,
    answers,
    type: result.type,
    avoidanceMean: result.avoidanceMean,
    anxietyMean: result.anxietyMean,
  });

  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}/assessments/attachment/result?aid=${assessmentId}`);
}

/**
 * 핵심감정 검사 제출
 */
export async function submitCoreEmotionTest(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const selectionsJson = formData.get("selections") as string;
  const selections: Record<number, string[]> = JSON.parse(selectionsJson);

  const result = scoreCoreEmotion(selections);
  const assessmentId = generateId();
  const today = new Date().toISOString().split("T")[0];

  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);
  if (!client) redirect("/dashboard/clients");

  const topTypes = result.dominantTypes
    .map((t) => t.title)
    .join(", ");

  client!.assessments.push({
    id: assessmentId,
    toolName: "핵심감정 검사",
    date: today,
    result: serializeCoreEmotionResult(result),
    notes: `주요 감정유형: ${topTypes} / 총 ${result.totalSelected}개 선택`,
  });

  await saveClients(clients);

  await saveCoreEmotionResponse({
    assessmentId,
    clientId,
    date: today,
    selections,
    dominantTypes: result.dominantTypes,
    totalSelected: result.totalSelected,
  });

  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}/assessments/core-emotion/result?aid=${assessmentId}`);
}

/**
 * 드로잉 검사 제출 (6도형, 인생그래프)
 */
export async function submitDrawingTest(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const slug = formData.get("slug") as string;
  const imageData = formData.get("imageData") as string;
  const notes = (formData.get("notes") as string) || "";

  const assessmentId = generateId();
  const today = new Date().toISOString().split("T")[0];

  const toolNames: Record<string, string> = {
    "six-shapes": "6도형 검사",
    "life-graph": "인생그래프",
  };

  // Blob에 이미지 업로드
  const { url } = await uploadDrawingImage(imageData, clientId, slug);

  // 검사결과 탭에 저장
  const clients = await getClients();
  const client = clients.find((c) => c.id === clientId);
  if (!client) redirect("/dashboard/clients");

  client!.assessments.push({
    id: assessmentId,
    toolName: toolNames[slug] ?? slug,
    date: today,
    result: url,
    notes,
  });

  await saveClients(clients);

  // 드로잉 상세 탭에 저장
  await saveDrawingResponse({
    assessmentId,
    clientId,
    slug,
    date: today,
    imageUrl: url,
    notes,
  });

  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}/assessments/${slug}/result?aid=${assessmentId}`);
}
