import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "@/components/sections/HeroSection";

describe("HeroSection", () => {
  it("메인 타이틀 SEED를 렌더링한다", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("SEED");
  });

  it("서브 카피를 렌더링한다", () => {
    render(<HeroSection />);
    expect(
      screen.getAllByText("당신이라는 씨앗이 제대로 싹틔울 수 있도록").length
    ).toBeGreaterThanOrEqual(1);
  });

  it("CTA 버튼 2개를 렌더링한다", () => {
    render(<HeroSection />);
    expect(screen.getAllByText("프로그램 살펴보기").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("자세히 알아보기").length).toBeGreaterThanOrEqual(1);
  });
});
