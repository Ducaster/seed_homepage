import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

vi.mock("@/app/login/actions", () => ({
  logout: vi.fn(),
}));

describe("DashboardNav", () => {
  it("모바일에서 아이콘 버튼으로도 의미가 전달되고 nav 폭이 좁아진다", () => {
    render(<DashboardNav />);

    expect(screen.getByRole("navigation")).toHaveClass("overflow-x-clip");
    expect(screen.getByLabelText("홈페이지로 이동")).toHaveClass(
      "p-2",
      "sm:px-3",
    );
    expect(screen.getByLabelText("로그아웃")).toHaveClass("p-2", "sm:px-3");
  });
});
