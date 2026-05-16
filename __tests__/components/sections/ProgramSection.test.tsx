import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgramSection from "@/components/sections/ProgramSection";

describe("ProgramSection", () => {
  it("섹션 제목을 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "당신의 가능성을 발견하는 SEED 프로그램",
    );
  });

  it("SEED-코칭 프로그램만 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getAllByText("SEED-코칭").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("성격유형검사")).not.toBeInTheDocument();
    expect(screen.queryByText("핵심 감정 검사")).not.toBeInTheDocument();
    expect(screen.queryByText("인생그래프")).not.toBeInTheDocument();
  });

  it("프로그램 부제목을 렌더링한다", () => {
    render(<ProgramSection />);
    expect(
      screen.getAllByText("씨앗에서 느티나무까지").length,
    ).toBeGreaterThanOrEqual(1);
  });
});
