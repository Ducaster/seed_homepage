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

  it("기존 3개 프로그램 카드를 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getByText("성격유형검사")).toBeInTheDocument();
    expect(screen.getByText("핵심 감정 검사")).toBeInTheDocument();
    expect(screen.getByText("인생그래프")).toBeInTheDocument();
    expect(screen.queryByText("SEED-코칭")).not.toBeInTheDocument();
  });

  it("프로그램 부제목을 렌더링한다", () => {
    render(<ProgramSection />);
    expect(screen.getByText("씨앗의 DNA")).toBeInTheDocument();
    expect(screen.getByText("토양과 수분")).toBeInTheDocument();
    expect(screen.getByText("나이테 (성장의 기록)")).toBeInTheDocument();
  });

  it("카드 안 긴 설명 문구에 한국어 줄바꿈 스타일을 적용한다", () => {
    render(<ProgramSection />);
    expect(
      screen.getByText(
        "당신만의 고유한 기질을 확인합니다. 남들과 비교하며 억지로 맞추려 하기보다, 내 안에 새겨진 본연의 성격 엔진을 이해해 보세요. 당신이 어떤 상황에서 가장 빛나고, 어떤 순간에 에너지를 얻는지 분석하여 당신만의 고유한 생존 전략과 성장 방향을 알려드립니다.",
      ),
    ).toHaveClass("break-keep");
  });
});
