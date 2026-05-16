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
});
