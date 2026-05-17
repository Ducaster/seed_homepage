import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClientList } from "@/components/dashboard/ClientList";
import type { Client } from "@/types/client";

function makeClient(overrides: Partial<Client> = {}): Client {
  return {
    id: "client-1",
    name: "홍길동",
    phone: "010-0000-0000",
    email: "",
    birthDate: null,
    gender: "",
    program: "SEED 기본",
    registeredAt: "2026-05-17T00:00:00.000Z",
    notes: "",
    sessions: [
      {
        id: "session-1",
        date: "2026-05-17",
        sessionNumber: 1,
        duration: 50,
        content: "첫 코칭",
        notes: "",
      },
    ],
    assessments: [],
    ...overrides,
  };
}

describe("ClientList", () => {
  it("내담자를 리스트 형식으로 렌더링한다", () => {
    render(<ClientList clients={[makeClient()]} />);

    expect(
      screen.getByRole("heading", { name: "내담자 관리" }),
    ).toBeInTheDocument();
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("SEED 기본")).toBeInTheDocument();
    expect(screen.getByText("1회")).toBeInTheDocument();
    expect(screen.getByText("2026-05-17")).toBeInTheDocument();
    expect(screen.getByText("씨앗")).toBeInTheDocument();
  });

  it("내담자가 없으면 첫 등록 안내를 보여준다", () => {
    render(<ClientList clients={[]} />);

    expect(screen.getByText("첫 내담자를 등록해보세요")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "내담자 등록하기" }),
    ).toHaveAttribute("href", "/dashboard/clients/new");
  });

  it("모바일에서는 헤더 액션과 내담자 행이 세로 흐름으로 전환된다", () => {
    render(<ClientList clients={[makeClient()]} />);

    expect(screen.getByTestId("client-list-header")).toHaveClass("flex-col");
    expect(screen.getByRole("link", { name: /새 내담자 등록/ })).toHaveClass(
      "w-full",
      "sm:w-auto",
    );
    expect(screen.getByTestId("client-row-client-1")).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-[1.5fr_1fr_0.7fr_1fr_32px]",
    );
  });
});
