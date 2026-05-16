import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WhySeedSection from "@/components/sections/WhySeedSection";

describe("WhySeedSection", () => {
  it("섹션 제목과 문장별 안내 문구를 렌더링한다", () => {
    render(<WhySeedSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Why SEED?",
    );
    expect(
      screen.getByText("SEED는 당신의 성장을 위한 최고의 환경을 제공합니다."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("체계적인 콘텐츠와 커뮤니티를 통해 변화를 경험하세요."),
    ).toBeInTheDocument();
  });

  it("카드 안 제목과 본문에 한국어 줄바꿈 스타일을 적용한다", () => {
    render(<WhySeedSection />);

    expect(screen.getByText("엄선된 고품질 콘텐츠")).toHaveClass("break-keep");
    expect(
      screen.getByText(
        "각 분야 전문가들이 제작한 깊이 있는 콘텐츠를 무제한으로 이용하세요.",
      ),
    ).toHaveClass("break-keep");
  });
});
