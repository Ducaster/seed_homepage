import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("코치 로그인 링크를 렌더링한다", () => {
    render(<Header />);

    const loginLinks = screen.getAllByRole("link", { name: /코치 로그인/i });
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks[0]).toHaveAttribute("href", "/login");
  });

  it("시작하기 링크를 가격 섹션으로 연결한다", () => {
    render(<Header />);

    const ctaLinks = screen.getAllByRole("link", { name: "시작하기" });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks[0]).toHaveAttribute("href", "#pricing");
  });
});
