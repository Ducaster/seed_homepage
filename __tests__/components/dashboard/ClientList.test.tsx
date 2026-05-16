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
    expect(screen.getByText("도토리")).toBeInTheDocument();
  });

  it("내담자가 없으면 첫 등록 안내를 보여준다", () => {
    render(<ClientList clients={[]} />);

    expect(screen.getByText("첫 내담자를 등록해보세요")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "내담자 등록하기" }),
    ).toHaveAttribute("href", "/dashboard/clients/new");
  });
});
