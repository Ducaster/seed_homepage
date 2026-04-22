/**
 * Vercel Blob 이미지 업로드 헬퍼
 *
 * 6도형 검사, 인생그래프 등 드로잉 검사의
 * Canvas 이미지를 Blob Storage에 업로드
 */

import { put } from "@vercel/blob";

interface UploadResult {
  url: string;
  pathname: string;
}

/**
 * Base64 이미지 데이터를 Vercel Blob에 업로드
 *
 * @param base64Data data:image/png;base64,... 형태의 문자열
 * @param clientId 내담자 ID
 * @param assessmentSlug 검사 종류 (six-shapes | life-graph)
 * @returns 업로드된 이미지 URL
 */
export async function uploadDrawingImage(
  base64Data: string,
  clientId: string,
  assessmentSlug: string
): Promise<UploadResult> {
  // data:image/png;base64,xxxx → Buffer 변환
  const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Content, "base64");

  const timestamp = Date.now();
  const pathname = `assessments/${clientId}/${assessmentSlug}-${timestamp}.png`;

  const blob = await put(pathname, buffer, {
    access: "public",
    contentType: "image/png",
  });

  return {
    url: blob.url,
    pathname,
  };
}
