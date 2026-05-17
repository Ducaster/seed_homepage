import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardLoading from "@/app/dashboard/loading";

describe("DashboardLoading", () => {
  it("구글시트 조회 대기 안내를 보여준다", () => {
    render(<DashboardLoading />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "구글시트 데이터를 불러오는 중입니다",
    );
    expect(screen.getByText("잠시만 기다려주세요.")).toBeInTheDocument();
  });
});
