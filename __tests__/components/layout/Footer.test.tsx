import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("개인정보처리방침 버튼 클릭 시 정책 문서를 연다", () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole("button", { name: "개인정보처리방침" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "개인정보처리방침" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/수집하는 개인정보 항목/)).toBeInTheDocument();
  });

  it("문의 양식 제출 시 접수 완료 화면을 연다", () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));
    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByPlaceholderText("연락처 또는 이메일"), {
      target: { value: "010-0000-0000" },
    });
    fireEvent.change(screen.getByPlaceholderText("문의 내용을 입력해주세요"), {
      target: { value: "상담 일정을 알고 싶습니다." },
    });
    fireEvent.click(screen.getByRole("button", { name: "문의 접수하기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "문의가 접수되었습니다" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/영업일 기준 1-2일/)).toBeInTheDocument();
  });
});
