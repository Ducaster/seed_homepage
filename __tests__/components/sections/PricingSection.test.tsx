import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitPlanApplication } from "@/app/site-actions";
import PricingSection from "@/components/sections/PricingSection";

vi.mock("@/app/site-actions", () => ({
  submitContactInquiry: vi.fn(async () => ({
    ok: true,
    receiptId: "INQ-TEST",
  })),
  submitPlanApplication: vi.fn(async () => ({
    ok: true,
    receiptId: "SEED-TEST",
  })),
}));

describe("PricingSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("섹션 제목을 렌더링한다", () => {
    render(<PricingSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "당신에게 맞는 플랜을 선택하세요",
    );
  });

  it("월간/연간 플랜을 모두 렌더링한다", () => {
    render(<PricingSection />);
    expect(screen.getAllByText("월간 구독").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("연간 구독").length).toBeGreaterThanOrEqual(1);
  });

  it("가격 정보를 표시한다", () => {
    render(<PricingSection />);
    expect(screen.getAllByText("79,000").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("59,000").length).toBeGreaterThanOrEqual(1);
  });

  it("인기 배지를 연간 플랜에 표시한다", () => {
    render(<PricingSection />);
    expect(
      screen.getAllByText("가장 인기 있는 선택").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("CTA 버튼을 렌더링한다", () => {
    render(<PricingSection />);
    expect(
      screen.getAllByText("월간 플랜으로 시작").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("25% 이상 할인받고 시작하기").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("플랜 선택 버튼 제출 시 신청 내용을 저장하고 접수 완료 모달을 연다", async () => {
    render(<PricingSection />);

    fireEvent.click(screen.getByRole("button", { name: "월간 플랜으로 시작" }));
    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByPlaceholderText("전화번호"), {
      target: { value: "010-0000-0000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "신청 접수하기" }));

    await waitFor(() => {
      expect(submitPlanApplication).toHaveBeenCalledTimes(1);
    });

    const formData = vi.mocked(submitPlanApplication).mock
      .calls[0][0] as FormData;
    expect(formData.get("planName")).toBe("월간 구독");
    expect(formData.get("name")).toBe("홍길동");
    expect(formData.get("phone")).toBe("010-0000-0000");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      await screen.findByText("상담 신청이 접수되었습니다"),
    ).toBeInTheDocument();
    expect(screen.getByText(/SEED-TEST/)).toBeInTheDocument();
    expect(screen.getByText(/선택 플랜: 월간 구독/)).toBeInTheDocument();
  });
});
