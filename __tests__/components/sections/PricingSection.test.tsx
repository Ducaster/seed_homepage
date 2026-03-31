import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingSection from "@/components/sections/PricingSection";

describe("PricingSection", () => {
  it("섹션 제목을 렌더링한다", () => {
    render(<PricingSection />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("당신에게 맞는 플랜을 선택하세요");
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
    expect(screen.getAllByText("가장 인기 있는 선택").length).toBeGreaterThanOrEqual(1);
  });

  it("CTA 버튼을 렌더링한다", () => {
    render(<PricingSection />);
    expect(screen.getAllByText("월간 플랜으로 시작").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("25% 이상 할인받고 시작하기").length).toBeGreaterThanOrEqual(1);
  });
});
