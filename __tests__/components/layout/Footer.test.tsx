import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("개인정보처리방침 버튼 클릭 시 데모 문서를 연다", () => {
    render(<Footer />);

    fireEvent.click(
      screen.getByRole("button", { name: "개인정보처리방침" })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "개인정보처리방침" })
    ).toBeInTheDocument();
    expect(screen.getByText(/수집 항목/)).toBeInTheDocument();
  });

  it("문의하기 버튼 클릭 시 데모 접수를 연다", () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "문의하기" })).toBeInTheDocument();
    expect(screen.getByText("contact@seed.example")).toBeInTheDocument();
  });
});
