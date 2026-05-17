import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PendingSubmitButton } from "@/components/ui/PendingSubmitButton";

const formStatus = vi.hoisted(() => ({
  pending: false,
}));

vi.mock("react-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-dom")>();

  return {
    ...actual,
    useFormStatus: () => ({
      pending: formStatus.pending,
      data: null,
      method: null,
      action: null,
    }),
  };
});

describe("PendingSubmitButton", () => {
  beforeEach(() => {
    formStatus.pending = false;
  });

  it("대기 중이 아닐 때 기본 라벨을 보여준다", () => {
    render(
      <form>
        <PendingSubmitButton pendingLabel="등록 중...">
          등록하기
        </PendingSubmitButton>
      </form>,
    );

    expect(screen.getByRole("button", { name: "등록하기" })).toBeEnabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("제출 대기 중에는 버튼을 비활성화하고 안내 문구를 보여준다", () => {
    formStatus.pending = true;

    render(
      <form>
        <PendingSubmitButton
          pendingLabel="등록 중..."
          statusText="데이터를 저장 중입니다. 잠시만 기다려주세요."
        >
          등록하기
        </PendingSubmitButton>
      </form>,
    );

    expect(screen.getByRole("button", { name: "등록 중..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "등록 중..." })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "데이터를 저장 중입니다. 잠시만 기다려주세요.",
    );
  });
});
