import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgramSection from "@/components/sections/ProgramSection";

describe("ProgramSection", () => {
  it("섹션 제목을 렌더링한다", () => {
    render(<ProgramSection />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("당신의 가능성을 발견하는 SEED 프로그램");
  });

  it("3개 프로그램을 모두 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getAllByText("성격유형검사").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("핵심 감정 검사").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("인생그래프").length).toBeGreaterThanOrEqual(1);
  });

  it("프로그램 부제목을 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getAllByText("씨앗의 DNA").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("토양과 수분").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("나이테 (성장의 기록)").length).toBeGreaterThanOrEqual(1);
  });
});
