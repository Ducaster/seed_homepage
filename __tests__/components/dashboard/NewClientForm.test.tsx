import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewClientForm } from "@/app/dashboard/clients/new/NewClientForm";

vi.mock("@/app/dashboard/actions", () => ({
  addClient: vi.fn(),
}));

describe("NewClientForm", () => {
  it("등록 폼의 취소/등록 버튼 높이를 고정해 제출 안내가 레이아웃을 흔들지 않게 한다", () => {
    render(<NewClientForm />);

    fireEvent.click(
      screen.getByRole("checkbox", { name: "비밀유지서약서에 동의합니다" }),
    );
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "개인정보 수집 및 이용에 동의합니다",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "동의하고 등록하기" }));

    expect(screen.getByRole("link", { name: "취소" })).toHaveClass("h-12");
    expect(screen.getByRole("button", { name: "등록하기" })).toHaveClass(
      "h-12",
    );
  });
});
